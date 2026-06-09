export const validators = {
  required: (value: string, label = "This field") =>
    value.trim() ? null : `${label} is required`,

  email: (value: string) => {
    if (!value.trim()) return "Email is required";
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ? null
      : "Please enter a valid email address";
  },

  phone: (value: string) => {
    if (!value.trim()) return "Phone number is required";
    return /^[\d\s\+\-\(\)]{7,15}$/.test(value)
      ? null
      : "Please enter a valid phone number";
  },

  minLength: (value: string, min: number, label = "This field") =>
    value.trim().length >= min
      ? null
      : `${label} must be at least ${min} characters`,
};

export function validateAssessmentForm(data: Record<string, string>) {
  const errors: Record<string, string> = {};
  const fn = validators.required(data.fullName, "Full name");
  if (fn) errors.fullName = fn;
  const ph = validators.phone(data.phone);
  if (ph) errors.phone = ph;
  const em = validators.email(data.email);
  if (em) errors.email = em;
  if (!data.whoNeedsCare) errors.whoNeedsCare = "Please select who needs care";
  if (!data.typeOfCare)   errors.typeOfCare = "Please select care type";
  if (!data.whenNeeded)   errors.whenNeeded = "Please select a timeline";
  return errors;
}

export function validateContactForm(data: Record<string, string>) {
  const errors: Record<string, string> = {};
  const nm = validators.required(data.name, "Name");
  if (nm) errors.name = nm;
  const em = validators.email(data.email);
  if (em) errors.email = em;
  const ph = validators.phone(data.phone);
  if (ph) errors.phone = ph;
  return errors;
}

export function validateCareerForm(data: Record<string, string>) {
  const errors: Record<string, string> = {};
  const nm = validators.required(data.name, "Name");
  if (nm) errors.name = nm;
  const em = validators.email(data.email);
  if (em) errors.email = em;
  const ph = validators.phone(data.phone);
  if (ph) errors.phone = ph;
  const rl = validators.required(data.role, "Role");
  if (rl) errors.role = rl;
  return errors;
}
