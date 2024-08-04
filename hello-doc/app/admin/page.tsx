import Link from "next/link";
import Image from "next/image";
import StatCard from "../../components/StatCard";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { DataTable } from "@/components/table/DataTable";
import { Columns } from "@/components/table/Columns";

const Admin = async () => {
  const appointments = await getRecentAppointmentList();
  console.log(appointments);
  return (
    <div className="mx-auto flex-max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link className="cursor-pointer" href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            className="h-8 w-fit"
            alt="logo"
          ></Image>
        </Link>
        <p className="text-16-semibold">Admin Dashboard</p>
      </header>
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcom to the admin panel</h1>
          <p className="text-dark-700 ml-1">Manage appointments</p>
        </section>
        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Schedul appointments"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Pendig appointments"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="Cancled appointments"
            icon="/assets/icons/cancelled.svg"
          />
        </section>
        <DataTable columns={Columns} data={appointments.documents} />
      </main>
    </div>
  );
};

export default Admin;
