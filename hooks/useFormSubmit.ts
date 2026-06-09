"use client";
import { useState } from "react";
import type { FormStatus } from "@/types";

interface UseFormSubmitOptions<T> {
  endpoint: string;
  validate?: (data: T) => Record<string, string>;
  onSuccess?: () => void;
}

export function useFormSubmit<T extends Record<string, string>>({
  endpoint,
  validate,
  onSuccess,
}: UseFormSubmitOptions<T>) {
  const [status, setStatus]   = useState<FormStatus>("idle");
  const [errors, setErrors]   = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  async function submit(data: T) {
    if (validate) {
      const errs = validate(data);
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        return;
      }
    }
    setErrors({});
    setStatus("loading");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      setMessage("Thank you! We'll be in touch within 1–2 business days.");
      onSuccess?.();
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again or call us directly.");
    }
  }

  return { submit, status, errors, message, setErrors };
}
