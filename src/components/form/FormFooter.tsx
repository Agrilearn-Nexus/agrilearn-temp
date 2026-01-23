"use client";

import React from "react";
import {useFormContext} from "react-hook-form";
import {FiRefreshCw, FiSend} from "react-icons/fi";

interface FormFooterProps {
    isDisabled?: boolean;
}

const FormFooter = ({isDisabled}: FormFooterProps) => {
    const {
        reset,
        formState: {isSubmitting},
    } = useFormContext();

    const shouldDisable = isDisabled || isSubmitting;

    return (
        <div className="w-full flex justify-center p-4 md:p-8">
            <div className="w-full bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8">
                <div className="flex flex-col-reverse md:flex-row gap-4">

                    {/* Clear Button */}
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="flex-1 py-4 px-6 rounded-lg border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                    >
                        <FiRefreshCw/> Clear Form
                    </button>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={shouldDisable}
                        className="flex-[2] py-4 px-6 rounded-lg bg-[#3F7A5A] text-white font-bold text-lg hover:bg-[#2E5E42] shadow-lg shadow-green-900/20 transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {shouldDisable ? (
                            "Processing..."
                        ) : (
                            <>
                                <FiSend/> Submit Registration
                            </>
                        )}
                    </button>

                </div>

                <p className="text-center text-xs text-gray-400 mt-6 max-w-2xl mx-auto leading-relaxed">
                    Never submit passwords through this form. This form is for conference
                    registration purposes only.
                </p>
            </div>
        </div>
    );
};

export default FormFooter;