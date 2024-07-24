"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl } from "@/components/ui/form";

import { z } from "zod";
import CustomFormField from "../custom-form-field/CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { userFormValidation } from "@/lib/valisation";
import { createUser } from "@/lib/actions/patient.actions";
import { useRouter } from "next/navigation";
import { User } from "@/types/index.t";
import { FieldType } from "./PatientForm";
import { GenderOptions } from "@/app/constants";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const RegisterForm = ({ user }: { user: User }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof userFormValidation>>({
    resolver: zodResolver(userFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof userFormValidation>) => {
    setIsLoading(true);

    try {
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      const newUser = await createUser(user);

      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-12"
      >
        <section className="space-y-4 ">
          <h1 className="text-4xl font-bold">Hello again</h1>
          <p className="text-lg text-dark-700">
            Let us know a bit more about you
          </p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
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

        <div className="flex flex-col gap-6 xl:flex-row">
          <div className="flex-1">
            <CustomFormField
              control={form.control}
              fieldType={FieldType.INPUT}
              name="email"
              label="email address"
              placeholder="donald.trump@outlook.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="Email"
            />
          </div>

          <div className="flex-1">
            <CustomFormField
              fieldType={FieldType.PHONE_NUMBER}
              control={form.control}
              name="phone"
              label="Phone number"
              placeholder="(555) 123-4567"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <div className="flex-1">
            <CustomFormField
              fieldType={FieldType.DATE_PICKER}
              control={form.control}
              name="date_of_birth"
              label="Date of Birth"
            />
          </div>

          <CustomFormField
            fieldType={FieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((option, i) => (
                    <div key={option + i} className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        <SubmitButton isLoading={isLoading}> Submit </SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
