import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SearchParamProps } from "@/types/index.t";
import { getAppointments } from "@/lib/actions/appointment.actions";
import { Doctors } from "@/app/constants";
import { formatDateTime } from "../../../../../lib/utils";
import { Button } from "@/components/ui/button";
export default async function Success({
  params: { userId },
  searchParams,
}: SearchParamProps) {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointments(appointmentId);
  const doctor = Doctors.find(
    (doc) => doc.name === appointment.primaryPhysician
  );

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            width={1000}
            height={1000}
            className="h-10 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            alt="success"
            width={300}
            height={280}
            className="h-10 w-fit"
          />

          <h2 className="header mb-6 max-w-[600px] text-center">
            Your appointment has been{" "}
            <span className="text-green-500">successfully</span> scheduled!
          </h2>
          <p>We will be in touch shortly</p>
        </section>

        <section className="request-details">
          <p>Requested appointments details</p>
          <div className="flex item-center gap-3">
            <Image
              src={doctor?.image!}
              alt="success"
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr.{doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              alt="success"
              width={24}
              height={24}
            />
            <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/appointments`}>New Appointment</Link>
        </Button>
        <p className="copyright mt-10 py-5">
          © 2021 HelloDoc. All rights reserved.
        </p>
      </div>
    </div>
  );
}
