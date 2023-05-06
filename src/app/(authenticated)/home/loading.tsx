export default function Loading() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="h-4 w-4 animate-bounce rounded-full bg-indigo-700"></div>
        <div className="h-4 w-4 animate-bounce rounded-full bg-indigo-800"></div>
        <div className="h-4 w-4 animate-bounce rounded-full bg-indigo-900"></div>
      </div>
    </div>
  );
}
