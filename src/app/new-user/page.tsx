import Image from "next/image";
import { WelcomeUserForm } from "~/app/_ui/auth/welcome-user-form";

export default function NewUser() {
  return (
    <div className="flex min-h-screen min-w-full justify-center bg-neutral-200">
      <section className="mx-auto my-auto flex max-w-3xl flex-grow flex-col gap-8 rounded-lg border bg-white px-5 py-20 shadow-xl">
        <header className="flex items-center justify-center gap-4">
          <Image src={"/favicon.ico"} height={60} width={60} alt="logo" />
          <h1 className="text-5xl font-black">Welcome to Regiftt</h1>
        </header>

        <h2 className="max-w-[30ch] self-center text-center text-lg font-extrabold text-neutral-500">
          Get started by creating your awesome @username
        </h2>

        <WelcomeUserForm />
      </section>
    </div>
  );
}
