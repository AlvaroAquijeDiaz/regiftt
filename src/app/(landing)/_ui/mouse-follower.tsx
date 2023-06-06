"use client";

import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";

export const MouseFollower = () => {
  const ref = useRef<HTMLDivElement>(null);
  const tabActive = useTabActive();

  useEffect(() => {
    if (!tabActive) {
      ref.current?.style.setProperty("display", "none", "important");
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      ref.current.style.display = "block";
      ref.current.style.left = `${e.clientX - 120}px`;
      ref.current.style.top = `${e.clientY - 120}px`;
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [tabActive]);

  return (
    <div className="z-0">
      <div
        ref={ref}
        className={clsx(
          "pointer-events-none absolute left-0 top-0 z-0 h-64 w-64 rounded-full opacity-10 blur-xl",
          "mouse-follower-blob"
        )}
      />
    </div>
  );
};

export const useTabActive = () => {
  const [visibilityState, setVisibilityState] = useState(true);

  const handleVisibilityChange = useCallback(() => {
    setVisibilityState(document.visibilityState === "visible");
  }, []);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  return visibilityState;
};
