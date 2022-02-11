import "./App.css";
import { useState } from "react";
import "./styles/styles.scss";

const StatusMessage = (props) => {
  // props: {
  //   status: boolean
  // }
  if (props.statusValue) {
    return <button>{props.textInsideButton}</button>;
  } else {
    return <button>Error</button>;
  }
};

const App = () => {
  const [status, setStatus] = useState(false);
  const [queueId, setQueueId] = useState("");

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

  return (
    <div className="App">
      <button onClick={handleClick}>Create queue</button>
      <p>Status: {JSON.stringify(status)}</p>
      <p>{queueId}</p>
      <StatusMessage
        statusValue={status}
        textInsideButton={queueId}
      ></StatusMessage>
    </div>
  );
};

export default App;
