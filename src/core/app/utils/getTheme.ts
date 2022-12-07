export const getTheme = (theme: string):string => {
    switch (theme) {
        case "LIGHT":
            return "theme_light"
        case "DARK":
            return "theme_dark"
        default:
            return "theme_dark"
    }
}