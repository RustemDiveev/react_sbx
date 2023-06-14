import { useTranslation } from "react-i18next";

export const useTranslationValues = () => {
    const { t } = useTranslation("second_namespace");

    return [t("one"), t("two"), t("three")];
};

export default useTranslationValues;
