"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { AddressFormValues } from "./AddressFormSchema";
import { UseFormReturn } from "react-hook-form";
import { Separator } from "@/components/ui/separator";

interface OrderSummaryProps {
  form: UseFormReturn<AddressFormValues>;
}

const OrderSummary = ({ form }: OrderSummaryProps) => {
  return (
    <div className="lg:col-span-4 space-y-6 mt-8 lg:mt-0">
      <div className="sticky top-0 border p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">
          Order Summary: <span className="text-primary">{"400"}</span>
        </h2>

        {/* Cart Items */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm border-b pb-2">
            <div className="flex items-center gap-2 w-full">
              <Image
                src={"/placeholder.jpg"}
                alt={"placeholder"}
                width={50}
                height={50}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="w-full">
                <p>
                  <span className="font-semibold">{"item name"}</span> -{" "}
                </p>
                <p className="flex justify-between">
                  <span>৳200 x 2</span>
                  <span className="text-right"> = ৳400</span>
                </p>
              </div>
            </div>
            {/* <p>x{item.quantity}</p> */}
          </div>
        </div>

        {/* Totals */}
        <div className="mt-2 text-sm space-y-1">
          <div className="flex justify-between">
            <span className="font-semibold">Subtotal</span>
            <span>৳400</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>৳60</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-semibold text-base">
            <span>Total</span>
            <span>৳460</span>
          </div>
        </div>

        {/* Promo Code */}
        {/* <div className="mt-4">
                <Input placeholder="Promo code" />
                <Button variant="outline" className="mt-2 w-full">
                  Apply
                </Button>
              </div> */}
        <Separator className="my-2" />
        {/* payment methods */}
        <div className="my-4">
          <h2 className="font-semibold my-4">Payment</h2>
          <RadioGroup defaultValue="cashOnDelivery" className="flex">
            <Label>
              <RadioGroupItem value="cashOnDelivery" />
              <span>Cash on Delivery</span>
            </Label>
          </RadioGroup>
        </div>

        {/* CTA */}
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="mt-6 w-full"
        >
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;
