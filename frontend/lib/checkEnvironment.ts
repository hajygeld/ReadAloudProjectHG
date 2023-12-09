// Appends the provided path to the backend URL,
// throwing an error if the frontend is not configured correctly.
export const extendBackendUrl = (path: string) => {
  const url = process.env.NEXT_PUBLIC_API_URL + path;
  if (!url) {
    throw Error(
      "Frontend server error (must set environment variable NEXT_PUBLIC_API_URL)."
    );
  }
  return url;
};
