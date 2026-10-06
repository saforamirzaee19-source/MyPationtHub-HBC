import { useState, useMemo } from "react";

const columns = [
  { key: "name", label: "Name" },
  { key: "category", label: "Category" },
  { key: "serviceName", label: "Service by" },
  { key: "discount", label: "Discount" },
  { key: "price", label: "Price" },
  { key: "id", label: "ID" },
];

const sortOptions = [
  { value: "default", label: "Recommended", key: null, dir: "asc" },
  { value: "discount-desc", label: "Highest discount", key: "discount", dir: "desc" },
  { value: "discount-asc", label: "Lowest discount", key: "discount", dir: "asc" },
  { value: "price-asc", label: "Price: low to high", key: "price", dir: "asc" },
  { value: "price-desc", label: "Price: high to low", key: "price", dir: "desc" },
  { value: "name-asc", label: "Name: A to Z", key: "name", dir: "asc" },
  { value: "name-desc", label: "Name: Z to A", key: "name", dir: "desc" },
  { value: "serviceName-asc", label: "Provider: A to Z", key: "serviceName", dir: "asc" },
  { value: "serviceName-desc", label: "Provider: Z to A", key: "serviceName", dir: "desc" },
  { value: "category-asc", label: "Category: A to Z", key: "category", dir: "asc" },
  { value: "category-desc", label: "Category: Z to A", key: "category", dir: "desc" },
  { value: "id-asc", label: "ID: low to high", key: "id", dir: "asc" },
  { value: "id-desc", label: "ID: high to low", key: "id", dir: "desc" },
];

export default function ResultsTable({
  title,
  rows = [],
  currency = "RM",
  pageSizeOptions = [10, 25, 50],
  defaultPageSize = 25,
  onRowClick,
}) {
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [sort, setSort] = useState({ key: null, dir: "asc" });
  const selectedSort = sortOptions.find(
    (option) => option.key === sort.key && option.dir === sort.dir
  )?.value ?? "default";

  const handleSort = (key) => {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" }
    );
  };

  const handleSortSelection = (value) => {
    const option = sortOptions.find((item) => item.value === value);
    if (option) setSort({ key: option.key, dir: option.dir });
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let result = rows;

    if (q) {
      result = result.filter((r) =>
        [r.name, r.category, r.serviceName, r.discount, r.price, r.id]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }

    if (sort.key) {
      result = [...result].sort((a, b) => {
        const x = a[sort.key];
        const y = b[sort.key];
        const bothNumbers = !isNaN(x) && !isNaN(y);
        const cmp = bothNumbers
          ? Number(x) - Number(y)
          : String(x).localeCompare(String(y));
        return sort.dir === "asc" ? cmp : -cmp;
      });
    }

    return result;
  }, [rows, search, sort]);

  const visible = filtered.slice(0, pageSize);

  const arrow = (key) => {
    if (sort.key !== key) return " ⇅";
    return sort.dir === "asc" ? " ▲" : " ▼";
  };

  return (
    <section className="results-panel" aria-labelledby="results-title">
      <div className="results-panel__heading">
        <div>
          <p className="results-panel__eyebrow">MARKETPLACE OFFERS</p>
          <h2 className="results-panel__title" id="results-title">{title}</h2>
        </div>
        <span className="results-panel__count">{filtered.length} offers</span>
      </div>

      <div className="results-toolbar">
        <label className="results-search">
          <span className="sr-only">Search offers</span>
          <span className="results-search__icon" aria-hidden="true">⌕</span>
          <input
            type="search"
            placeholder="Search offers or providers"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>

        <label className="results-control">
          <span>Sort by</span>
          <select
            value={selectedSort}
            onChange={(event) => handleSortSelection(event.target.value)}
            aria-label="Sort marketplace offers"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>

        <label className="results-control results-control--entries">
          <span>Show</span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            aria-label="Offers per page"
          >
            {pageSizeOptions.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <span>offers</span>
        </label>
      </div>

      <div className="results-table-wrap">
        <table className="results-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  aria-sort={sort.key === col.key ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}
                >
                  <button type="button" onClick={() => handleSort(col.key)}>
                    {col.label}
                    <span aria-hidden="true">{sort.key === col.key ? (sort.dir === "asc" ? "↑" : "↓") : "↕"}</span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td className="results-empty" colSpan={columns.length}>
                  No results found
                </td>
              </tr>
            ) : (
              visible.map((row) => (
                <tr
                  key={row.rowKey ?? row.id}
                  onClick={() => onRowClick?.(row)}
                  className={onRowClick ? "results-row results-row--clickable" : "results-row"}
                >
                  <td>
                    <div className="results-product">
                      <img src={row.image} alt="" />
                      <span>{row.name}</span>
                    </div>
                  </td>
                  <td><span className="results-category">{row.category}</span></td>
                  <td>
                    <div className="results-provider">
                      <img src={row.serviceLogo} alt="" />
                      <span>{row.serviceName}</span>
                    </div>
                  </td>
                  <td>
                    {Number(row.discount) > 0 ? (
                      <span className="results-discount">{row.discount}% off</span>
                    ) : (
                      <span className="results-no-discount">No discount</span>
                    )}
                  </td>
                  <td>
                    <span className="results-price"><span>{currency}</span>{Number(row.price).toFixed(2)}</span>
                  </td>
                  <td><span className="results-id">{row.id}</span></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="results-footer">
        <span>Showing {filtered.length === 0 ? 0 : 1}-{visible.length} of {filtered.length} offers</span>
      </div>
    </section>
  );
}