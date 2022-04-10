import { useParams } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import AdminNavBar from "../../components/AdminNavBar";

/**
 * Typically used for the /queue/:queueId route
 */
const AnalyticsDashboard = () => {
  const { queueId } = useParams();
  //   1. Fetch queue information for queueId
  //   2. Make editing queue info easy to do
  // Display queue related analytics
  // Add create queue QR code for this URL
  // Add navigation buttton to go back to previous page in router history
  // Daniel probs made one ^
  return (
    <>
      <AdminNavBar />
      <Text>Analytics Dashboard for queueId {queueId}</Text>
    </>
  );
};

export default AnalyticsDashboard;
