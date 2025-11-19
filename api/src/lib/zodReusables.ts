import z from "zod";

const passwordSchema = z.string().refine((val) => {
  const hasMinLength = val.length >= 8;
  const hasMaxLength = val.length <= 256;
  const hasUpperCase = /[A-Z]/.test(val);
  const hasLowerCase = /[a-z]/.test(val);
  const hasNumber = /\d/.test(val);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(val);
  return (
    hasMinLength &&
    hasMaxLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    hasSpecialChar
  );
});

const themeSchema = z.enum(["light", "dark"]);

const timezoneSchema = z.string().refine((val) => {
  const timeZones = new Set(Intl.supportedValuesOf("timeZone"));
  return timeZones.has(val);
});

const localeSchema = z.string().refine((val) => {
  const locales = new Set(["it", "en"]);
  return locales.has(val);
});

const scheduleSchema = z.object({
  monday: z.coerce.number().min(0).max(1440),
  tuesday: z.coerce.number().min(0).max(1440),
  wednesday: z.coerce.number().min(0).max(1440),
  thursday: z.coerce.number().min(0).max(1440),
  friday: z.coerce.number().min(0).max(1440),
  saturday: z.coerce.number().min(0).max(1440),
  sunday: z.coerce.number().min(0).max(1440),
});

export {
  passwordSchema,
  themeSchema,
  timezoneSchema,
  localeSchema,
  scheduleSchema,
};
