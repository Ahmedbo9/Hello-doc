import React from "react";
import Image from "next/image";
import AppointmentForm from "../../../../components/forms/AppointmentsForm";
import { SearchParamProps } from "@/types/index.t";
import { getPatient } from "@/lib/actions/patient.actions";
import { Patient } from "@/types/appwrite.types";

export default async function Appointment({
  params: { userId },
}: SearchParamProps) {
  const patient = (await getPatient(userId)) as Patient;
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            className="mb-12 h-10 w-fit"
            alt="home-img"
          ></Image>

          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient?.$id}
          />

          <p className="copyright mt-10 py-5">
            © 2021 HelloDoc. All rights reserved.
          </p>
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        className="side-img max-w-[390px] bg-bottom"
        alt="home-img"
      ></Image>
    </div>
  );
}
