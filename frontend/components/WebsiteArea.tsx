import { ChangeEvent, FormEvent, useState } from "react";

interface WebsiteAreaProps {
  submit: (text: string) => void;
}
export const WebsiteArea = (props: WebsiteAreaProps) => {
  const [value, setValue] = useState<string>("");

  return (
    <form
      className="bg-papyrus-200 rounded-lg p-4 m-0"
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        props.submit(value);
      }}
    >
      <div className="flex flex-col justify-center items-center pt-5 pb-6">
        <p className="font-bold mb-1 text-xl text-brown-900 dark:text-white">
          Provide a website URL to read its contents aloud.
        </p>
      </div>
      <input
        type="text"
        className="bg-papyrus-300 w-full rounded-lg p-2"
        onChange={(e: ChangeEvent) =>
          setValue((e.target as HTMLInputElement).value)
        }
      />
      <input
        className="bg-brown-700 text-sm text-white font-bold px-3 py-2 mt-4 rounded-md hover:bg-brown-800 hover:cursor-pointer"
        type="submit"
        value="Read this website aloud"
      />
    </form>
  );
};
