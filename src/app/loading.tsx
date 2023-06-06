import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex min-h-screen min-w-full flex-col items-center justify-center">
      <Image
        src="/favicon.ico"
        alt="Logo"
        width={150}
        height={150}
        priority
        className="z-20 animate-pulse"
      />
    </div>
  );
}
