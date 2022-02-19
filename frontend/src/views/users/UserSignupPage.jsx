import { useParams } from "react-router-dom";
import SignUpWindow from "../../components/UserSignUpModal";
export default function UserSignupPage(props) {
  let { queueId } = useParams();
  console.log(queueId);
  return <SignUpWindow queueId={queueId}></SignUpWindow>;
}
