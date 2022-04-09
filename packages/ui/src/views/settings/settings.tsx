import { Box } from "@chakra-ui/react";
import AdminNavBar from "../../components/AdminNavBar";
import "../../styles/styles.scss";

export default function SettingsPage() {
  return (
    <>
      <AdminNavBar />
      <h1 className="text-3xl font-bold underline"> Settings!</h1>
      <Box bg={"brand.red"}>This should be a red box.</Box>
    </>
  );
}
