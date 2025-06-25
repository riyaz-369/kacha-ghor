"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  allDivision,
  districtsOf,
  upazilasOf,
} from "@bangladeshi/bangladesh-address";

import { UseFormReturn } from "react-hook-form";
import { AddressFormValues } from "./AddressFormSchema";
import {
  User,
  Phone,
  MapPin,
  Building,
  Mail,
  FileText,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

interface AddressFormProps {
  form: UseFormReturn<AddressFormValues>;
}

const AddressForm = ({ form }: AddressFormProps) => {
  const [areas, setAreas] = useState<string[]>([]);
  const [isLoadingAreas, setIsLoadingAreas] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const cities = allDivision();
  const { watch, setValue, formState } = form;

  const city = watch("city");
  const area = watch("area");
  const fullName = watch("fullName");
  const phone = watch("phone");
  const address = watch("address");
  const zipCode = watch("zipCode");

  const upazilas = upazilasOf(area);

  // Track completed fields for progress indication
  useEffect(() => {
    const completed = [];
    if (fullName) completed.push("fullName");
    if (phone) completed.push("phone");
    if (city) completed.push("city");
    if (area) completed.push("area");
    if (address) completed.push("address");
    if (zipCode) completed.push("zipCode");
    setCompletedSteps(completed);
  }, [fullName, phone, city, area, address, zipCode]);

  useEffect(() => {
    if (city) {
      setIsLoadingAreas(true);
      // Simulate loading for better UX
      setTimeout(() => {
        // @ts-ignore
        setAreas(districtsOf(city));
        setValue("area", "");
        setValue("upazila", "");
        setIsLoadingAreas(false);
      }, 300);
    }
  }, [city, setValue]);

  const getFieldIcon = (fieldName: string) => {
    switch (fieldName) {
      case "fullName":
        return <User className="w-4 h-4" />;
      case "phone":
        return <Phone className="w-4 h-4" />;
      case "city":
      case "area":
      case "upazila":
        return <MapPin className="w-4 h-4" />;
      case "address":
        return <Building className="w-4 h-4" />;
      case "zipCode":
        return <Mail className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const isFieldCompleted = (fieldName: string) => {
    return completedSteps.includes(fieldName);
  };

  const getFieldStatus = (fieldName: string) => {
    const hasError = formState.errors[fieldName as keyof AddressFormValues];
    const isCompleted = isFieldCompleted(fieldName);

    if (hasError) return "error";
    if (isCompleted) return "completed";
    return "default";
  };

  const renderFormField = (
    name: keyof AddressFormValues,
    label: string,
    placeholder: string,
    type: "input" | "select" | "textarea" = "input"
  ) => {
    const status = getFieldStatus(name);
    const icon = getFieldIcon(name);

    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            {/* {type !== "select" && ( */}
            <FormLabel className="flex items-center gap-2 font-semibold text-gray-700">
              <span
                className={`${
                  status === "completed"
                    ? "text-green-600"
                    : status === "error"
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
              >
                {icon}
              </span>
              {label}
              {status === "error" && (
                <AlertCircle className="w-4 h-4 text-red-600" />
              )}
            </FormLabel>
            {/* )} */}

            <FormControl>
              <div className="relative">
                {type === "input" && (
                  <Input
                    placeholder={placeholder}
                    {...field}
                    className={`pl-4 pr-10 transition-all duration-200 ${
                      status === "completed"
                        ? "border-green-500 bg-green-50"
                        : status === "error"
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-gray-400 focus:border-primary"
                    }`}
                  />
                )}

                {type === "select" && name === "city" && (
                  <Select
                    onValueChange={(value) => {
                      form.setValue("city", value);
                      form.setValue("area", "");
                      form.setValue("upazila", "");
                    }}
                    value={field.value}
                  >
                    <SelectTrigger
                      className={`transition-all duration-200 w-full ${
                        status === "completed"
                          ? "border-green-500 bg-green-50"
                          : status === "error"
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city: string, i: number) => (
                        <SelectItem
                          key={i}
                          value={city}
                          className="hover:bg-primary/10"
                        >
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {type === "select" && name === "area" && (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!city || isLoadingAreas}
                  >
                    <SelectTrigger
                      className={`transition-all w-full duration-200 ${
                        status === "completed"
                          ? "border-green-500 bg-green-50"
                          : status === "error"
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 hover:border-gray-400"
                      } ${!city ? "opacity-50" : ""}`}
                    >
                      <SelectValue
                        placeholder={
                          isLoadingAreas
                            ? "Loading areas..."
                            : !city
                            ? "Select city first"
                            : placeholder
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {isLoadingAreas ? (
                        <div className="flex items-center justify-center p-4">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="ml-2 text-sm">Loading...</span>
                        </div>
                      ) : (
                        areas.map((area: string, i: number) => (
                          <SelectItem
                            key={i}
                            value={area}
                            className="hover:bg-primary/10"
                          >
                            {area}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                )}

                {type === "select" && name === "upazila" && (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!area}
                  >
                    <SelectTrigger
                      className={`transition-all w-full duration-200 ${
                        status === "completed"
                          ? "border-green-500 bg-green-50"
                          : status === "error"
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 hover:border-gray-400"
                      } ${!area ? "opacity-50" : ""}`}
                    >
                      <SelectValue
                        placeholder={!area ? "Select area first" : placeholder}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {upazilas.map((item, i: number) => (
                        <SelectItem
                          key={i}
                          value={item.upazila}
                          className="hover:bg-primary/10"
                        >
                          {item.upazila}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {/* Status indicator */}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {status === "completed" && (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  )}
                  {status === "error" && (
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  )}
                </div>
              </div>
            </FormControl>
            <FormMessage className="text-sm" />
          </FormItem>
        )}
      />
    );
  };

  const progressPercentage = Math.round((completedSteps.length / 6) * 100);

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg border">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Building className="w-5 h-5 text-primary" />
            Delivery Address
          </h3>
          <Badge variant="outline" className="text-primary border-primary">
            {completedSteps.length}/6 Complete
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Form Fields */}
      <div>
        {/* Personal Information */}
        <div className="grid lg:grid-cols-2 gap-4 mb-4">
          {renderFormField("fullName", "Full Name", "Enter your full name")}
          {renderFormField("phone", "Phone Number", "Enter your phone number")}
        </div>

        {/* Location Information */}
        <div className="space-y-4">
          {renderFormField(
            "city",
            "Division",
            "Select your division",
            "select"
          )}
          {renderFormField(
            "area",
            "District",
            "Select your district",
            "select"
          )}
          {renderFormField(
            "upazila",
            "Upazila",
            "Select your upazila",
            "select"
          )}
        </div>

        {/* Address Details */}
        <div className="grid lg:grid-cols-2 gap-4 my-4">
          {renderFormField(
            "address",
            "Street Address",
            "Enter your street address"
          )}
          {renderFormField("zipCode", "Postal Code", "Enter postal code")}
        </div>

        {/* Order Notes */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 font-semibold text-gray-700">
                <FileText className="w-4 h-4 text-gray-500" />
                Order Notes
                <Badge variant="secondary" className="text-xs">
                  Optional
                </Badge>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any special instructions for delivery? (e.g., floor number, nearby landmarks, preferred delivery time)"
                  className="min-h-[80px] resize-none border-gray-300 hover:border-gray-400 focus:border-primary transition-colors"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default AddressForm;
