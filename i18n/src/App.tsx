import LanguageChanger from "./components/LanguageChanger";
import SomeComponentWithTranslationInsideJSX from "./components/SomeComponentWithTranslationInsideJSX";
import SomeComponentWithTranslationOutsideJSX from "./components/SomeComponentWithTranslationOutsideJSX";


const App = () => {
  return (
    <>
      <LanguageChanger/>
      <SomeComponentWithTranslationInsideJSX/>
      <SomeComponentWithTranslationOutsideJSX/>
    </>
  );
}

export default App;
