
import UsersTable from "./features/users/UsersTable";
import { useTableParams } from "./hooks/useTableParams";

function App() {
  const { params, update } = useTableParams();

  return (
    <main className="app">
      <header>
        <h1>Abanyamuryango</h1>
        <p>Kigali Cooperative Members Directory</p>
      </header>

      <UsersTable params={params} update={update} />
    </main>
  );
}

export default App;
