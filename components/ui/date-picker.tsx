"use client"

import * as React from "react"
import DatePickerLib from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  placeholder: string;
}

export function DatePicker({ date, setDate, placeholder }: DatePickerProps) {
  const [inputValue, setInputValue] = React.useState<string>(
    date ? formatDate(date) : ""
  );
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (date) {
      setInputValue(formatDate(date));
    }
  }, [date]);

  function formatDate(date: Date) {
    const d = date.getDate().toString().padStart(2, "0");
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const y = date.getFullYear();
    return `${d}-${m}-${y}`;
  }

  function parseDate(str: string): Date | undefined {
    const parts = str.split("-");
    if (parts.length === 3) {
      const [d, m, y] = parts;
      const dt = new Date(Number(y), Number(m) - 1, Number(d));
      if (!isNaN(dt.getTime())) return dt;
    }
    return undefined;
  }

  // Auto-format input as dd-mm-yyyy
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 8) value = value.slice(0, 8);
    let formatted = value;
    if (value.length > 4) {
      formatted = `${value.slice(0, 2)}-${value.slice(2, 4)}-${value.slice(4)}`;
    } else if (value.length > 2) {
      formatted = `${value.slice(0, 2)}-${value.slice(2)}`;
    }
    setInputValue(formatted);
    if (value.length === 8) {
      const parsed = parseDate(formatted);
      setDate(parsed);
    } else {
      setDate(undefined);
    }
  };

  return (
    <div className="relative flex items-center w-full">
      <DatePickerLib
        selected={date}
        onChange={(d: Date | null) => {
          setDate(d || undefined);
          if (d) setInputValue(formatDate(d));
        }}
        customInput={
          <div className="relative w-full">
            <input
              ref={inputRef}
              type="text"
              className={cn(
                "w-full pr-10 rounded-md border border-input bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                !inputValue && "text-muted-foreground"
              )}
              placeholder={placeholder}
              value={inputValue}
              onChange={handleInputChange}
              maxLength={10}
              inputMode="numeric"
              pattern="[0-9]*"
            />
            <Button
              type="button"
              variant="ghost"
              className="absolute right-1 top-1/2 -translate-y-1/2 p-2 h-8 w-8"
              tabIndex={-1}
              aria-label="Open calendar"
              onClick={() => inputRef.current?.focus()}
            >
              <CalendarIcon className="h-5 w-5" />
            </Button>
          </div>
        }
        dateFormat="dd-MM-yyyy"
        popperPlacement="bottom-start"
        showPopperArrow={false}
        calendarClassName="z-[9999]"
        wrapperClassName="w-full"
        autoComplete="off"
        openToDate={date || undefined}
        placeholderText={placeholder}
        isClearable
      />
    </div>
  );
} 