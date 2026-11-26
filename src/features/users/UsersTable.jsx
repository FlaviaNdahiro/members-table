
import { useEffect, useState } from "react";
import { useUsers } from "./queries";
import { useDebounce } from "../../hooks/useDebounce";
import TableToolbar from "./TableToolbar";
import TablePagination from "./TablePagination";
import SortableHeader from "./SortableHeader";
import EmptyState from "../../components/EmptyState";
import ErrorState from "../../components/ErrorState";

export default function UsersTable({ params, update }) {
  const [search, setSearch] = useState(params.q);

  const debouncedSearch = useDebounce(search, 500);

  // Keep the search box synchronized with URL changes.
  useEffect(() => {
    setSearch(params.q);
  }, [params.q]);

  // Update the URL after the user stops typing.
  useEffect(() => {
    if (debouncedSearch !== params.q) {
      update({ q: debouncedSearch });
    }
  }, [debouncedSearch]);

  const { data, isLoading, isFetching, isError, refetch } =
    useUsers(params);

  const users = data?.users || [];
  const total = data?.total || 0;

  if (isLoading) {
    return <p>Loading members...</p>;
  }

  if (isError) {
    return <ErrorState onRetry={refetch} />;
  }

  return (
    <section>
      <TableToolbar
        search={search}
        gender={params.gender}
        onSearchChange={setSearch}
        onGenderChange={(gender) => update({ gender })}
      />

      {isFetching && <p>Refreshing members...</p>}

      {users.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <SortableHeader
                  label="Name"
                  sortKey="firstName"
                  sortBy={params.sortBy}
                  order={params.order}
                  onSort={(sortBy, order) => update({ sortBy, order })}
                />
                <th>Email</th>
                <th>Phone</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Company</th>
                <th>City</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.age}</td>
                  <td>{user.gender}</td>
                  <td>{user.company?.name || "—"}</td>
                  <td>{user.address?.city || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <TablePagination
        page={params.page}
        pageSize={params.pageSize}
        total={total}
        onPageChange={(page) => update({ page })}
        onPageSizeChange={(pageSize) => update({ pageSize })}
      />
    </section>
  );
}
