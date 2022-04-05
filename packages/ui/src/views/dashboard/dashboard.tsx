import AdminNavBar from "../../components/AdminNavBar"
import { Fragment } from "react";

export default function Dashboard() {
  return (
    <Fragment>
    <AdminNavBar />
    <main style={{ padding: "1rem 0" }}>
      <h2>Dashboard</h2>
      <button className="btn btn-primary">daisyUI Button</button>{" "}
    </main>
    </Fragment>
  );
}
