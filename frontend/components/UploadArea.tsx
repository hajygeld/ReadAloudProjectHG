import { ChangeEvent, useRef } from "react";

interface UploadAreaProps {
  submit: (e: ChangeEvent, fileRef: React.RefObject<HTMLInputElement>) => void;
}
export const UploadArea = (props: UploadAreaProps) => {
  const fileRef = useRef<HTMLInputElement>(null);
  return (
    <form className="bg-papyrus-200 rounded-lg p-4 m-0 hover:bg-papyrus-300">
      <label htmlFor="dropzone-file">
        <div className="flex flex-col justify-center items-center pt-5 pb-6 hover:cursor-pointer">
          <svg
            aria-hidden="true"
            className="h-72 text-brown-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <p className="mb-2 text-xl text-brown-900 dark:text-white">
            Click to upload or drag and drop
          </p>
          <p className="font-bold text-lg text-brown-900 dark:text-white">
            .png, .jpg, .gif, .docx, or .pdf
          </p>
          <p className="text-lg text-brown-900 dark:text-white">
            (images: max. 800 x 400px)
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          ref={fileRef}
          onChange={(e: ChangeEvent) => props.submit(e, fileRef)}
        />
      </label>
    </form>
  );
};
