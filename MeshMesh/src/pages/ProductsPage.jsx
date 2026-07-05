import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Grid3X3, LayoutList } from "lucide-react";
import products, { priceRanges, sortOptions } from "../data/products";
import ProductCard from "../components/product/ProductCard";
import FacetedSearch from "../components/product/FacetedSearch";

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category");

  const [filters, setFilters] = useState(() => {
    if (initialCategory) return { category: [initialCategory] };
    return {};
  });
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setFilters((prev) => ({ ...prev, category: [cat] }));
    }
  }, [searchParams]);

  const handleFilterChange = (facet, values) => {
    setFilters((prev) => {
      const updated = { ...prev };
      if (values.length === 0) {
        delete updated[facet];
      } else {
        updated[facet] = values;
      }
      return updated;
    });
  };

  const clearAllFilters = () => {
    setFilters({});
    setSearchQuery("");
  };

  const activeFilterCount = Object.values(filters).reduce(
    (count, arr) => count + arr.length, 0
  );

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.color.toLowerCase().includes(q)
      );
    }

    if (filters.category?.length) {
      result = result.filter((p) => filters.category.includes(p.category));
    }
    if (filters.color?.length) {
      result = result.filter((p) => filters.color.includes(p.color));
    }
    if (filters.material?.length) {
      result = result.filter((p) => filters.material.includes(p.material));
    }
    if (filters.size?.length) {
      result = result.filter((p) => p.size.some((s) => filters.size.includes(s)));
    }
    if (filters.priceRange?.length) {
      result = result.filter((p) => {
        return filters.priceRange.some((label) => {
          const range = priceRanges.find((r) => r.label === label);
          return range && p.price >= range.min && p.price <= range.max;
        });
      });
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return result;
  }, [filters, sortBy, searchQuery]);

  return (
    <div className="products-page">
      <div className="products-hero">
        <h1>Our Collection</h1>
        <p>
          Explore our full range of footwear — filter by category, size, color,
          and more to find your perfect pair.
        </p>
      </div>

      <div className="products-layout">
        <FacetedSearch
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearAll={clearAllFilters}
          activeFilterCount={activeFilterCount}
        />

        <main className="products-main">
          <div className="products-toolbar">
            <div className="search-bar">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search shoes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="toolbar-right">
              <span className="result-count">{filteredProducts.length} products</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="view-toggle">
                <button
                  className={viewMode === "grid" ? "active" : ""}
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                >
                  <Grid3X3 size={18} />
                </button>
                <button
                  className={viewMode === "list" ? "active" : ""}
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                >
                  <LayoutList size={18} />
                </button>
              </div>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="no-results">
              <h3>No products found</h3>
              <p>Try adjusting your filters or search query.</p>
              <button className="btn btn-outline" onClick={clearAllFilters}>
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className={`product-grid ${viewMode === "list" ? "list-view" : ""}`}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
