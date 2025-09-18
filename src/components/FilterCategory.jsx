import { useState } from "react";

function FilterCategory(props) {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <form>
      <label>Filtrer par catégorie :</label>
      <select
        value={selectedCategory}
        onChange={(event) => setSelectedCategory(event.target.value)}
      >
        {props.categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </form>
  );
}

export default FilterCategory;
