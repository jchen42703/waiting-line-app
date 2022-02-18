import { useParams } from "react-router-dom";

export default function QueueDashboard() {
  let { queueId } = useParams();
  console.log(queueId);

  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Queue Dashboard</h2>
      <button className="btn btn-primary">daisyUI Button</button>
      <button className="btn btn-secondary">daisyUI Button</button>
    </main>
  );
}
