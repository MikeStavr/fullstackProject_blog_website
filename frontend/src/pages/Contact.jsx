import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function Contact() {
  /**
   * [name, setName] = useState("");
   * [email, setEmail] = useState("");
   * [message, setMessage] = useState("");
   *
   *
   * Also add in each input field:
   * value={name}
   * onChange={(e) => setName(e.target.value)}
   *
   * value={email}
   * onChange={(e) => setEmail(e.target.value)}
   *
   * value={message}
   * onChange={(e) => setMessage(e.target.value)}
   *
   */

  function handleSubmit() {
    e.preventDefault();
    // Code to handle form submission

    // Clear the form upon sending the email:
    // setName("");
    // setEmail("");
    // setMessage("");
  }

  return (
    <div className="w-1/3">
      <h1 className="text-primary mb-2 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Contact
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6 whitespace-pre-wrap text-center">
        Feel free to contact us for any questions or concerns related to this
        website.
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6 whitespace-pre-wrap text-center mb-8">
        You can react us at:{" "}
        <a href="mailto:contact@email.com">contact@email.com</a>
      </p>
      <p>Other wise feel free to fill out the form:</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Label className="flex left-0 p-2" htmlFor="name">
          Your name:
        </Label>
        <Input type="text" name="name" required />

        <Label className="flex left-0 p-2" htmlFor="email">
          Your email:
        </Label>
        <Input type="email" name="email" required />

        <Label className="flex left-0 p-2" htmlFor="message">
          Your message:
        </Label>
        <Textarea name="message" required></Textarea>

        <Button type="submit" className="mt-4">
          Send message
        </Button>
      </form>
    </div>
  );
}
