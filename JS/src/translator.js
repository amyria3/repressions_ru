"use strict"

class Translator {


    constructor() {
        this._lang = this.getLanguage();
        this._elements = document.querySelectorAll("[data-i18n]");
    }

    getLanguage() {
        let lang = navigator.languages ? navigator.languages[0] : navigator.language;
        return lang.substring(0, 2);
    }

    load(lang = null) {

        if (lang) {
            this._lang = lang;
        }
        
        fetch("./JS/i18n/" + this._lang + ".json")
            .then((res) => res.json())
            .then((translation) => {
                this.translate(translation);
            })
            .catch((e) => {
                console.error("Could not load " + this._lang + ".json.");
            });
    }

    translate(translation) {

        this._elements.forEach((element) => {
            let keys = element.dataset.i18n.split(".");
            let text = keys.reduce((obj, i) => obj[i], translation);

            if (text) {
                element.innerHTML = text;
            }
        })
    }
}