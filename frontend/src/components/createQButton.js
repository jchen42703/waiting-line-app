import { useState } from "react";

export const CreateQButton = (props) => {
  const [status, setStatus] = useState(false);
  const [queueId, setQueueId] = useState("");

  const postData = async (url = "", data = {}) => {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  };

  const handleClick = async () => {
    const payload = {
      adminId: "testAdmin",
    };
    try {
      const data = await postData(
        "http://localhost:5000/api/queue/create",
        payload
      );
      console.log("data: ", data);
      setStatus(true);
      setQueueId(data.queueId);
    } catch (err) {
      console.log("err: ", err);
      setStatus(false);
    }
  };

  return <button onClick={handleClick}>Create queue</button>;
};
