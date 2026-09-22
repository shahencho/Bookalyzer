export type Lang = "en" | "hy" | "ru";

export type LocalizedText = Partial<Record<Lang, string>> & { en: string };

export function t(entry: LocalizedText | undefined, lang: Lang): string {
  if (!entry) return "";
  return entry[lang] ?? entry.en;
}

// UI chrome translations for the Child and Parent flows. Admin stays
// English-only, matching the reference demo this was ported from.
export const UI: Record<string, LocalizedText> = {
  navHome: { en: "Home", hy: "Գլխավոր", ru: "Главная" },
  navChild: { en: "Child", hy: "Երեխա", ru: "Ребёнок" },
  navParent: { en: "Parent", hy: "Ծնող", ru: "Родитель" },
  navAdmin: { en: "Admin", hy: "Ադմին", ru: "Админ" },

  landingEyebrow: { en: "A STORY-FIRST READING APP", hy: "ՊԱՏՄՈՒԹՅՈՒՆ-ԱՌԱՋԻՆ ԸՆԹԵՐՑԱՆՈՒԹՅԱՆ ԾՐԱԳԻՐ", ru: "ПРИЛОЖЕНИЕ ДЛЯ ЧТЕНИЯ, ГДЕ ИСТОРИЯ — НА ПЕРВОМ МЕСТЕ" },
  landingTagline: { en: "Books come first. Bookalyzer motivates children toward the whole story — one assessment, one small planet at a time.", hy: "Գիրքն է առաջինը։ Bookalyzer-ը երեխաներին մղում է դեպի ամբողջ պատմությունը՝ մեկ առաջադրանք, մեկ փոքրիկ մոլորակ մեկ առ մեկ։", ru: "Книга — на первом месте. Bookalyzer мотивирует детей дочитывать историю целиком — одно задание, одна маленькая планета за раз." },
  cardChildTitle: { en: "I'm a Child", hy: "Ես երեխա եմ", ru: "Я — ребёнок" },
  cardChildDesc: { en: "Read a book and take on an assessment adventure.", hy: "Կարդա գիրք և անցիր առաջադրանքի արկածախնդրություն։", ru: "Читай книгу и проходи задания-приключения." },
  cardParentTitle: { en: "I'm a Parent", hy: "Ես ծնող եմ", ru: "Я — родитель" },
  cardParentDesc: { en: "See how your child is reading and understanding.", hy: "Տես, թե ինչպես է քո երեխան կարդում և հասկանում։", ru: "Смотрите, как ваш ребёнок читает и понимает книги." },
  cardAdminTitle: { en: "I'm an Admin", hy: "Ես ադմին եմ", ru: "Я — админ" },
  cardAdminDesc: { en: "Add books, upload summaries, publish assessments.", hy: "Ավելացրու գրքեր, վերբեռնիր ամփոփումներ, հրապարակիր առաջադրանքներ։", ru: "Добавляйте книги, загружайте пересказы, публикуйте задания." },
  enter: { en: "ENTER", hy: "ՄՈՒՏՔ", ru: "ВОЙТИ" },

  loginHeading: { en: "Hey there!", hy: "Բարև ձեզ!", ru: "Привет!" },
  loginSub: { en: "Log in with your nickname and PIN.", hy: "Մուտք գործեք ձեր մականունով և PIN կոդով։", ru: "Войдите с вашим никнеймом и PIN-кодом." },
  nicknameLabel: { en: "NICKNAME", hy: "ՄԱԿԱՆՈՒՆ", ru: "НИКНЕЙМ" },
  pinLabel: { en: "PIN CODE", hy: "PIN ԿՈԴ", ru: "PIN-КОД" },
  startReading: { en: "Start reading", hy: "Սկսել կարդալ", ru: "Начать чтение" },

  libraryHeading: { en: "Book Library", hy: "Գրքերի գրադարան", ru: "Библиотека книг" },
  librarySub: { en: "Choose a book to begin your journey.", hy: "Ընտրիր գիրք՝ քո ճանապարհորդությունը սկսելու համար։", ru: "Выбери книгу, чтобы начать своё путешествие." },
  searchPlaceholder: { en: "Search books or authors...", hy: "Փնտրել գրքեր կամ հեղինակներ...", ru: "Поиск книг или авторов..." },
  openBook: { en: "Open book", hy: "Բացել գիրքը", ru: "Открыть книгу" },
  noResults: { en: "No books match your search.", hy: "Որոնմանը համապատասխան գրքեր չեն գտնվել։", ru: "По вашему запросу книг не найдено." },
  recommendedHeading: { en: "Recommended for you", hy: "Առաջարկվում է ձեզ համար", ru: "Рекомендуем вам" },
  recommendedSub: {
    en: "Based on age and books already read — not yet playable on Bookalyzer.",
    hy: "Հիմնված տարիքի և արդեն կարդացած գրքերի վրա. դեռ հասանելի չէ Bookalyzer-ում։",
    ru: "На основе возраста и уже прочитанных книг — пока недоступно в Bookalyzer.",
  },
  notOnPlatform: { en: "Not yet on Bookalyzer", hy: "Դեռ Bookalyzer-ում չէ", ru: "Пока нет в Bookalyzer" },

  modeHeading: { en: "Choose how to read", hy: "Ընտրիր ինչպես կարդալ", ru: "Выберите формат чтения" },
  modeSub: { en: "Pick any mode, no restrictions.", hy: "Ընտրիր ցանկացած ձևաչափ, սահմանափակումներ չկան։", ru: "Выберите любой формат, без ограничений." },
  modeShort: { en: "Short Summary", hy: "Համառոտ ամփոփում", ru: "Краткий пересказ" },
  modeExtended: { en: "Extended Summary", hy: "Ընդլայնված ամփոփում", ru: "Расширенный пересказ" },
  modePhysical: { en: "Physical Book", hy: "Տպագիր գիրք", ru: "Бумажная книга" },

  startAssessment: { en: "Start assessment", hy: "Սկսել առաջադրանքը", ru: "Начать задание" },
  physicalInstructions: { en: "Bookalyzer doesn't contain the full book — grab your physical copy and read it. When you're done, confirm below.", hy: "Bookalyzer-ը չի պարունակում ամբողջ գիրքը՝ վերցրու քո տպագիր օրինակը և կարդա այն։ Ավարտելուց հետո հաստատիր ստորև։", ru: "В Bookalyzer нет полного текста книги — возьмите бумажную книгу и прочитайте её. Когда закончите, подтвердите ниже." },
  physicalConfirm: { en: "I've read the physical book", hy: "Ես կարդացել եմ տպագիր գիրքը", ru: "Я прочитал(а) бумажную книгу" },

  questionLabel: { en: "QUESTION", hy: "ՀԱՐՑ", ru: "ВОПРОС" },
  bloomLabel: { en: "BLOOM", hy: "ԲԼՈՒՄ", ru: "БЛУМ" },
  previous: { en: "Previous", hy: "Նախորդը", ru: "Назад" },
  next: { en: "Next", hy: "Հաջորդը", ru: "Далее" },
  submitAssessment: { en: "Submit assessment", hy: "Հանձնել առաջադրանքը", ru: "Отправить задание" },
  autosaveNote: { en: "Progress saves automatically — you can close and continue later.", hy: "Առաջընթացը պահպանվում է ավտոմատ կերպով. կարող ես փակել և շարունակել ավելի ուշ։", ru: "Прогресс сохраняется автоматически — можно закрыть и продолжить позже." },
  chooseMatch: { en: "Choose a match...", hy: "Ընտրիր համապատասխանություն...", ru: "Выберите пару..." },
  typeAnswer: { en: "Type your answer", hy: "Մուտքագրիր պատասխանը", ru: "Введите ответ" },
  writeAnswer: { en: "Write your answer...", hy: "Գրիր քո պատասխանը...", ru: "Напишите ответ..." },

  badgeEarned: { en: "BADGE EARNED", hy: "ՇՔԱՆՇԱՆ ՇԱՀՎԱԾ", ru: "ЗНАЧОК ПОЛУЧЕН" },
  overallScore: { en: "Overall score", hy: "Ընդհանուր միավոր", ru: "Общий результат" },
  xpEarned: { en: "XP earned", hy: "XP վաստակված", ru: "XP получено" },
  correct: { en: "Correct", hy: "Ճիշտ", ru: "Верно" },
  partialCredit: { en: "Partial credit", hy: "Մասնակի միավոր", ru: "Частично верно" },
  notQuite: { en: "Not quite", hy: "Ոչ ճիշտ", ru: "Не совсем" },
  backToLibrary: { en: "Back to library", hy: "Վերադառնալ գրադարան", ru: "Назад в библиотеку" },

  parentHeading: { en: "Parent Dashboard", hy: "Ծնողի վահանակ", ru: "Панель родителя" },
  parentSub: { en: "One account, all your children's reading in one place.", hy: "Մեկ հաշիվ, ձեր բոլոր երեխաների ընթերցանությունը մեկ տեղում։", ru: "Один аккаунт — чтение всех ваших детей в одном месте." },
  booksLabel: { en: "BOOKS", hy: "ԳՐՔԵՐ", ru: "КНИГИ" },
  lastScoreLabel: { en: "LAST SCORE", hy: "ՎԵՐՋԻՆ ՄԻԱՎՈՐ", ru: "ПОСЛЕДНИЙ РЕЗУЛЬТАТ" },
  xpLabelShort: { en: "XP", hy: "XP", ru: "XP" },

  backDash: { en: "Back to dashboard", hy: "Վերադառնալ վահանակ", ru: "Назад к панели" },
  bloomBreakdown: { en: "Bloom's Taxonomy breakdown", hy: "Բլումի տաքսոնոմիայի բաշխվածություն", ru: "Разбивка по таксономии Блума" },
  insight: { en: "Insight", hy: "Դիտարկում", ru: "Наблюдение" },
  readingHistory: { en: "Reading history", hy: "Ընթերցանության պատմություն", ru: "История чтения" },
  booksCompleted: { en: "Books completed", hy: "Ավարտված գրքեր", ru: "Завершено книг" },
  attempts: { en: "Attempts", hy: "Փորձեր", ru: "Попытки" },
  lastScore: { en: "Last score", hy: "Վերջին միավոր", ru: "Последний результат" },
  overallProgress: { en: "Overall progress", hy: "Ընդհանուր առաջընթաց", ru: "Общий прогресс" },
  noAssessmentsYet: { en: "No completed assessments yet.", hy: "Դեռ ավարտված առաջադրանքներ չկան։", ru: "Пока нет завершённых заданий." },

  profileHeading: { en: "My Profile", hy: "Իմ պրոֆիլը", ru: "Мой профиль" },
  myBadges: { en: "My badges", hy: "Իմ շքանշանները", ru: "Мои значки" },
  myHistory: { en: "My reading history", hy: "Իմ ընթերցանության պատմությունը", ru: "История моего чтения" },
  rewardHeading: { en: "Free book reward", hy: "Անվճար գրքի պարգև", ru: "Награда — бесплатная книга" },
  rewardExplain: {
    en: "Read the physical book, score 90%+, and complete 20 of these to earn a free book from us.",
    hy: "Կարդա տպագիր գիրքը, հավաքիր 90%+ և ավարտիր 20 այդպիսի առաջադրանք՝ մեզնից անվճար գիրք ստանալու համար։",
    ru: "Читайте бумажную книгу, набирайте 90%+ и проходите 20 таких заданий, чтобы получить от нас бесплатную книгу.",
  },
};
