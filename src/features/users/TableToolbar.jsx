
export default function TableToolbar({
  search,
  gender,
  onSearchChange,
  onGenderChange,
}) {
  return (
    <div className="table-toolbar">
      <input
        type="search"
        placeholder="Search members..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        aria-label="Search members"
      />

      <select
        value={gender}
        onChange={(event) => onGenderChange(event.target.value)}
        aria-label="Filter by gender"
      >
        <option value="">All genders</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
  );
}
