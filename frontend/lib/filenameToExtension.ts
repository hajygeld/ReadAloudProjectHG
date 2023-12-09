// Extracts the file extension from a filename,
// converting it to an appropriate backend path
export const filenameToExtension = (filename: string) => {
  if (
    filename.endsWith(".png") ||
    filename.endsWith(".jpeg") ||
    filename.endsWith(".jpg") ||
    filename.endsWith(".gif")
  ) {
    return "/image";
  } else if (filename.endsWith(".docx")) {
    return "/docx";
  } else if (filename.endsWith(".pdf")) {
    return "/pdf";
  }
  return "";
};
