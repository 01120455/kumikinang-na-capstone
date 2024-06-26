"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Sidemenu from "../../../components/sidemenu/page";
import EmployeeAvatar from "../../../components/employeeavatar/page";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { AddItem, item } from "@/schemas/item.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export default function AddProduct() {
  const form = useForm<AddItem>({
    resolver: zodResolver(item),
    defaultValues: {
      name: "",
      type: "",
      quality: "",
      variety: "",
      quantity: undefined,
      acquisition: "Processed",
    },
  });

  const handleSubmit = async (values: AddItem) => {
    try {
      await axios.post("/api/addproduct", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Product added successfully");
      // show a success message to the user via alert,sonner, toast ???
    } catch (error) {
      console.error("Error adding product:", error);
      // show an error message to the user via alert,sonner,toast ???
    }
  };

  return (
    <div className="flex h-screen">
      <Sidemenu />
      <Toaster />
      <div className="flex-1 overflow-y-auto p-8 ">
        <EmployeeAvatar />
        <Form {...form}>
          <form
            className="flex justify-center"
            onSubmit={(event) => {
              form.handleSubmit(handleSubmit)(event); // Submit the form
              toast("Item Added to Invetory", {});
            }}
          >
            <Card className="w-full max-w-3xl ">
              <CardHeader className="flex flex-row space-y-0 items-start gap-2">
                <div className="grid gap-1">
                  <CardTitle>Add New Product</CardTitle>
                  <CardDescription>Enter product details</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4 md:gap-6">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="name"
                            placeholder="Enter product name..."
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="type">Type</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="type"
                            placeholder="Enter product type..."
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="variety"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="variety">Variety</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="variety"
                            placeholder="Enter product variety..."
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="quality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="quality">Quality</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="quality"
                            placeholder="Enter product quality..."
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="quantity">Quantity</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="quantity"
                            placeholder="Enter product quantity..."
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="acquisition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="acquisition">Acquisiton</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="acquisition"
                            placeholder="Enter product acquisition..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:gap-4">
                  <Button type="submit">Submit</Button>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
}
