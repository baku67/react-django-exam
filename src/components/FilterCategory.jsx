function FilterCategory(props) {
  return (
    <form>
      <label>Filtrer par catégorie :</label>
      <select
        value={props.selected}
        onChange={(event) => props.onChange(event.target.value)}
      >
        {/* option null ajoutée pour enlever le filtre: */}
        <option value="">Toutes les catégories</option>
        {/* Liste des catégories: */}
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
