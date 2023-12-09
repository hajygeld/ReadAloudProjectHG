import { signIn } from "lib/auth";
import { User } from "firebase/auth";

interface SignInButtonProps {
  onSignIn: (user: User) => void;
}
export const SignInButton = (props: SignInButtonProps) => {
  return (
    <button
      className="font-semibold block bg-brown-700 px-3 py-2 rounded-md hover:bg-brown-800 text-white text-sm"
      onClick={async () => {
        const user = await signIn();
        props.onSignIn(user);
      }}
    >
      <b>G</b> Sign in with Google
    </button>
  );
};
