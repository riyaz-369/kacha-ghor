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
  Plus,
  Minus,
} from "lucide-react";
import { useState } from "react";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderSummaryProps {
  form: UseFormReturn<AddressFormValues>;
  deliveryCost: number;
  items?: OrderItem[];
  onUpdateQuantity?: (itemId: string, newQuantity: number) => void;
}

const OrderSummary = ({
  form,
  deliveryCost,
  items = [
    {
      id: "1",
      name: "Item Name",
      price: 200,
      quantity: 2,
      image: "/placeholder.jpg",
    },
  ],
  onUpdateQuantity,
}: OrderSummaryProps) => {
  const [localItems, setLocalItems] = useState<OrderItem[]>(items);

  // Calculate subtotal based on current quantities
  const subtotal = localItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const isFreeDelivery = deliveryCost > 0;

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1

    const updatedItems = localItems.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );

    setLocalItems(updatedItems);

    // Call parent callback if provided
    if (onUpdateQuantity) {
      onUpdateQuantity(itemId, newQuantity);
    }
  };

  const increaseQuantity = (itemId: string) => {
    const item = localItems.find((item) => item.id === itemId);
    if (item) {
      handleQuantityChange(itemId, item.quantity + 1);
    }
  };

  const decreaseQuantity = (itemId: string) => {
    const item = localItems.find((item) => item.id === itemId);
    if (item && item.quantity > 1) {
      handleQuantityChange(itemId, item.quantity - 1);
    }
  };

  return (
    <div className="lg:col-span-4 space-y-6 mt-8 lg:mt-0">
      <div className="sticky top-0 border border-gray-200 bg-white p-6 rounded-xl">
        {/* Header with Badge */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">অর্ডার সামারি</h2>
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary font-semibold"
          >
            ৳{subtotal}
          </Badge>
        </div>

        {/* Cart Items */}
        <div className="space-y-4 mb-6">
          {localItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
            >
              <div className="relative">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover rounded-lg border-2 border-white shadow-sm"
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 mb-2">{item.name}</p>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-gray-100"
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-12 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-gray-100"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <span className="text-sm text-gray-600">
                      ৳{item.price} each
                    </span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    ৳{item.price * item.quantity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Price Breakdown */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-gray-700">
            <span>সাবটোটাল</span>
            <span className="font-semibold">৳{subtotal}</span>
          </div>

          <div className="flex justify-between items-center text-gray-700">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-gray-500" />
              <span>ডেলিভারি চার্জ</span>
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
                      ডেলিভারিতে আপনি ৳{deliveryCost} সাশ্রয় করেছেন
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
            <span className="text-lg font-bold text-gray-900">সর্বমোট</span>
            <div className="text-right">
              <span className="text-2xl font-bold text-primary">
                ৳{subtotal}
              </span>
              {isFreeDelivery && (
                <p className="text-sm text-green-600 font-semibold">
                  বিনামূল্যে ডেলিভারি সহ
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
                  <span>পেমেন্ট মেথড</span>
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value}
                    defaultValue="cash_on_delivery"
                  >
                    <div className="flex items-center space-x-3 p-4 border-2 border-primary rounded-lg bg-primary/5 hover:bg-gray-50 transition-all cursor-pointer">
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
                            অর্ডার পেলে পেমেন্ট করুন
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
                অর্ডার করা হচ্ছে...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                অর্ডার করুন
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
