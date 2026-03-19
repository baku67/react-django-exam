import { useState } from "react";
import Button from "./Button";
import Information from "./Information";

function CategoryForm({ onAddCategory }) {
  const [inputValue, setInputValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmitForm(event) {
    event.preventDefault();
    setErrorMsg("");

    if (inputValue.trim().length < 3) {
      setErrorMsg("Le nom de la catégorie doit faire au moins 3 caractère");
      return;
    }

    try {
      setLoading(true);
      await onAddCategory({ name: inputValue.trim() });
      setInputValue("");
    } catch (error) {
      if (error.status === 400 && error.data?.name) {
        setErrorMsg(error.data.name[0]);
      } else {
        setErrorMsg("Impossible de créer la catégorie");
      }
    } finally {
      setLoading(false);
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
        <Button
          label={loading ? "Ajout..." : "Ajouter catégorie"}
          color="#388d38"
          htmlType="submit"
        />
      </form>

      {errorMsg && <Information message={errorMsg} type="warn" />}
    </>
  );
}

export default CategoryForm;
