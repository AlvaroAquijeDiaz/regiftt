import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex min-h-screen min-w-full flex-col items-center justify-center">
      <div className="animate-pulse">
        <Image src="/favicon.ico" alt="Logo" width={200} height={200} />
      </div>
    </div>
  );
}
