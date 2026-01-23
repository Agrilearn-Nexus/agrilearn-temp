export type SubmissionEvent = {
    name: "submission.created"
    data: {
        submissionData: any
        paymentData: {
            upiId: string
            paymentDate: string
        }
        fileBase64: string
        mime: string
    }
}
