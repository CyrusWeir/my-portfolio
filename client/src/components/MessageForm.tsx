import { useState } from "react";
import { toast } from "react-toastify";
import type { message } from "../types/portfolioTypes";

function MessageForm() {
  const [messageData, setMessageData] = useState<message>({
    user_name: "",
    email: "",
    message: "",
  });

  console.warn("MessageData:", messageData);

  const handleInputModification = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setMessageData({
      ...messageData,
      [name]: value,
    });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const creationResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/api/message`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(messageData),
        },
      );
      if (creationResponse.ok) {
        toast.success("Message successfully sent");
      }
    } catch {
      toast.error("unable to send.");
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="user_name">Your name</label>
      <input type="text" name="user_name" onChange={handleInputModification} />
      <label htmlFor="email">Your email</label>
      <input type="text" name="email" onChange={handleInputModification} />
      <label htmlFor="message">Your message</label>
      <textarea name="message" onChange={handleInputModification} />
      <button type="submit">submit</button>
    </form>
  );
}
export default MessageForm;
