"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

import { z } from "zod";
import CustomFormField from "../custom-form-field/CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAppointmentSchema } from "@/lib/validation";
import { FieldType } from "./PatientForm";
import { SelectItem } from "@/components/ui/select";
import { Doctors } from "@/app/constants";
import Image from "next/image";
import { Status } from "@/types/index.t";
import {
  createAppointment,
  updateAppointment,
} from "@/lib/actions/appointment.actions";
import { Appointment } from "@/types/appwrite.types";
import { AnyNode } from "postcss";

const AppointmentForm = ({
  type,
  userId,
  patientId,
  appointment,
  setOpen,
}: {
  type: "create" | "cancel" | "schedule";
  userId: string;
  patientId: string;
  appointment?: Appointment;
  setOpen: (open: boolean) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // 1. Define your form.
  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment && appointment.primaryPhysician,
      schedule: appointment ? new Date(appointment.schedule) : new Date(),
      reason: appointment && appointment.reason,
      note: appointment && appointment.note,
      cancellationReason: appointment
        ? (appointment.cancellationReason as string | undefined)
        : "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof AppointmentFormValidation>
  ) => {
    setIsLoading(true);

    let status;

    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
        break;
    }

    try {
      if (type === "create" && patientId) {
        console.log("Creating appointment");
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          reason: values.reason!,
          schedule: new Date(values.schedule),
          note: values.note,
          status: status as Status,
          cancellationReason: values.cancellationReason,
        };
        const appointment = await createAppointment(appointmentData);
        console.log("appointment", appointment);
        if (appointment) {
          console.log("Appointment created successfully");
          form.reset();
          router.push(
            `/patients/${userId}/appointments/success?appointmentId=${appointment.$id}`
          );
        }
      } else {
        const appointmentToUpdate = {
          userId,
          patient: patientId,
          appointmentId: appointment?.$id!,

          appointment: {
            primaryPhysician: values.primaryPhysician,
            schedule: new Date(values.schedule),
            status: status as Status,
            cancellationReason: values.cancellationReason,
          },
          type,
        };
        const updatedAppointment = await updateAppointment(
          appointmentToUpdate as any
        );
        console.log("updatedAppointment", updatedAppointment);
        if (updatedAppointment) {
          console.log("Appointment updated successfully");
          form.reset();
          setOpen(false);
        }
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  let buttonLabel;

  switch (type) {
    case "create":
      buttonLabel = "Create Appointment";
      break;
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        {type === "create" && (
          <section className="mb-12 space-y-4 ">
            <h1 className="text-4xl font-bold">New Appointment</h1>
            <p className="text-lg text-dark-700">Create a new appointment</p>
          </section>
        )}
        {type !== "cancel" && (
          <>
            <CustomFormField
              fieldType={FieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Primary care physician"
              placeholder="Select a doctor"
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
            </CustomFormField>{" "}
            <CustomFormField
              fieldType={FieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Appointment Date"
              showTimeSelect={true}
              dateFormats="dd/MM/yyyy -hh:mm aa"
            />
            <div className="flex flex-col gap-6 xl:flex-row">
              <div className="flex-1">
                <CustomFormField
                  control={form.control}
                  fieldType={FieldType.TEXTAREA}
                  name="reason"
                  label="Reason for appointment"
                  placeholder="Headache, fever, etc."
                />
              </div>

              <CustomFormField
                control={form.control}
                fieldType={FieldType.TEXTAREA}
                name="note"
                label="Note"
                placeholder="Any additional information"
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            control={form.control}
            fieldType={FieldType.TEXTAREA}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="reason for cancellation"
          />
        )}

        <SubmitButton
          className={`${
            type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
          } w-full`}
          isLoading={isLoading}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};
export default AppointmentForm;
