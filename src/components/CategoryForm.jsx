import { useState } from "react";
import Button from "./Button";

function CategoryForm(props) {
  const [inputValue, setInputValue] = useState("");

  function handleSubmitForm(event) {
    event.preventDefault();
    props.addCategory(inputValue);
    setInputValue("");
  }

  return (
    <form onSubmit={handleSubmitForm}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Nouvelle catégorie"
      />
      <Button type="catégorie" htmlType="submit" />
    </form>
  );
}

export default CategoryForm;
