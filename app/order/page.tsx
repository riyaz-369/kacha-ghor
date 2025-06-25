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
  ShippingMethod,
} from "./_components/AddressFormSchema";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Truck, Clock, Package } from "lucide-react";

export default function CheckoutPage() {
  const [deliveryCost, setDeliveryCost] = useState(60);
  const [selectedShipping, setSelectedShipping] =
    useState<ShippingMethod>("outside_dhaka");

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(AddressFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      city: "",
      area: "",
      upazila: "",
      address: "",
      zipCode: "",
      notes: "",
      shippingMethod: "inside_dhaka",
      paymentMethod: "cash_on_delivery",
    },
  });

  const handleChangeDeliveryMethod = (method: ShippingMethod) => {
    setSelectedShipping(method);
    if (method === "inside_dhaka") {
      setDeliveryCost(60);
    } else {
      setDeliveryCost(120);
    }
    form.setValue("shippingMethod", method);
  };

  const onSubmit = async (data: AddressFormValues) => {
    console.log("form data", data);
    // Add loading state and success handling here
  };

  const shippingOptions = [
    {
      id: "outside_dhaka",
      title: "Outside Dhaka",
      subtitle: "Standard Delivery",
      duration: "3-5 days",
      price: 120,
      icon: <Package className="w-5 h-5" />,
      features: [
        "Nationwide coverage",
        "Secure packaging",
        "Insurance included",
      ],
      popular: false,
    },
    {
      id: "inside_dhaka",
      title: "Inside Dhaka",
      subtitle: "Express Delivery",
      duration: "1-3 days",
      price: 60,
      icon: <Truck className="w-5 h-5" />,
      features: [
        "Same day delivery available",
        "Real-time tracking",
        "Priority handling",
      ],
      popular: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-7xl mx-auto px-4 py-8 lg:grid lg:grid-cols-12 gap-8"
        >
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Delivery Address Card */}
            <Card className="shadow-none">
              <CardContent>
                <AddressForm form={form} />

                {/* Shipping Methods */}
                <div className="mt-6">
                  <RadioGroup
                    value={selectedShipping}
                    onValueChange={handleChangeDeliveryMethod}
                    className="flex items-center justify-center gap-6"
                  >
                    {shippingOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`relative w-full p-5 border-2 rounded-xl transition-all duration-200 cursor-pointer hover:shadow-md ${
                          selectedShipping === option.id
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Label
                          htmlFor={option.id}
                          className="flex items-start gap-4 cursor-pointer w-full"
                        >
                          <RadioGroupItem
                            value={option.id}
                            id={option.id}
                            className="sr-only"
                          />

                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`p-2 rounded-lg ${
                                    selectedShipping === option.id
                                      ? "bg-primary text-white"
                                      : "bg-gray-100 text-gray-600"
                                  }`}
                                >
                                  {option.icon}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-gray-900">
                                      {option.title}
                                    </h3>
                                  </div>
                                  <p className="text-sm text-gray-600">
                                    {option.subtitle}
                                  </p>
                                </div>
                              </div>

                              <div className="text-right">
                                <div className="font-bold text-lg text-primary">
                                  ৳{option.price}
                                </div>
                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                  <Clock className="w-3 h-3" />
                                  {option.duration}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4">
            <OrderSummary form={form} deliveryCost={deliveryCost} />
          </div>
        </form>
      </Form>
    </div>
  );
}
