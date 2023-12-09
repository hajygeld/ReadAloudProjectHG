import { User } from "firebase/auth";

interface UserDisplayProps {
  user?: User;
}
export const UserDisplay = (props: UserDisplayProps) => {
  return props.user ? <div>Signed in as {props.user.displayName}.</div> : null;
};
