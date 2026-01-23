"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import Image from "next/image";

import FormHeader from "@/components/form/FormHeader";
import PersonalDetails from "@/components/form/PersonalDetails";
import PaymentDetails from "@/components/form/PaymentDetails";
import WhatsappConfirmation from "@/components/form/WhatsappConfirmation";
import FormFooter from "@/components/form/FormFooter";
import ReferenceDetails from "@/components/form/ReferenceDetails";
import FormHero from "@/components/form/FormHero";


type FormDataType = {
    fullName: string;
    paymentReceipt: FileList;
};

const RegisterPage = () => {
    const methods = useForm<FormDataType>({
        mode: "onChange",
    });

    const onSubmit = (data: FormDataType) => {
        console.log("Form Submitted:", data);

        const formData = new FormData();
        formData.append("fullName", data.fullName);

        if (data.paymentReceipt?.[0]) {
            formData.append("receipt", data.paymentReceipt[0]);
        }

        // API call can go here
    };

    return (
        <>
            {/* Hero Section */}
            <div className="relative w-full min-h-screen flex flex-col">
                {/* Background */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={`/formHeaderHero.png`}
                        alt="Agriculture Field"
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col min-h-screen">

                    <div className="grow flex items-center justify-center py-12 md:py-0 px-4">
                        <FormHero />
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div id="registerNow" className="bg-[#F4F3EF] w-full">
                <FormProvider {...methods}>
                    <form
                        onSubmit={methods.handleSubmit(onSubmit)}
                        className="w-full"
                    >
                        <FormHeader />
                        <PersonalDetails />
                        <PaymentDetails />
                        <ReferenceDetails />
                        <WhatsappConfirmation />
                        <FormFooter />
                    </form>
                </FormProvider>
            </div>
        </>
    );
};

export default RegisterPage;
