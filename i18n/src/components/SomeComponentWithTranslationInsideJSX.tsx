import { useTranslation } from "react-i18next";

const SomeComponentWithTranslationInsideJSX = () => {

    const { t } = useTranslation();
    const t_common = useTranslation("common").t;
    const t_another_namespace = useTranslation("another_namespace").t;

    return (
        <>
            <h1>Компонент с jsx</h1>
            <p>translation.test: {t("test", {ns: "common"})}</p>
            <p>another_namespace.test: {t("test", {ns: "another_namespace"})}</p>
            <p>translation.test with specified ns: {t_common("test")}</p>
            <p>another_namespace.test: {t_another_namespace("test")}</p>
        </>
    );

}

export default SomeComponentWithTranslationInsideJSX;