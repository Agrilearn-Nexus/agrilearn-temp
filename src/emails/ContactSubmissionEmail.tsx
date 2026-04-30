import {
    Body,
    Column,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";

interface ContactEmailProps {
    name: string;
    email: string;
    phone: string;
    role: string;
    subject: string;
    message: string;
}

export default function ContactSubmissionEmail({
    name = "John Doe",
    email = "john@example.com",
    phone = "+91 9876543210",
    role = "Student",
    subject = "Course Inquiry",
    message = "Hello, I would like to know more about your certification programs.",
}: Partial<ContactEmailProps>) {

    const safeName = name || "User";

    const initials = safeName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <Html>
            <Head>
                <meta name="color-scheme" content="light" />
                <meta name="supported-color-schemes" content="light" />

                <style>{`
                    @media only screen and (max-width: 600px) {
                        .container   { padding: 0 8px !important; }
                        .card        { border-radius: 12px !important; }
                        .content     { padding: 24px 20px 32px !important; }

                        .col-left    {
                            display: block !important;
                            width: 100% !important;
                            padding: 8px 0 2px !important;
                        }

                        .col-right   {
                            display: block !important;
                            width: 100% !important;
                            padding: 0 0 8px !important;
                            text-align: left !important;
                        }

                        .heading     { font-size: 18px !important; }
                        .message-box { padding: 16px !important; }
                    }

                    @media (prefers-color-scheme: dark) {
                        .footer-note {
                            color: #6b7280 !important;
                            opacity: 0.5 !important;
                        }
                    }
                `}</style>
            </Head>

            <Preview>
                New Contact Request from {safeName} — {subject}
            </Preview>

            <Body style={main}>
                <Container style={outerContainer} className="container">

                    {/* Header */}
                    <Section style={header}>
                        <Img
                            src="https://cdn.agrilearnnexus.com/logo.jpeg"
                            width="36"
                            height="36"
                            alt="AgriLearn Nexus"
                            style={headerLogo}
                        />

                        <Text style={headerBrand}>
                            AgriLearn Nexus
                        </Text>
                    </Section>

                    {/* Main Card */}
                    <Section style={card} className="card">

                        {/* Top Bar */}
                        <Section style={topBar}>
                            &nbsp;
                        </Section>

                        <Section style={content} className="content">

                            {/* Badge */}
                            <Section style={badgeRow}>
                                <Text style={badge}>
                                    📬 Incoming Message
                                </Text>
                            </Section>

                            {/* Heading */}
                            <Heading style={heading} className="heading">
                                New Contact Request
                            </Heading>

                            <Text style={subheading}>
                                Someone submitted the contact form on your website.
                            </Text>

                            <Hr style={divider} />

                            {/* Sender Card */}
                            <Section style={senderCard}>

                                {/* Avatar */}
                                <Row style={{ marginBottom: "16px" }}>
                                    <Column
                                        style={{
                                            width: "56px",
                                            verticalAlign: "middle",
                                        }}
                                    >
                                        <Section style={avatar}>
                                            <Text style={avatarText}>
                                                {initials}
                                            </Text>
                                        </Section>
                                    </Column>

                                    <Column
                                        style={{
                                            verticalAlign: "middle",
                                            paddingLeft: "12px",
                                        }}
                                    >
                                        <Text style={senderName}>
                                            {safeName}
                                        </Text>

                                        <Text style={senderRole}>
                                            {role}
                                        </Text>
                                    </Column>
                                </Row>

                                {/* Email */}
                                <Row style={detailRow}>
                                    <Column style={colLeft} className="col-left">
                                        <Text style={metaLabel}>
                                            Email
                                        </Text>
                                    </Column>

                                    <Column style={colRight} className="col-right">
                                        <Link
                                            href={`mailto:${email}`}
                                            style={emailLink}
                                        >
                                            {email}
                                        </Link>
                                    </Column>
                                </Row>

                                {/* Phone */}
                                <Row>
                                    <Column style={colLeft} className="col-left">
                                        <Text style={metaLabel}>
                                            Phone
                                        </Text>
                                    </Column>

                                    <Column style={colRight} className="col-right">
                                        <Link
                                            href={`tel:${phone}`}
                                            style={phoneLink}
                                        >
                                            {phone}
                                        </Link>
                                    </Column>
                                </Row>
                            </Section>

                            {/* Subject */}
                            <Section style={subjectBlock}>
                                <Text style={subjectLabel}>
                                    Subject
                                </Text>

                                <Text style={subjectText}>
                                    {subject}
                                </Text>
                            </Section>

                            {/* Message */}
                            <Section
                                style={messageBlock}
                                className="message-box"
                            >
                                <Text style={messageLabel}>
                                    Message
                                </Text>

                                <Text style={messageText}>
                                    {message}
                                </Text>
                            </Section>

                            {/* CTA */}
                            <Section style={ctaSection}>
                                <Link
                                    href={`mailto:${email}?subject=Re: ${subject}`}
                                    style={ctaButton}
                                >
                                    Reply to {safeName.split(" ")[0]} →
                                </Link>
                            </Section>

                            <Hr style={divider} />

                            {/* Footer */}
                            <Text style={footerText} className="footer-note">
                                This message was submitted via the AgriLearn Nexus
                                contact form. Do not reply to this automated email —
                                use the button above.
                            </Text>

                            <Text style={footerLinks}>
                                <Link
                                    href="https://agrilearnnexus.com"
                                    style={footerLink}
                                >
                                    Website
                                </Link>

                                {" · "}

                                <Link
                                    href="https://agrilearnnexus.com/dashboard"
                                    style={footerLink}
                                >
                                    Dashboard
                                </Link>

                                {" · "}

                                <Link
                                    href="https://agrilearnnexus.com/contact"
                                    style={footerLink}
                                >
                                    Support
                                </Link>
                            </Text>

                            <Text style={copyright}>
                                © {new Date().getFullYear()} AgriLearn Nexus ·
                                All rights reserved
                            </Text>
                        </Section>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}

// ─────────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────────

const main = {
    backgroundColor: "#eef2ef",
    fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    padding: "32px 0",
    margin: "0",
    width: "100%",
};

const outerContainer = {
    margin: "0 auto",
    maxWidth: "560px",
    width: "100%",
    padding: "0 16px",
};

const header = {
    textAlign: "center" as const,
    marginBottom: "16px",
};

const headerLogo = {
    borderRadius: "50%",
    border: "2px solid #d1fae5",
    display: "inline-block",
    verticalAlign: "middle",
    objectFit: "cover" as const,
};

const headerBrand = {
    display: "inline-block",
    verticalAlign: "middle",
    color: "#064e3b",
    fontSize: "15px",
    fontWeight: "700",
    margin: "8px 0 0",
    letterSpacing: "0.2px",
};

const card = {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.07)",
    overflow: "hidden",
    width: "100%",
};

const topBar = {
    height: "5px",
    background:
        "linear-gradient(90deg, #064e3b 0%, #10b981 60%, #34d399 100%)",
    fontSize: "0",
    lineHeight: "0",
    padding: "0",
    margin: "0",
};

const content = {
    padding: "32px 40px 40px",
};

const badgeRow = {
    marginBottom: "10px",
};

const badge = {
    display: "inline-block",
    backgroundColor: "#ecfdf5",
    color: "#065f46",
    fontSize: "11px",
    fontWeight: "700",
    padding: "5px 12px",
    borderRadius: "20px",
    border: "1px solid #a7f3d0",
    letterSpacing: "0.5px",
    textTransform: "uppercase" as const,
    margin: "0",
};

const heading = {
    color: "#064e3b",
    fontSize: "22px",
    fontWeight: "700",
    margin: "0 0 6px",
    letterSpacing: "-0.3px",
};

const subheading = {
    color: "#9ca3af",
    fontSize: "13px",
    margin: "0 0 20px",
    lineHeight: "20px",
};

const divider = {
    borderColor: "#f3f4f6",
    margin: "20px 0",
};

const senderCard = {
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "16px 20px",
    marginBottom: "16px",
};

const avatar = {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    backgroundColor: "#064e3b",
    textAlign: "center" as const,
};

const avatarText = {
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "700",
    textAlign: "center" as const,
    lineHeight: "44px",
    margin: "0",
};

const senderName = {
    color: "#111827",
    fontSize: "15px",
    fontWeight: "700",
    margin: "0 0 2px",
};

const senderRole = {
    color: "#6b7280",
    fontSize: "12px",
    margin: "0",
    textTransform: "capitalize" as const,
};

const detailRow = {
    borderTop: "1px solid #f0f0f0",
    paddingTop: "4px",
    marginTop: "4px",
};

const colLeft = {
    width: "30%",
    minWidth: "70px",
    padding: "8px 0",
    verticalAlign: "middle" as const,
};

const colRight = {
    width: "70%",
    padding: "8px 0",
    textAlign: "right" as const,
    verticalAlign: "middle" as const,
};

const metaLabel = {
    color: "#9ca3af",
    fontSize: "11px",
    fontWeight: "700",
    textTransform: "uppercase" as const,
    letterSpacing: "0.8px",
    margin: "0",
};

const emailLink = {
    color: "#059669",
    fontSize: "13px",
    fontWeight: "500",
    textDecoration: "none",
};

const phoneLink = {
    color: "#111827",
    fontSize: "13px",
    fontWeight: "500",
    textDecoration: "none",
};

const subjectBlock = {
    backgroundColor: "#f0fdf4",
    border: "1px solid #bbf7d0",
    borderRadius: "8px",
    padding: "12px 16px",
    marginBottom: "16px",
};

const subjectLabel = {
    color: "#065f46",
    fontSize: "10px",
    fontWeight: "700",
    textTransform: "uppercase" as const,
    letterSpacing: "0.8px",
    margin: "0 0 4px",
};

const subjectText = {
    color: "#064e3b",
    fontSize: "15px",
    fontWeight: "600",
    margin: "0",
    lineHeight: "22px",
};

const messageBlock = {
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderLeft: "3px solid #10b981",
    borderRadius: "8px",
    padding: "16px 20px",
    marginBottom: "28px",
};

const messageLabel = {
    color: "#9ca3af",
    fontSize: "10px",
    fontWeight: "700",
    textTransform: "uppercase" as const,
    letterSpacing: "0.8px",
    margin: "0 0 8px",
};

const messageText = {
    color: "#374151",
    fontSize: "14px",
    lineHeight: "24px",
    margin: "0",
};

const ctaSection = {
    textAlign: "center" as const,
    marginBottom: "24px",
};

const ctaButton = {
    display: "inline-block",
    backgroundColor: "#064e3b",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "600",
    padding: "13px 32px",
    borderRadius: "8px",
    textDecoration: "none",
    letterSpacing: "0.2px",
};

const footerText = {
    fontSize: "12px",
    color: "#d1d5db",
    textAlign: "center" as const,
    fontStyle: "italic",
    margin: "0 0 10px",
    lineHeight: "18px",
};

const footerLinks = {
    fontSize: "12px",
    color: "#9ca3af",
    textAlign: "center" as const,
    lineHeight: "22px",
    margin: "0 0 6px",
};

const footerLink = {
    color: "#059669",
    textDecoration: "none",
    fontWeight: "500",
};

const copyright = {
    fontSize: "11px",
    color: "#d1d5db",
    textAlign: "center" as const,
    margin: "0",
};