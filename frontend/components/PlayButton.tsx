import { playAudioMessage } from "lib/playAudioMessage";
import { UploadStatus } from "lib/uploadStatus";
import { useEffect, useState } from "react";

interface PlayButtonProps {
  uploadStatus: UploadStatus;
  audioBinaryData: string;
}
export const PlayButton = (props: PlayButtonProps) => {
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [playing, setIsPlaying] = useState<boolean>(false);

  // Reset the audio binary whenever the underlying data changes
  useEffect(() => {
    if (!props.audioBinaryData) {
      return;
    }

    // Create audio from binary data
    const newAudio = new Audio(
      "data:audio/mpeg;base64," + props.audioBinaryData
    );

    // When the audio has finished playing, set to no longer playing
    newAudio.onended = () => {
      console.log("ended");
      newAudio.currentTime = 0;
      setIsPlaying(false);
    };

    setAudio(newAudio);
  }, [props.audioBinaryData]);

  const onPlay = () => {
    // Play the upload status audio message on press unless the
    // data has already been received
    if (props.uploadStatus != UploadStatus.Ready) {
      playAudioMessage(props.uploadStatus);
      return;
    }

    if (playing) {
      // If currently playing audio, the play button pauses
      audio?.pause();
      setIsPlaying(false);
    } else {
      // If currently paused, the play button plays audio
      console.log("playing audo");
      console.log(audio);
      audio?.play();
      setIsPlaying(true);
    }
  };

  return (
    <button
      className="flex justify-center items-center w-48 h-48 rounded-full bg-papyrus-200 hover:bg-papyrus-300 focus:outline-none"
      onClick={onPlay}
    >
      {playing ? (
        <div className="flex gap-10">
          <div className="w-5 h-24 bg-brown-900"></div>
          <div className="w-5 h-24 bg-brown-900"></div>
        </div>
      ) : (
        <div className="ml-4 w-0 h-0 border-b-transparent border-l-brown-900 border-t-transparent border-r-transparent border-solid border-t-[3rem] border-r-0 border-b-[3rem] border-l-[6rem]"></div>
      )}
    </button>
  );
};
