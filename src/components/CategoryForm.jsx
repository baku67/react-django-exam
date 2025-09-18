import { useState } from "react";
import Button from "./Button";
import Information from "./Information";

function CategoryForm(props) {
  const [inputValue, setInputValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function handleSubmitForm(event) {
    event.preventDefault();
    props.addCategory(inputValue);
    setInputValue("");

    // Validation input (au moins 5 char)
    if (inputValue.trim().length < 3) {
      setErrorMsg("Le nom de la categorie doit faire au moins 3 caractères.");
    } else {
      props.addCategory(inputValue.trim());
      setInputValue(""); // on reinitialise le nom de la categorie mais pas la catégorie
    }
  }

  return (
    <>
      <form onSubmit={handleSubmitForm}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Nouvelle catégorie"
        />
        <Button label="Ajouter catégorie" color="#388d38" htmlType="submit" />
      </form>
      {errorMsg && <Information message={errorMsg} type="warn" />}
    </>
  );
}

export default CategoryForm;
