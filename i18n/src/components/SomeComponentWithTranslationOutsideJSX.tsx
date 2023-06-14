import { useTranslation } from "react-i18next";

import {oldValues, newValues} from "./values";
import useTranslationOutsideJSX from "../hooks/useTranslateOutsideJSX";
import useTranslationValues from "./useTranslationValues";

const SomeComponentWithTranslationInsideJSX = () => {

    const { t } = useTranslation("second_namespace");
    const hookedValues = useTranslationOutsideJSX(newValues, "second_namespace");
    const values = useTranslationValues();

    return (
        <>
            <ul>
                {oldValues.map(value => <li>{value}</li>)}
            </ul>   
            <ul>
                {newValues.map(value => <li>{t(value)}</li>)}
            </ul>
            <ul>
                {hookedValues.map(value => <li>{t(value)}</li>)}
            </ul>
            <ul>
                {values.map(value => <li>{value}</li>)}
            </ul>
        </>
    )
}

export default SomeComponentWithTranslationInsideJSX;