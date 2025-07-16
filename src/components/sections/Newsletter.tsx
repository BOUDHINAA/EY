import { Button } from "../ui/button";
import { Input } from "./input";

export const Newsletter = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed!");
  };

  return (
    <section id="newsletter">
      <hr className="w-11/12 mx-auto" />

      <div className="container py-24 sm:py-32">
        <h3 className="text-center text-4xl md:text-5xl font-bold">
          Join Our Daily{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Newsletter
          </span>
        </h3>
        <p className="text-xl text-muted-foreground text-center mt-4 mb-8">
          Lorem ipsum dolor sit amet consectetur.
        </p>

        <form
  className="flex flex-col sm:flex-row w-full gap-4"
  onSubmit={handleSubmit}
>
  <Input
    placeholder="you@example.com"
    className="w-full px-4 py-3 text-base bg-muted/50 dark:bg-muted/80"
    aria-label="email"
  />
  <Button className="px-6 py-3">Subscribe</Button>
</form>
      </div>

      <hr className="w-11/12 mx-auto" />
    </section>
  );
};
