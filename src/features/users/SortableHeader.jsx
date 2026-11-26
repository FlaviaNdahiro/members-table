
export default function SortableHeader({
  label,
  sortKey,
  sortBy,
  order,
  onSort,
}) {
  const isActive = sortBy === sortKey;

  function handleClick() {
    const nextOrder =
      isActive && order === "asc" ? "desc" : "asc";

    onSort(sortKey, nextOrder);
  }

  return (
    <th>
      <button type="button" onClick={handleClick}>
        {label}
        {isActive && (order === "asc" ? " ▲" : " ▼")}
      </button>
    </th>
  );
}
