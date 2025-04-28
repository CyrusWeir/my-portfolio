import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

function MessageForm() {
  const form = useRef<HTMLFormElement | null>(null);
  const cheeky = useRef<HTMLInputElement | null>(null);
  const [isSending, setIsSending] = useState(false);

  const sendEmail = (e: React.FormEvent) => {
    setIsSending(true);
    e.preventDefault();
    if (cheeky.current?.checked) {
      toast.error("Spam detected");
    } else {
      form.current
        ? emailjs
            .sendForm(
              `${import.meta.env.VITE_YOUR_SERVICE_ID}`,
              `${import.meta.env.VITE_YOUR_TEMPLATE_ID}`,
              form.current,
              {
                publicKey: `${import.meta.env.VITE_YOUR_PUBLIC_KEY}`,
              },
            )
            .then(
              () => {
                toast.success("Your message has been sent successfully.");
                setIsSending(false);
                if (form.current) {
                  form.current.reset();
                }
              },
              (error) => {
                toast.error(`Your message has not been sent ${error.text}`);
                setIsSending(false);
              },
            )
        : toast.error("Form reference is null");
    }
  };

  return (
    <form onSubmit={sendEmail} ref={form}>
      <label htmlFor="user_name">Your name</label>
      <input type="text" name="name" required />
      <label htmlFor="email">Your email</label>
      <input type="email" name="email" required />
      <label htmlFor="message">Your message</label>
      <textarea name="message" required />
      <input type="checkbox" name="checkbox" className="hidden" ref={cheeky} />
      <button type="submit" disabled={isSending}>
        {isSending ? "sending..." : "submit"}
      </button>
    </form>
  );
}
export default MessageForm;
