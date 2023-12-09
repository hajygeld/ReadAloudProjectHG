import { UploadStatus } from "lib/uploadStatus";
import { PlayButton } from "./PlayButton";

interface ResultsPanelProps {
  fileName: string;
  fileText: string;
  audioBinaryData: string;
  uploadStatus: UploadStatus;
}

export const ResultsPanel = (props: ResultsPanelProps) => {
  return (
    <div className="w-full h-full">
      <div className="px-5">
        <div className="font-bold italic text-xl text-brown-800 py-3">
          {props.uploadStatus}
        </div>
        <div className="font-bold text-xl text-brown-800 py-2">
          {props.fileName}
        </div>
        <div className="overflow-y-auto text-brown-800">{props.fileText}</div>
        <div className="mt-8 mb-8 flex justify-center items-center">
          <PlayButton
            uploadStatus={props.uploadStatus}
            audioBinaryData={props.audioBinaryData}
          />
        </div>
      </div>
    </div>
  );
};
