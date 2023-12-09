import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { isIdleStatus, tabToStatusMap, UploadStatus } from "lib/uploadStatus";
import { TabGroup } from "./Tab";
import { TextArea } from "./TextArea";
import { UploadArea } from "./UploadArea";
import { WebsiteArea } from "./WebsiteArea";

type StringToComponent = {
  [key: string]: JSX.Element;
};

interface InterfacePanelProps {
  uploadStatus: UploadStatus;
  setUploadStatus: Dispatch<SetStateAction<UploadStatus>>;
  submitFile: (
    e: ChangeEvent,
    fileRef: React.RefObject<HTMLInputElement>
  ) => void;
  submitText: (text: string) => void;
  submitURL: (url: string) => void;
}
export const InputPanel = (props: InterfacePanelProps) => {
  const [tab, setTab] = useState<string>("File Upload");

  const tabToComponentMap: StringToComponent = {
    "File Upload": <UploadArea submit={props.submitFile} />,
    Text: <TextArea submit={props.submitText} />,
    "Website URL": <WebsiteArea submit={props.submitURL} />,
  };

  const onTabChange = (tab: string) => {
    setTab(tab);

    if (isIdleStatus(props.uploadStatus)) {
      props.setUploadStatus(tabToStatusMap[tab]);
    }
  };

  return (
    <div className="w-full px-4 mdmin:border-r-2 border-r-brown-800">
      <div className="w-full py-2 truncate">
        <div className="py-2 text-3xl font-bold text-brown-900">ReadAloud</div>
        <TabGroup onChange={onTabChange} />
      </div>
      {tab ? tabToComponentMap[tab] : ""}
    </div>
  );
};
