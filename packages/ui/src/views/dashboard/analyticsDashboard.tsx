import { useParams } from "react-router-dom";
import AdminNavBar from "../../components/AdminNavBar";
import Layout from "../../components/dashboard/analytics/Layout";
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
      <AdminNavBar></AdminNavBar>
      <Layout queueId={queueId}></Layout>
    </>
  );
};

export default AnalyticsDashboard;
