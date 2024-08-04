import { Status } from "@/types/index.t";
import clsx from "clsx";
import React from "react";
import Image from "next/image";
import { StatusIcon } from "@/app/constants";

const StatusBadge = ({ status }: { status: Status }) => {
  console.log(status);
  return (
    <div
      className={clsx("status-badge", {
        "bg-blue-600": status === "pending",
        "bg-green-600": status === "scheduled",
        "bg-red-600": status === "cancelled",
      })}
    >
      <Image
        src={StatusIcon[status]}
        height={24}
        width={24}
        className="h-fit w-3"
        alt={status}
      ></Image>
      <p
        className={clsx("text-12-semibold capitalize", {
          "text-blue-500": status === "pending",
          "text-green-500": status === "scheduled",
          "text-red-500": status === "cancelled",
        })}
      >
        {status}
      </p>
    </div>
  );
};

export default StatusBadge;
