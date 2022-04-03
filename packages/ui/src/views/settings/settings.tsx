import "../../styles/styles.scss";
import { Navigate } from "react-router-dom";

export default function SettingsPage({ user }) {
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold underline"> Settings!</h1>
    </div>
  );
}
