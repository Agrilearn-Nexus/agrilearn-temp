"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

import FormHeader from "@/components/form/FormHeader";
import PersonalDetails from "@/components/form/PersonalDetails";
import PaymentDetails from "@/components/form/PaymentDetails";
import WhatsappConfirmation from "@/components/form/WhatsappConfirmation";
import FormFooter from "@/components/form/FormFooter";
import ReferenceDetails from "@/components/form/ReferenceDetails";
import FormHero from "@/components/form/FormHero";

import { registerSchema, RegisterFormData } from "@/lib/schemas/register";

const RegisterPage = () => {
    const router = useRouter(); // ✅ hook at top-level
    const [isSubmitting, setIsSubmitting] = useState(false);

    const methods = useForm<RegisterFormData>({
        mode: "onChange",
        resolver: zodResolver(registerSchema),
        shouldFocusError: true,
    });

    const onSubmit = async (data: RegisterFormData) => {
        if (isSubmitting) return; // ✅ double-submit protection

        setIsSubmitting(true);
        const toastId = toast.loading("Submitting registration...");

        try {
            const formData = new FormData();

            for (const key in data) {
                if (key === "paymentReceipt") continue;

                const value = data[key as keyof RegisterFormData];
                if (value !== undefined && value !== null) {
                    formData.append(key, String(value));
                }
            }

            if (data.paymentReceipt?.[0]) {
                formData.append("receipt", data.paymentReceipt[0]);
            }

            const response = await axios.post("/api/submit", formData); // ✅ no manual headers

            if (response?.data?.success) {
                toast.success("Registration successful!", { id: toastId });
                methods.reset();
                router.push("/");
            } else {
                throw new Error(response?.data?.message || "Submission failed");
            }

        } catch (error: any) {
            console.error("Submission Error:", error);
            toast.error(
                error?.response?.data?.message || error?.message || "Failed to submit form",
                { id: toastId }
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const onError = () => {
        toast.error("Please fix the errors in the form");
    };

    return (
        <>
            <Toaster position="top-right" />

            {/* Hero Section */}
            <div className="relative w-full min-h-screen flex flex-col">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/formHeaderHero.png"
                        alt="Agriculture Field"
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>

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
                        onSubmit={methods.handleSubmit(onSubmit, onError)}
                        className="w-full"
                        noValidate
                    >
                        <FormHeader />

                        <PersonalDetails />
                        <PaymentDetails />
                        <ReferenceDetails />
                        <WhatsappConfirmation />

                        <FormFooter isDisabled={isSubmitting} />
                    </form>
                </FormProvider>
            </div>
        </>
    );
};

export default RegisterPage;
