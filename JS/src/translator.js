"use strict"

class Translator {

    constructor() {
        this._lang = this.getLanguage();
        this._elements = document.querySelectorAll("[data-i18n]");
    }

    getLanguage() {
        const lang = navigator.languages ? navigator.languages[0] : navigator.language;
        return lang.substring(0, 2);
    }

    load(lang = null) {

        if (lang) {
            this._lang = lang;
        }

        fetch("./JS/i18n/" + this._lang + ".json")
            .then((res) => res.json())
            .then((translationFile) => this.translateElements(translationFile))
            .catch((e) => {
                console.error("Could not load " + this._lang + ".json: " + e);
            });
    }

    translateElements(translationFile) {
        this._elements.forEach((element) => {
            const text = element.dataset.i18n
                .split(".")
                .reduce((firstKey, secondKey) => firstKey[secondKey], translationFile);

            if (text) {
                if (element.tagName === "IMG") {
                    element.alt = text;
                } else {
                    element.innerHTML = text;
                }
            }
        })
    }
}
