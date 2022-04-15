import { Navigate, useParams } from "react-router-dom";
import AdminNavBar from "../../components/AdminNavBar";
import Layout from "../../components/dashboard/analytics/Layout";
import { config } from "../../lib/config";
import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";

/**
 * Typically used for the /queue/:queueId route
 */
const AnalyticsDashboard = () => {
  const { queueId } = useParams();
  const [queuedUsers, setQueuedUsers] = useState([]);

  const toast = useToast(); // A toast to show some errors

  //   1. Fetch queue information for queueId
  //   2. Make editing queue info easy to do
  // Display queue related analytics
  // Add create queue QR code for this URL
  // Add navigation buttton to go back to previous page in router history
  // Daniel probs made one ^

  // fetch users for this queue
  const fetchUsers = async (queueId) => {
    try {
      const res = await fetch(
        `${config.hostUrl}/api/queue/all?queueId=${queueId}`,
        {
          method: "GET",
          cache: "no-cache",
          credentials: "include",
        },
      );

      const { users } = await res.json();
      setQueuedUsers(users);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchUsers(queueId);
    }, 5000); // call every second

    return () => clearInterval(interval);
  }, []);

  if (queuedUsers == null) {
    return <Navigate to="/dashboard"></Navigate>;
  }

  return (
    <>
      <AdminNavBar></AdminNavBar>
      <Layout queuedUsers={queuedUsers}></Layout>
    </>
  );
};

export default AnalyticsDashboard;
