import { LanguageTypes } from "./types"
interface TranslatorSchema {

}
const list = [
    {
        default: "",
        list: {
            type: "",

        }
    }]
export const Language = (type: LanguageTypes) => {
    const translator = new Translator();
    const translate = () => {

    }
    return {
        translate
    }
}

class Translator {

}