"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";
import { type FieldName, type FieldValues } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "~/app/_ui/shared/popover";
import { cn } from "~/lib/cn";
import { Button } from "./button";
import { Calendar } from "./calendar";

export function DatePicker<T extends FieldValues>({
  register,
  name,
}: {
  register?: (name: FieldName<T>, value: Date | undefined) => void;
  name?: FieldName<T>;
}) {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start rounded-lg text-left font-normal",
            !date && "text-neutral-600"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(e) => {
            setDate(e);
            register && name && register(name, e);
          }}
          initialFocus
          fromDate={new Date()}
        />
      </PopoverContent>
    </Popover>
  );
}
