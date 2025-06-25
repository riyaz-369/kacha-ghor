"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { AddressFormValues } from "./AddressFormSchema";
import { UseFormReturn } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Truck,
  Gift,
  CreditCard,
  Banknote,
  CheckCircle,
  Sparkles,
} from "lucide-react";

interface OrderSummaryProps {
  form: UseFormReturn<AddressFormValues>;
  deliveryCost: number;
}

const OrderSummary = ({ form, deliveryCost }: OrderSummaryProps) => {
  const subtotal = 400;
  const isFreeDelivery = deliveryCost > 0;

  return (
    <div className="lg:col-span-4 space-y-6 mt-8 lg:mt-0">
      <div className="sticky top-0 border border-gray-200 bg-white p-6 rounded-xl">
        {/* Header with Badge */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary font-semibold"
          >
            ৳{subtotal}
          </Badge>
        </div>

        {/* Cart Items */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
            <div className="relative">
              <Image
                src={"/placeholder.jpg"}
                alt={"placeholder"}
                width={64}
                height={64}
                className="w-16 h-16 object-cover rounded-lg border-2 border-white shadow-sm"
              />
              <Badge
                variant="secondary"
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs font-bold"
              >
                2
              </Badge>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 mb-1">Item Name</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">৳200 × 2</span>
                <span className="font-semibold text-gray-900">৳400</span>
              </div>
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span className="font-semibold">৳{subtotal}</span>
          </div>

          <div className="flex justify-between items-center text-gray-700">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-gray-500" />
              <span>Delivery Charge</span>
            </div>
            <span
              className={
                isFreeDelivery ? "line-through text-gray-400" : "font-semibold"
              }
            >
              ৳{deliveryCost}
            </span>
          </div>

          {/* Enhanced Free Delivery Section */}
          {isFreeDelivery && (
            <div className="relative">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-100 via-emerald-50 to-green-100 rounded-lg animate-pulse"></div>

              <div className="relative flex items-center justify-between p-4 border-2 border-green-100 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Gift className="w-6 h-6 text-green-600" />
                    <Sparkles className="w-3 h-3 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
                  </div>
                  <div>
                    <p className="font-bold text-green-800 flex items-center gap-2">
                      FREE DELIVERY!
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </p>
                    <p className="text-xs text-green-700">
                      You saved ৳{deliveryCost} on delivery
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-600 hover:bg-green-700 text-white text-[11px] font-bold px-3 py-1">
                  SAVED ৳{deliveryCost}
                </Badge>
              </div>
            </div>
          )}

          <Separator className="my-4" />

          {/* Total */}
          <div className="flex justify-between items-center py-2 bg-gray-50 px-4 rounded-lg">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <div className="text-right">
              <span className="text-2xl font-bold text-primary">
                ৳{subtotal}
              </span>
              {isFreeDelivery && (
                <p className="text-sm text-green-600 font-semibold">
                  Including FREE delivery
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Payment Methods */}
        <div className="mb-6">
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-lg flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Method
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value}
                    defaultValue="cash_on_delivery"
                  >
                    <div className="flex items-center space-x-3 p-4 border-2 border-primary rounded-lg hover:border-primary/50 hover:bg-gray-50 transition-all cursor-pointer">
                      <RadioGroupItem
                        className="sr-only"
                        value="cash_on_delivery"
                        id="cod"
                      />
                      <Label
                        htmlFor="cod"
                        className="flex items-center gap-3 cursor-pointer flex-1"
                      >
                        <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                          <Banknote className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            Cash on Delivery
                          </p>
                          <p className="text-sm text-gray-600">
                            Pay when you receive your order
                          </p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Enhanced CTA Button */}
        <div className="space-y-3">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full h-12 text-lg font-bold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
          >
            {form.formState.isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Place Order
              </div>
            )}
          </Button>

          {isFreeDelivery && (
            <div className="text-center">
              <p className="text-sm text-green-600 font-semibold flex items-center justify-center gap-1">
                <Sparkles className="w-4 h-4" />
                Free delivery applied automatically!
                <Sparkles className="w-4 h-4" />
              </p>
            </div>
          )}
        </div>

        {/* Trust Indicators */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-center items-center gap-6 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-1">
              <Truck className="w-3 h-3 text-blue-500" />
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center gap-1">
              <Gift className="w-3 h-3 text-purple-500" />
              <span>Easy Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
