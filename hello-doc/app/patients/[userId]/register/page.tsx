import React from "react";
import Image from "next/image";
import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import { SearchParamProps } from "@/types/index.t";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            className="mb-12 h-10 w-fit"
            alt="home-img"
          ></Image>
          {<RegisterForm user={user} />}
          <div className="text-14-regular mt-20 justify-between flex">
            <p className="copyright py-12">
              © 2021 HelloDoc. All rights reserved.
            </p>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        className="side-img max-w-[390px]"
        alt="home-img"
      ></Image>
    </div>
  );
};

export default Register;
