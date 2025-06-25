import { z } from "zod";

export type ShippingMethod = "inside_dhaka" | "outside_dhaka";

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
  notes: z.string().optional(),
  shippingMethod: z.enum(["inside_dhaka", "outside_dhaka"], {
    message: "Shipping method is required",
  }),
  paymentMethod: z.enum(["cash_on_delivery", "online_payment"], {
    message: "Shipping method is required",
  }),
});

export type AddressFormValues = z.infer<typeof AddressFormSchema>;
