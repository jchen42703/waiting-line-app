import "../../styles/styles.scss";
import Nav from "../../components/NavBar";
import NavDrawer from "../../components/Drawer";

export default function Home() {
  return (
    <div>
      <Nav></Nav>
      <NavDrawer></NavDrawer>
      <h1 className="text-3xl font-bold underline"> Hello world!</h1>
    </div>
  );
}
