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
    Row,
    Column,
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
            <Preview>Registration Confirmed - Welcome to AgriLearn Nexus</Preview>
            <Body style={main}>
                {/* Outer Container for alignment */}
                <Container style={outerContainer}>
                    
                    {/* Logo Section - Placed OUTSIDE the card */}
                    <Section style={logoWrapper}>
                        <Img
                            src="https://cdn.agrilearnnexus.com/logo.jpeg"
                            width="100"
                            height="100"
                            alt="AgriLearn Nexus"
                            style={logoOval}
                        />
                    </Section>

                    {/* The Main Card Container */}
                    <Section style={cardContainer}>
                        
                        
                        <div style={topBar} />

                        {/* Content Wrapper */}
                        <Section style={innerContent}>
                            
                            <Heading style={h1}>Registration Successful</Heading>
                            
                            <Text style={welcomeText}>
                                Hello <strong>{fullName}</strong>,
                            </Text>
                            
                            <Text style={bodyText}>
                                We are delighted to confirm that we have received your registration and payment details. Your application has been securely logged and is currently being reviewed by our certification team.
                            </Text>

                            
                            <Section style={dataCard}>
                                <Row style={rowBorder}>
                                    <Column style={columnLeft}>
                                        <Text style={label}>Submission ID</Text>
                                    </Column>
                                    <Column style={columnRight}>
                                        <Text style={value}>{submissionId}</Text>
                                    </Column>
                                </Row>
                                <Row style={rowBorder}>
                                    <Column style={columnLeft}>
                                        <Text style={label}>Certificate</Text>
                                    </Column>
                                    <Column style={columnRight}>
                                        <Text style={value}>{certificateType}</Text>
                                    </Column>
                                </Row>
                                <Row>
                                    <Column style={columnLeft}>
                                        <Text style={label}>Current Status</Text>
                                    </Column>
                                    <Column style={columnRight}>
                                       
                                        <Section style={statusContainer}>
                                            <Text style={statusText}>Processing</Text>
                                        </Section>
                                    </Column>
                                </Row>
                            </Section>

                            <Text style={footerNote}>
                                You will receive a formal approval notification via email within 24-48 hours.
                            </Text>

                            <Hr style={hr} />

                            <Text style={footerLinks}>
                                © {new Date().getFullYear()} AgriLearn Nexus<br />
                                <Link href="#" style={link}>Dashboard</Link> • <Link href="#" style={link}>Support</Link>
                            </Text>
                        </Section>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

export default SubmissionSuccessEmail;

// --- STYLES ---

const main = {
    backgroundColor: "#F2F5F3", // Very soft sage grey
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    padding: "40px 0",
};

// New outer container to hold everything
const outerContainer = {
    margin: "0 auto",
    maxWidth: "540px",
};

// Wrapper for the logo, positioned above the card
const logoWrapper = {
    textAlign: "center" as const,
    position: "relative" as const,
    zIndex: 10,
    marginBottom: "-50px", // Pulls the card up
};

const logoOval = {
    borderRadius: "50%",
    border: "4px solid #ffffff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    objectFit: "cover" as const,
    display: "block",
    margin: "0 auto",
    backgroundColor: "#ffffff",
};

// The main white card
const cardContainer = {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.08)",
    overflow: "hidden",
    position: "relative" as const,
    zIndex: 5,
    paddingTop: "60px", // Space for logo overlap
};

const topBar = {
    position: "absolute" as const,
    top: "0",
    left: "0",
    right: "0",
    height: "8px",
    background: "linear-gradient(90deg, #064e3b 0%, #10b981 100%)",
};

const innerContent = {
    padding: "0 40px 40px 40px",
};

const h1 = {
    color: "#064e3b",
    fontSize: "26px",
    fontWeight: "700",
    textAlign: "center" as const,
    margin: "10px 0 20px",
    letterSpacing: "-0.5px",
};

const welcomeText = {
    color: "#1f2937",
    fontSize: "18px",
    textAlign: "center" as const,
    marginBottom: "10px",
};

const bodyText = {
    color: "#4b5563",
    fontSize: "15px",
    lineHeight: "24px",
    textAlign: "center" as const,
    marginBottom: "30px",
};

// Data Card Styling
const dataCard = {
    backgroundColor: "#fcfdfc",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "10px 20px",
    marginBottom: "30px",
};

const rowBorder = {
    borderBottom: "1px solid #f0f0f0",
};

const columnLeft = {
    width: "40%",
    padding: "12px 0",
};

const columnRight = {
    width: "60%",
    padding: "12px 0",
    textAlign: "right" as const,
};

const label = {
    color: "#6b7280",
    fontSize: "13px",
    fontWeight: "600",
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
    margin: "0",
};

const value = {
    color: "#111827",
    fontSize: "15px",
    fontWeight: "500",
    margin: "0",
};

// Status Badge
const statusContainer = {
    textAlign: "right" as const,
};

const statusText = {
    display: "inline-block",
    backgroundColor: "#fffbeb",
    color: "#b45309",
    fontSize: "12px",
    fontWeight: "700",
    padding: "6px 14px",
    borderRadius: "20px",
    textTransform: "uppercase" as const,
    border: "1px solid #fcd34d",
    letterSpacing: "0.5px",
};

const footerNote = {
    fontSize: "13px",
    color: "#6b7280",
    textAlign: "center" as const,
    fontStyle: "italic",
    marginBottom: "20px",
};

const hr = {
    borderColor: "#f3f4f6",
    margin: "20px 0",
};

const footerLinks = {
    fontSize: "12px",
    color: "#9ca3af",
    textAlign: "center" as const,
    lineHeight: "20px",
};

const link = {
    color: "#059669",
    textDecoration: "none",
    fontWeight: "500",
};