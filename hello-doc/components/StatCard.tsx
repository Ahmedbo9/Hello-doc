import React, { use } from "react";
import clsx from "clsx";
import Image from "next/image";

interface StatCardProps {
  count: number;
  label: string;
  icon: string;
  type: "pending" | "cancelled" | "appointments";
}

const StatCard = ({ count = 0, label, icon, type }: StatCardProps) => {



  return (
    <div
      className={clsx("stat-card", {
        "bg-appointments": type === "appointments",
        "bg-pending": type === "pending",
        "bg-cancelled": type === "cancelled",
      })}
    >
      <div className="flex item-center gap-4">
        <Image
          src={icon}
          height={32}
          width={32}
          className="h-8 w-fit"
          alt="logo"
        ></Image>
        <div>
          <h2 className="text-24-bold">{count}</h2>
          <p className="text-white">{label}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
