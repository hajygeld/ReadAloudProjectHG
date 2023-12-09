import { useState } from "react";

export interface TabProps {
  value: string;
  selected?: boolean;
  onClick?: () => void;
}
export const Tab = (props: TabProps) => (
  <button
    type="button"
    className={`${
      props.selected ? "bg-brown-800 font-bold " : "bg-brown-700 font-semibold "
    }w-full text-white mt-1 block px-3 py-2 rounded-md text-sm shadow-sm hover:bg-brown-800`}
    onClick={props.onClick}
  >
    {props.value}
  </button>
);

export interface TabGroupProps {
  onChange: (value: string) => void;
}
export const TabGroup = (props: TabGroupProps) => {
  const [value, setValue] = useState<string>("File Upload");
  const tabs = ["Website URL", "Text", "File Upload"];
  return (
    <div className="flex grid-cols-3 gap-2">
      {tabs.map((tab: string) => (
        <Tab
          key={tab}
          value={tab}
          onClick={() => {
            setValue(tab);
            props.onChange(tab);
          }}
          selected={tab === value}
        />
      ))}
    </div>
  );
};
