import { useTranslation } from "react-i18next";


const LanguageChanger = () => {

    const { i18n } = useTranslation();

    const onEnglish = () => {
        i18n.changeLanguage("en");
    };

    const onRussian = () => {
        i18n.changeLanguage("ru");
    };

    return (
        <div style={{display: "inline"}}>
            <button onClick={onEnglish}>English</button>
            <button onClick={onRussian}>Russian</button>
        </div>
    )
};

export default LanguageChanger;