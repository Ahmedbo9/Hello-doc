"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl } from "@/components/ui/form";
import { z } from "zod";
import CustomFormField from "../custom-form-field/CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { PatientFormValidation } from "@/lib/validation";
import { createUser, registerPatient } from "@/lib/actions/patient.actions";
import { useRouter } from "next/navigation";
import { User } from "@/types/index.t";
import { FieldType } from "./PatientForm";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/app/constants";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { SelectItem } from "@/components/ui/select";
import FileUploader from "../FileUploader";

const RegisterForm = ({ user }: { user: User }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
    },
  });

  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    setIsLoading(true);

    let formData;
    if (
      values.identificationDocument &&
      values.identificationDocument?.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }

    try {
      const patientData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,
      };
      //@ts-ignore
      const patient = await registerPatient(patientData);

      if (patient) {
        // router.push(`/patients/${user.$id}/appointments`);
        console.log("Patient created", patient);
        console.log("formdata", formData);
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
              name="birthDate"
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
              name="address"
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
              name="emergencyContactName"
              label="Emergency Contact Name"
              placeholder="Emergency Contact Name"
            />
          </div>

          <div className="flex-1">
            <CustomFormField
              fieldType={FieldType.PHONE_NUMBER}
              control={form.control}
              name="emergencyContactNumber"
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
          {Doctors.map((doctor) => (
            <SelectItem key={doctor.name} value={doctor.name}>
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

        <div className="flex flex-col gap-6 xl:flex-row">
          <div className="flex-1">
            <CustomFormField
              control={form.control}
              fieldType={FieldType.INPUT}
              name="insuranceProvider"
              label="Insurance Provider"
              placeholder="XXX Insurance"
            />
          </div>

          <div className="flex-1">
            <CustomFormField
              control={form.control}
              fieldType={FieldType.INPUT}
              name="insurancePolicyNumber"
              label="Insurance Policy Number"
              placeholder="123456789"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <div className="flex-1">
            <CustomFormField
              control={form.control}
              fieldType={FieldType.TEXTAREA}
              name="allergies"
              label="Allergies (optional)"
              placeholder="Peanuts, pollen, etc."
            />
          </div>

          <div className="flex-1">
            <CustomFormField
              control={form.control}
              fieldType={FieldType.TEXTAREA}
              name="medications"
              label="Medications (optional)"
              placeholder="Aspirin, etc."
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <div className="flex-1">
            <CustomFormField
              control={form.control}
              fieldType={FieldType.TEXTAREA}
              name="familyMedicalHistory"
              label="Family Medical History (optional)"
              placeholder="Diabetes, cancer, etc."
            />
          </div>

          <div className="flex-1">
            <CustomFormField
              control={form.control}
              fieldType={FieldType.TEXTAREA}
              name="pastMedicalHistory"
              label="Past Medical History (optional)"
              placeholder="Broken leg, etc."
            />
          </div>
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FieldType.SELECT}
          control={form.control}
          name="identificationType"
          label="Identification Type"
          placeholder="Select an identification type"
        >
          {IdentificationTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </CustomFormField>

        <div>
          <CustomFormField
            control={form.control}
            fieldType={FieldType.INPUT}
            name="identificationNumber"
            label="Identification Number"
            placeholder="123456789"
          />
        </div>

        <CustomFormField
          fieldType={FieldType.SKELETON}
          control={form.control}
          name="identificationDocument"
          label="Scan of Identification Document"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consentement, Privacy and Disclosure</h2>
          </div>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FieldType.CHECKBOX}
          name="treatmentConsent"
          label="I consent to treatment"
        />

        <CustomFormField
          control={form.control}
          fieldType={FieldType.CHECKBOX}
          name="disclosureConsent"
          label="I consent to disclosure"
        />

        <CustomFormField
          control={form.control}
          fieldType={FieldType.CHECKBOX}
          name="privacyConsent"
          label="I consent to privacy"
        />

        <SubmitButton isLoading={isLoading}>Submit</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
