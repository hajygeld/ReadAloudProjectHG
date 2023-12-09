import { ChangeEvent, useState } from "react";

interface TextAreaProps {
  submit: (text: string) => void;
}
export const TextArea = (props: TextAreaProps) => {
  const [value, setValue] = useState<string>("");

  return (
    <form className="bg-papyrus-200 rounded-lg p-4 m-0">
      <div className="flex flex-col justify-center items-center pt-5 pb-6">
        <p className="font-bold mb-1 text-xl text-brown-900 dark:text-white">
          Type plain text to read aloud.
        </p>
      </div>
      <textarea
        className="bg-papyrus-300 w-full rounded-lg p-2"
        onChange={(e: ChangeEvent) =>
          setValue((e.target as HTMLTextAreaElement).value)
        }
        cols={30}
        rows={10}
      ></textarea>
      <input
        className="bg-brown-700 text-sm text-white font-bold px-3 py-2 mt-2 rounded-md hover:bg-brown-800 hover:cursor-pointer"
        type="button"
        value="Read this text aloud"
        onClick={() => {
          props.submit(value);
        }}
      />
    </form>
  );
};
