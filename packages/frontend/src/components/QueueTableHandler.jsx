import QueueTable from "./QueueTable";
import QueueTableDelete from "./QueueTableDelete";

export default function QueueTableHandler(props) {
  const deleteUserEnabled = props.deleteUserEnabled;
  if (deleteUserEnabled) {
    return <QueueTableDelete />;
  } else return <QueueTable />;
}
