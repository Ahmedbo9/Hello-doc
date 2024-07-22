"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { z } from "zod";
import CustomFormField from "../custom-form-field/CustomFormField";

const formSchema = z.object({
  username: z
    .string()
    .min(2)
    .max(50, { message: "Username must be between 2 and 50 characters" }),
});

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
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
          name="username"
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
          control={form.control}
          fieldType={FieldType.PHONE_NUMBER}
          name="Phone Number"
          label="Phone Number"
          placeholder="555-555-5555"
          // iconSrc="/assets/icons/phone.svg"
          // iconAlt="Phone"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default PatientForm;
