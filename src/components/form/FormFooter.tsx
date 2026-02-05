"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FiRefreshCw, FiSend, FiAlertTriangle } from "react-icons/fi";

interface FormFooterProps {
    isDisabled?: boolean;
}

const FormFooter = ({ isDisabled }: FormFooterProps) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const {
        reset,
        formState: { isSubmitting },
    } = useFormContext();

    const shouldDisable = isDisabled || isSubmitting;

    const handleClearConfirm = () => {
        reset();
        setShowConfirm(false);
    };

    return (
        <>
            <div className="w-full flex justify-center p-4 md:p-8">
                <div className="w-full bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8">
                    <div className="flex flex-col-reverse md:flex-row gap-4">

                        {/* Clear Button - Now opens the confirmation popup */}
                        <button
                            type="button"
                            onClick={() => setShowConfirm(true)}
                            className="flex-1 py-4 px-6 rounded-lg border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                        >
                            <FiRefreshCw /> Clear Form
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
                                    <FiSend /> Submit Registration
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

            {/* Confirmation Popup Modal */}
            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all animate-in fade-in zoom-in duration-200">
                        <div className="p-6 text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 mb-4">
                                <FiAlertTriangle className="h-6 w-6 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Clear Form?</h3>
                            <p className="text-gray-500 mb-6 text-sm">
                                Do you really want to clear the form? All your entered data will be lost.
                            </p>
                            <div className="flex gap-3 justify-center">
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(false)}
                                    className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleClearConfirm}
                                    className="px-5 py-2.5 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 shadow-md transition-colors text-sm"
                                >
                                    Yes, Clear Form
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FormFooter;