import { Navigate, Link, useParams } from "react-router-dom";
import AdminNavBar from "../../components/AdminNavBar";
import Layout from "../../components/dashboard/analytics/Layout";
import { config } from "../../lib/config";
import { useState, useEffect } from "react";
import { Button, Box } from "@chakra-ui/react";

/**
 * Typically used for the /queue/:queueId route
 */
const AnalyticsDashboard = () => {
  const { queueId } = useParams();
  const [queuedUsers, setQueuedUsers] = useState([]);
  const [queueInfo, setQueueInfo] = useState({});

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
    } catch (err: any) {
      console.error(err.message);
    }
  };

  // get metadata of queue
  const fetchQueueInfo = async (queueId) => {
    try {
      const res = await fetch(
        `${config.hostUrl}/api/admin/singleQueue?queueId=${queueId}`,
        {
          method: "GET",
          cache: "no-cache",
          credentials: "include",
        },
      );

      const { queue } = await res.json();
      setQueueInfo(queue);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchUsers(queueId);
    fetchQueueInfo(queueId);
  }, []);

  if (queuedUsers == null || queueInfo == null) {
    return <Navigate to="/dashboard"></Navigate>;
  }

  return (
    <>
      <AdminNavBar></AdminNavBar>
      <Box pt="1%">
        <Link to="/dashboard">
          <Button>Back to Queue Manager</Button>
        </Link>
      </Box>
      <Layout queueInfo={queueInfo} queuedUsers={queuedUsers}></Layout>
    </>
  );
};

export default AnalyticsDashboard;
