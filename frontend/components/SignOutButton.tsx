import { signOutFromApp } from "lib/auth";

interface SignOutButtonProps {
  onSignOut: () => void;
}
export const SignOutButton = (props: SignOutButtonProps) => {
  return (
    <button
      className="font-semibold block bg-brown-700 px-3 py-2 rounded-md hover:bg-brown-800 text-white text-sm"
      onClick={async () => {
        await signOutFromApp();
        props.onSignOut();
      }}
    >
      Sign out
    </button>
  );
};
