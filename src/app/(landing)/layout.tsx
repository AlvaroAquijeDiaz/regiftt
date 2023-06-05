import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import Link, { type LinkProps } from "next/link";
import { Button } from "~/ui/shared/button";

const myLinks = [
  {
    name: "Twitter",
    url: "https://twitter.com/@alvaro_dotdev",
    icon: <Twitter size={20} className="group-hover:text-blue-400" />,
  },
  {
    name: "Github",
    url: "https://github.com/AlvaroAquijeDiaz",
    icon: <Github size={20} className="group-hover:text-white" />,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/status.n_418/",
    icon: <Instagram size={20} className="group-hover:text-red-400" />,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/alvaro-dev-ad/",
    icon: <Linkedin size={20} className="group-hover:text-sky-400" />,
  },
];

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex min-h-screen w-full flex-col justify-center bg-neutral-900">
      <main className="h-full w-full flex-grow px-4 pb-8 pt-24">{children}</main>

      <footer className="flex items-center gap-2 px-5 py-3 text-neutral-400">
        <p>
          Developed with ❤️ by{" "}
          <Button variant="link" className="text-md px-0 text-neutral-400 hover:text-white">
            <Link
              href={"https://linkedin.com/in/alvaro-dev-ad" as LinkProps["href"]}
              rel="noreferrer"
              target="_blank"
            >
              Alvaro Aquije
            </Link>
          </Button>
        </p>

        <div>
          {myLinks.map((link, idx) => (
            <Button variant="link" className="group px-2 py-1 text-neutral-400" key={idx}>
              <Link href={link.url as LinkProps["href"]} rel="noreferrer" target="_blank">
                {link.icon}
              </Link>
            </Button>
          ))}
        </div>
      </footer>
    </section>
  );
}
