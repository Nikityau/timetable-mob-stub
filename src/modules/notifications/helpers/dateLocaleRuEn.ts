export function dateLocaleRuEn(date: Date): {
    ru: string,
    en: string
} {
    const dateRuLocale = Intl.DateTimeFormat('ru', {
        month: "numeric",
        year: "numeric",
        day: "numeric"
    }).format(date)

    const dateEnLocale = Intl.DateTimeFormat('en', {
        month: "numeric",
        year: "numeric",
        day: "numeric"
    }).format(date)

    return  {
        ru: dateRuLocale,
        en: dateEnLocale
    }
}