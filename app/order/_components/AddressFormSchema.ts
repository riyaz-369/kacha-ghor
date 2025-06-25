import { z } from "zod";

export const AddressFormSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^01[3-9][0-9]{8}$/, "Invalid phone number"),
  city: z.string().min(1, "City is required"),
  area: z.string().min(1, "Area is required"),
  upazila: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  zipCode: z.string().optional(),
});

export type AddressFormValues = z.infer<typeof AddressFormSchema>;
