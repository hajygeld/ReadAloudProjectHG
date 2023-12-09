export enum UploadStatus {
  IdleFile = "Select a file to begin.",
  IdleText = "Enter text to begin.",
  IdleWebsite = "Enter a URL to begin.",
  Uploading = "Uploading. Please wait.",
  Ready = "Done uploading. Press play to listen.",
}

export const isIdleStatus = (uploadStatus: UploadStatus) => {
  return [
    UploadStatus.IdleFile,
    UploadStatus.IdleText,
    UploadStatus.IdleWebsite,
  ].includes(uploadStatus);
};

type StringToStatus = {
  [key: string]: UploadStatus;
};

export const tabToStatusMap: StringToStatus = {
  "File Upload": UploadStatus.IdleFile,
  Text: UploadStatus.IdleText,
  "Website URL": UploadStatus.IdleWebsite,
};
