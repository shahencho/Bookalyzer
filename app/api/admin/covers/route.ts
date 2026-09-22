import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import path from "node:path";
import fs from "node:fs/promises";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "covers");
const ALLOWED_EXT: Record<string, string> = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/webp": ".webp",
};

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session.adminId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("cover");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "cover file is required" }, { status: 400 });
  }

  const ext = ALLOWED_EXT[file.type];
  if (!ext) {
    return NextResponse.json({ error: "Only PNG, JPEG, or WEBP images are allowed" }, { status: 400 });
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const filename = `${randomUUID()}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer);

  const storagePath = `/uploads/covers/${filename}`;
  const cover = await prisma.coverImage.create({
    data: { storagePath, uploadedByAdminId: session.adminId },
  });

  // No moderation workflow — the cover is live immediately.
  return NextResponse.json({ id: cover.id, storagePath });
}
