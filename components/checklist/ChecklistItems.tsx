"use client";

import { useId } from "react";
import { CheckIcon } from "@/components/ui/Icons";

interface ChecklistItemsProps {
  items: string[];
  checked: Set<number>;
  onToggle: (index: number) => void;
}

export function ChecklistItems({ items, checked, onToggle }: ChecklistItemsProps) {
  const baseId = useId();

  return (
    <ul className="space-y-2.5">
      {items.map((item, index) => {
        const id = `${baseId}-${index}`;
        const isChecked = checked.has(index);
        return (
          <li key={index}>
            <label
              htmlFor={id}
              className={`flex cursor-pointer items-start gap-3.5 rounded-2xl px-4 py-3.5 leading-relaxed transition ${
                isChecked ? "bg-royal-soft/60" : "bg-paper hover:bg-royal-soft/40"
              }`}
            >
              <input
                id={id}
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggle(index)}
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition peer-focus-visible:ring-2 peer-focus-visible:ring-royal peer-focus-visible:ring-offset-2 ${
                  isChecked ? "bg-royal text-white" : "border-2 border-slate-300 bg-white"
                }`}
              >
                {isChecked && <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} />}
              </span>
              <span className={isChecked ? "text-slate-400 line-through" : "font-medium text-ink"}>{item}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
