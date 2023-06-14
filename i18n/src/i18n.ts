import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import {en, ru} from "./locales/index";


i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {en, ru},  
        fallbackLng: "en",
        supportedLngs: ["en", "ru"],
        debug: true,
        interpolation: {
            escapeValue: true
        },
    });

export default i18n;