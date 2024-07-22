"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

import { z } from "zod";
import CustomFormField from "../custom-form-field/CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { userFormValidation } from "@/lib/valisation";
import { createUser } from "@/lib/actions/patient.actions";

export enum FieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  CHECKBOX = "checkbox",
  RADIO = "radio",
  SELECT = "select",
  PHONE_NUMBER = "phone_number",
  DATE_PICKER = "date_picker",
  SKELETON = "skeleton",
}

const PatientForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof userFormValidation>>({
    resolver: zodResolver(userFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof userFormValidation>) {
    setIsLoading(true);
    try {
      const userData = { name, email, phone };
      const user = await createUser(userData);
      if (user) {
        console.log("User created successfully");
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4 ">
          <h1 className="text-4xl font-bold">Welcome to HelloDoc</h1>
          <p className="text-lg text-dark-700">
            Please enter your details to continue
          </p>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FieldType.INPUT}
          name="name"
          label="Username"
          placeholder="Donal Trump"
          iconSrc="/assets/icons/user.svg"
          iconAlt="User"
        />

        <CustomFormField
          control={form.control}
          fieldType={FieldType.INPUT}
          name="email"
          label="email address"
          placeholder="donald.trump@outlook.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="Email"
        />

        <CustomFormField
          fieldType={FieldType.PHONE_NUMBER}
          control={form.control}
          name="phone"
          label="Phone number"
          placeholder="(555) 123-4567"
        />

        <SubmitButton isLoading={isLoading}> Submit </SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
