"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import OrderSummary from "./_components/OrderSummary";
import { Form } from "@/components/ui/form";
import AddressForm from "./_components/AddressForm";
import {
  AddressFormSchema,
  AddressFormValues,
} from "./_components/AddressFormSchema";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function CheckoutPage() {
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(AddressFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      city: "",
      area: "",
      upazila: "",
      address: "",
    },
  });

  // console.log("orders", orders);

  const onSubmit = async (data: AddressFormValues) => {
    console.log("form data", data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-7xl mx-auto px-4 py-10 lg:grid lg:grid-cols-12 gap-8"
      >
        {/* Checkout Form */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="shadow-none">
            <CardContent className="space-y-6">
              <h2 className="text-xl font-semibold">Delivery Address</h2>
              <AddressForm form={form} />
            </CardContent>
          </Card>
          <Card className="shadow-none">
            <CardContent className="space-y-6">
              <h2 className="text-xl font-semibold">Shipping Method</h2>
              <RadioGroup defaultValue="insideDhaka" className="space-y-3 my-6">
                <Label className="flex items-center space-x-2">
                  <RadioGroupItem value="insideDhaka" />
                  <span>Delivery Inside Dhaka (3-5 days) - ৳60</span>
                </Label>
                <Label className="flex items-center space-x-2">
                  <RadioGroupItem value="outsideDhaka" />
                  <span>Delivery Outside Dhaka (5-7 days) - ৳120</span>
                </Label>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <OrderSummary form={form} />
      </form>
    </Form>
  );
}
