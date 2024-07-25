"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl } from "@/components/ui/form";
import { SelectItem } from "@radix-ui/react-select";
import { z } from "zod";
import CustomFormField from "../custom-form-field/CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { userFormValidation } from "@/lib/valisation";
import { createUser } from "@/lib/actions/patient.actions";
import { useRouter } from "next/navigation";
import { User } from "@/types/index.t";
import { FieldType } from "./PatientForm";
import { Doctors, GenderOptions } from "@/app/constants";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";

const RegisterForm = ({ user }: { user: User }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
        <section className="space-y-4">
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
              label="Email address"
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
                  value={field.value}
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

        <div className="flex flex-col gap-6 xl:flex-row">
          <div className="flex-1">
            <CustomFormField
              control={form.control}
              fieldType={FieldType.INPUT}
              name="adress"
              label="Address"
              placeholder="4356 st avenue, New York, NY, 10001"
            />
          </div>

          <div className="flex-1">
            <CustomFormField
              control={form.control}
              fieldType={FieldType.INPUT}
              name="occupation"
              label="Occupation"
              placeholder="Teacher"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <div className="flex-1">
            <CustomFormField
              control={form.control}
              fieldType={FieldType.INPUT}
              name="emergency_contact_name"
              label="Emergency Contact Name"
              placeholder="Emergency Contact Name"
            />
          </div>

          <div className="flex-1">
            <CustomFormField
              fieldType={FieldType.PHONE_NUMBER}
              control={form.control}
              name="emergency_contact_phone"
              label="Emergency Contact Phone"
              placeholder="(555) 123-4567"
            />
          </div>
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FieldType.SELECT}
          control={form.control}
          name="primaryPhysician"
          label="Primary care physician"
          placeholder="Select a physician"
        >
          {Doctors.map((doctor, i) => (
            <SelectItem key={doctor.name + i} value={doctor.name}>
              <div className="flex cursor-pointer items-center gap-2">
                <Image
                  src={doctor.image}
                  width={32}
                  height={32}
                  alt="doctor"
                  className="rounded-full border border-dark-500"
                />
                <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        <SubmitButton isLoading={isLoading}>Submit</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
