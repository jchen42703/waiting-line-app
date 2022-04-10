import { useParams } from "react-router-dom";
import { Text,Button } from "@chakra-ui/react";
import AdminNavBar from "../../components/AdminNavBar";
import QR from "../../components/dashboard/analytics/QR";

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
      <QR queueId = {queueId}></QR>
      </>
  );
};

export default AnalyticsDashboard;
