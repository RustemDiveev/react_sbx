import i18n from "../i18n"

const t = (key: string) => {
    return i18n.t(key, {ns: "second_namespace"});
}

export const oldValues = [
    t("one"), t("two"), t("three")
];

export const newValues = [
    "one", "two", "three"
];