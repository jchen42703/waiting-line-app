import QueueTable from "./QueueTable";
import QueueTableDelete from "./QueueTableDelete";

export default function QueueTableHandler({
  deleteUserEnabled,
}: {
  deleteUserEnabled: boolean;
}) {
  if (deleteUserEnabled) {
    return <QueueTableDelete />;
  } else return <QueueTable />;
}
