"use server";
import {
  DATABASE_ID,
  databases,
  APPOINTMENT_COLLECTION_ID,
} from "../appwrite.config";
import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";
import { CreateAppointmentParams } from "@/types/index.t";

export const createAppointment = async (
  appointmentData: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      {
        ...appointmentData,
      }
    );
    return parseStringify(newAppointment);
  } catch (error: any) {
    console.error(
      "An error occurred while registering a new appointment :",
      error
    );
  }
};

export const getAppointments = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );
    return parseStringify(appointment);
  } catch (error: any) {
    console.error("An error occurred while fetching appointments :", error);
  }
};
