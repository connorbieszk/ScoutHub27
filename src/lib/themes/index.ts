import { browser } from "$app/environment";

export enum Themes {
    DARK = "DARK",
    HEX_DARK = "HEX_DARK",
    LIGHT = "LIGHT",
    HEX_LIGHT = "HEX_LIGHT",
}

export function setTheme(theme: Themes) {
    if (!browser) return;

    console.log("Setting Theme to: " + theme);

    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("Theme", theme);
}

export function getTheme(): Themes {
    if (!browser) return Themes.HEX_DARK;

    const theme = localStorage.getItem("Theme");

    return Object.values(Themes).includes(theme as Themes)
        ? (theme as Themes)
        : Themes.HEX_DARK;
}