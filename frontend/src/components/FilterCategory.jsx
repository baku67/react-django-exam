function FilterCategory({ categories, selected, onChange }) {
  return (
    <form>
      <label>Filtrer par catégorie :</label>
      <select
        value={selected}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Toutes les catégories</option>

        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </form>
  );
}

export default FilterCategory;
