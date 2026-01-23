import * as React from "react";
import {
    Html,
    Head,
    Body,
    Container,
    Section,
    Text,
    Heading,
    Link,
    Hr,
    Preview,
    Img,
} from "@react-email/components";

interface SubmissionSuccessEmailProps {
    fullName: string;
    submissionId: string;
    certificateType: string;
}

export const SubmissionSuccessEmail = ({
                                           fullName,
                                           submissionId,
                                           certificateType,
                                       }: SubmissionSuccessEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>Registration Confirmed - AgriLearn Nexus</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* Logo Section */}
                    <Section style={{ paddingBottom: "20px" }}>
                        <Heading style={h1}>AgriLearn Nexus</Heading>
                    </Section>

                    <Heading style={h2}>Registration Successful! 🌱</Heading>

                    <Text style={text}>Hi {fullName},</Text>

                    <Text style={text}>
                        Thank you for registering. We have received your payment and details.
                        Your application is now under review by our team.
                    </Text>

                    <Section style={infoBox}>
                        <Text style={infoText}>
                            <strong>Submission ID:</strong> {submissionId}
                        </Text>
                        <Text style={infoText}>
                            <strong>Certificate:</strong> {certificateType}
                        </Text>
                        <Text style={infoText}>
                            <strong>Status:</strong> Processing
                        </Text>
                    </Section>

                    <Text style={text}>
                        You will receive another email once your registration is formally approved.
                    </Text>

                    <Hr style={hr} />

                    <Text style={footer}>
                        © {new Date().getFullYear()} AgriLearn Nexus. All rights reserved.<br />
                        Need help? <Link href="mailto:support@agrilearnnexus.com">Contact Support</Link>
                    </Text>
                </Container>
            </Body>
        </Html>
    );
};

export default SubmissionSuccessEmail;

// --- Styles ---
const main = {
    backgroundColor: "#f6f9f6",
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px 0 48px",
    marginBottom: "64px",
    maxWidth: "580px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};

const h1 = {
    color: "#166534", // Green-800
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center" as const,
    margin: "30px 0",
};

const h2 = {
    color: "#166534",
    fontSize: "20px",
    fontWeight: "600",
    textAlign: "center" as const,
};

const text = {
    color: "#333",
    fontSize: "16px",
    lineHeight: "24px",
    padding: "0 40px",
};

const infoBox = {
    backgroundColor: "#f0fdf4", // Green-50
    borderRadius: "8px",
    padding: "20px",
    margin: "20px 40px",
    border: "1px solid #bbf7d0",
};

const infoText = {
    margin: "4px 0",
    fontSize: "14px",
    color: "#15803d",
};

const hr = {
    borderColor: "#e6ebf1",
    margin: "20px 0",
};

const footer = {
    color: "#8898aa",
    fontSize: "12px",
    lineHeight: "16px",
    textAlign: "center" as const,
};