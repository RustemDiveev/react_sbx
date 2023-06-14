import { useTranslation } from "react-i18next";

const useTranslationOutsideJSX = (collection: string[], namespace?: string) => {
    const { t } = useTranslation(namespace);
    return collection.map(obj => t(obj));
};

export default useTranslationOutsideJSX;