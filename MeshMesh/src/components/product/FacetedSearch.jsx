import { X, SlidersHorizontal } from "lucide-react";
import { categories, colors, materials, sizes, priceRanges } from "../../data/products";
import { useState } from "react";

export default function FacetedSearch({ filters, onFilterChange, onClearAll, activeFilterCount }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleCheckbox = (facet, value) => {
    const current = filters[facet] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange(facet, updated);
  };

  const isChecked = (facet, value) => (filters[facet] || []).includes(value);

  const filterContent = (
    <>
      <div className="facet-header">
        <h3>Filters</h3>
        {activeFilterCount > 0 && (
          <button className="clear-all-btn" onClick={onClearAll}>
            Clear All ({activeFilterCount})
          </button>
        )}
        <button className="facet-close-btn" onClick={() => setMobileOpen(false)}>
          <X size={20} />
        </button>
      </div>

      <div className="facet-group">
        <h4>Category</h4>
        {categories.map((cat) => (
          <label key={cat} className="facet-option">
            <input
              type="checkbox"
              checked={isChecked("category", cat)}
              onChange={() => handleCheckbox("category", cat)}
            />
            <span>{cat}</span>
          </label>
        ))}
      </div>

      <div className="facet-group">
        <h4>Price Range</h4>
        {priceRanges.map((range) => (
          <label key={range.label} className="facet-option">
            <input
              type="checkbox"
              checked={isChecked("priceRange", range.label)}
              onChange={() => handleCheckbox("priceRange", range.label)}
            />
            <span>{range.label}</span>
          </label>
        ))}
      </div>

      <div className="facet-group">
        <h4>Color</h4>
        <div className="facet-colors">
          {colors.map((color) => (
            <button
              key={color}
              className={`color-swatch ${isChecked("color", color) ? "selected" : ""}`}
              onClick={() => handleCheckbox("color", color)}
              title={color}
              aria-label={`Filter by ${color}`}
            >
              <span className={`swatch-circle swatch-${color.toLowerCase().replace(" ", "-")}`} />
              <span className="swatch-label">{color}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="facet-group">
        <h4>Size</h4>
        <div className="facet-sizes">
          {sizes.map((size) => (
            <button
              key={size}
              className={`size-btn ${isChecked("size", size) ? "selected" : ""}`}
              onClick={() => handleCheckbox("size", size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="facet-group">
        <h4>Material</h4>
        {materials.map((mat) => (
          <label key={mat} className="facet-option">
            <input
              type="checkbox"
              checked={isChecked("material", mat)}
              onChange={() => handleCheckbox("material", mat)}
            />
            <span>{mat}</span>
          </label>
        ))}
      </div>
    </>
  );

  return (
    <>
      <button className="mobile-filter-btn" onClick={() => setMobileOpen(true)}>
        <SlidersHorizontal size={18} />
        Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
      </button>
      <aside className={`faceted-search ${mobileOpen ? "open" : ""}`}>
        {filterContent}
      </aside>
      {mobileOpen && <div className="facet-overlay" onClick={() => setMobileOpen(false)} />}
    </>
  );
}
