import { type InputHTMLAttributes } from "react";
import {
  type FieldErrors,
  type FieldValues,
  type Path,
  type RegisterOptions,
  type UseFormRegister,
} from "react-hook-form";
import { cn } from "~/lib/cn";
import { AutoLabel } from "./label";

export const Input = <I extends FieldValues>({
  register,
  as = "input",
  displayName,
  errors,
  rules,
  showLabel = true,
  ...props
}: {
  showLabel?: boolean;
  register: UseFormRegister<I>;
  displayName: Path<I>;
  errors: FieldErrors<I>;
  rules?: RegisterOptions;
  as?: "input" | "textarea";
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">) => {
  const Render = as;

  return (
    <fieldset className="flex h-24 flex-col gap-1">
      {showLabel && <AutoLabel htmlFor={displayName}>{displayName}</AutoLabel>}

      <Render
        className={cn(
          "rounded-md border bg-input px-2 py-1 transition-all duration-100 placeholder:text-neutral-400 focus:bg-input/60 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:border-neutral-600 placeholder:dark:text-neutral-500",
          props.className
        )}
        placeholder={props.placeholder || ""}
        {...(as === "textarea" && { rows: 3 })}
        {...register(displayName, rules)}
      />

      {errors[displayName]?.message && (
        <p className="text-xs text-red-500">{errors[displayName]?.message?.toString()}</p>
      )}
    </fieldset>
  );
};
