import Image from "next/image";
import PatientForm from "../components/forms/PatientForm";
import Link from "next/link";
import { SearchParamProps } from "@/types/index.t";
import PassKeyModal from "@/components/PassKeyModal";
export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams?.admin == "true";
  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PassKeyModal/>}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[469]">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            className="mb-12 h-10 w-fit"
            alt="home-img"
          ></Image>
          <PatientForm />
          <div className="text-14-regular mt-20 justify-between flex">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2021 HelloDoc. All rights reserved.
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        className="side-img max-w-[50%]"
        alt="home-img"
      ></Image>
    </div>
  );
}
