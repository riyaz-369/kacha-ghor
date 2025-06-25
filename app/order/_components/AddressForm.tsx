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
import {
  allDivision,
  districtsOf,
  upazilasOf,
} from "@bangladeshi/bangladesh-address";

import { UseFormReturn } from "react-hook-form";
import { AddressFormValues } from "./AddressFormSchema";

interface AddressFormProps {
  form: UseFormReturn<AddressFormValues>;
}

const AddressForm = ({ form }: AddressFormProps) => {
  const [areas, setAreas] = useState<string[]>([]);
  const cities = allDivision();

  const { watch, setValue } = form;

  const city = watch("city");
  const area = watch("area");
  const upazilas = upazilasOf(area);

  useEffect(() => {
    if (city) {
      // @ts-ignore
      setAreas(districtsOf(city));
      setValue("area", "");
      setValue("upazila", "");
    }
  }, [city, setValue]);

  return (
    <div className="md:grid gap-4 md:space-y-0 space-y-4">
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input placeholder="Full Name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone</FormLabel>
            <FormControl>
              <Input placeholder="Phone" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="col-span-2 space-y-4">
        {/* select city */}
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={(value) => {
                  form.setValue("city", value);
                  form.setValue("area", ""); // Reset area on city change
                }}
                value={field.value}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city: string, i: number) => (
                    <SelectItem key={i} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* select area */}
        <FormField
          control={form.control}
          name="area"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select area" />
                </SelectTrigger>
                <SelectContent>
                  {areas.map((area: string, i: number) => (
                    <SelectItem key={i} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* upozila */}
        <FormField
          control={form.control}
          name="upazila"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select upazila" />
                </SelectTrigger>
                <SelectContent>
                  {upazilas.map((item, i: number) => (
                    <SelectItem key={i} value={item.upazila}>
                      {item.upazila}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Input placeholder="Address" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="zipCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Postal Code</FormLabel>
            <FormControl>
              <Input placeholder="Postal Code" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Textarea className="col-span-2" placeholder="Order Notes (optional)" />
    </div>
  );
};

export default AddressForm;
