// Speaks the provided message text aloud
export const playAudioMessage = (messageText: string) => {
  // Check that the UI is not being server-side rendered
  if (typeof window !== "undefined") {
    const message = new SpeechSynthesisUtterance();
    message.text = messageText;
    message.rate = 1.2;
    window.speechSynthesis.speak(message);
  }
};
