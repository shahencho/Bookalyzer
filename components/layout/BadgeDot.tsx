export function BadgeDot({ badge, size = 10 }: { badge: "Gold" | "Silver" | "Bronze"; size?: number }) {
  const cls = badge === "Gold" ? "bk-bg-gold" : badge === "Silver" ? "bk-bg-silver" : "bk-bg-bronze";
  return <span className={`inline-block rounded-full ${cls}`} style={{ width: size, height: size }} />;
}
