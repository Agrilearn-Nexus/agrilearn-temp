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
  programName: string;
}

export const SubmissionSuccessEmail = ({
  fullName = "Applicant",
  submissionId = "N/A",
  certificateType = "Not Specified",
  programName = "Program Not Available",
}: SubmissionSuccessEmailProps) => {
  return (
    <Html>
      <Head>
        <style>{`
                    @media only screen and (max-width: 600px) {
                        .outer-container { width: 100% !important; padding: 16px 8px !important; }
                        .card { border-radius: 12px !important; }
                        .inner-content { padding: 24px 20px 32px !important; }
                        .logo-section { padding: 24px 16px 16px !important; }
                        .h1 { font-size: 20px !important; }
                        .body-text { font-size: 13px !important; }
                        .welcome-text { font-size: 15px !important; }
                        .data-card { padding: 4px 12px !important; }

                        
                        .col-left  { display: block !important; width: 100% !important; padding: 10px 0 2px !important; }
                        .col-right { display: block !important; width: 100% !important; padding: 0 0 10px !important; text-align: left !important; }
                        .mono-value { font-size: 13px !important; }
                        .status-badge { font-size: 11px !important; }

                        .cta-button { display: block !important; text-align: center !important; padding: 14px 20px !important; font-size: 14px !important; }
                        .outer-footer { padding: 0 16px !important; }
                    }
                `}</style>
      </Head>
      <Preview>Registration Confirmed – Welcome to AgriLearn Nexus</Preview>
      <Body style={main}>
        <Container style={outerContainer} className="outer-container">
          {/* ── Main Card ── */}
          <Section style={cardContainer} className="card">
            {/* Top gradient bar */}
            <div style={topBar} />

            {/* ── Logo block ── */}
            <Section style={logoSection} className="logo-section">
              <Img
                src="https://cdn.agrilearnnexus.com/logo.jpeg"
                width="80"
                height="80"
                alt="AgriLearn Nexus"
                style={logoStyle}
              />
              <Text style={brandName}>AgriLearn Nexus</Text>
            </Section>

            <Hr style={logoDivider} />

            {/* ── Content ── */}
            <Section style={innerContent} className="inner-content">
              {/* Success icon */}
              <Section style={iconWrapper}>
                <Text style={checkIcon}>✓</Text>
              </Section>

              <Heading style={h1} className="h1">
                Registration Successful
              </Heading>

              <Text style={welcomeText} className="welcome-text">
                Hello <strong>{fullName}</strong>,
              </Text>

              <Text style={bodyText} className="body-text">
                We are delighted to confirm that your registration and payment
                details have been received. Your application is securely logged
                and is currently being reviewed by our certification team.
              </Text>

              {/* ── Data Card ── */}
              <Section style={dataCard} className="data-card">
                {/* Row 1 – Submission ID */}
                <Row style={rowBorder}>
                  <Column style={columnLeft} className="col-left">
                    <Text style={label}>Submission ID</Text>
                  </Column>
                  <Column style={columnRight} className="col-right">
                    <Text style={monoValue} className="mono-value">
                      {submissionId}
                    </Text>
                  </Column>
                </Row>

                {/* Row 2 – Program */}
                <Row style={rowBorder}>
                  <Column style={columnLeft} className="col-left">
                    <Text style={label}>Program</Text>
                  </Column>
                  <Column style={columnRight} className="col-right">
                    <Text style={value}>{programName}</Text>
                  </Column>
                </Row>

                {/* Row 3 – Certificate */}
                <Row style={rowBorder}>
                  <Column style={columnLeft} className="col-left">
                    <Text style={label}>Certificate</Text>
                  </Column>
                  <Column style={columnRight} className="col-right">
                    <Text style={value}>{certificateType}</Text>
                  </Column>
                </Row>

                {/* Row 4 – Status */}
                <Row>
                  <Column style={columnLeft} className="col-left">
                    <Text style={label}>Current Status</Text>
                  </Column>
                  <Column
                    style={{ ...columnRight, textAlign: "left" }}
                    className="col-right"
                  >
                    <Text style={statusBadge} className="status-badge">
                      ⏳ Processing
                    </Text>
                  </Column>
                </Row>
              </Section>

              {/* ── CTA Button ── */}
              <Section style={ctaSection}>
                <Link
                  href="https://agrilearnnexus.com/track"
                  style={ctaButton}
                  className="cta-button"
                >
                  Track Your Application →
                </Link>
              </Section>

              <Text style={footerNote}>
                A formal approval notification will be sent to your email within{" "}
                <strong>24–48 hours</strong>.
              </Text>

              <Hr style={hr} />

              <Text style={footerLinks}>
                © {new Date().getFullYear()} AgriLearn Nexus · All rights
                reserved
                <br />
                <Link href="https://agrilearnnexus.com" style={link}>
                  Website
                </Link>
                {" · "}
                <Link href="https://agrilearnnexus.com/track" style={link}>
                  Track Application
                </Link>
                {" · "}
                <Link href="https://agrilearnnexus.com/contact" style={link}>
                  Support
                </Link>
              </Text>
            </Section>
          </Section>

          <Text style={outerFooter} className="outer-footer">
            This is an automated message. Please do not reply directly to this
            email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default SubmissionSuccessEmail;

const main = {
  backgroundColor: "#eef2ef",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  padding: "40px 0",
  margin: "0",
  width: "100%",
};

const outerContainer = {
  margin: "0 auto",
  maxWidth: "560px",
  width: "100%",
  padding: "0 16px",
};

const cardContainer = {
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
  overflow: "hidden",
  width: "100%",
};

const topBar = {
  height: "6px",
  background: "linear-gradient(90deg, #064e3b 0%, #10b981 60%, #34d399 100%)",
};

const logoSection = {
  textAlign: "center" as const,
  padding: "28px 24px 16px",
  backgroundColor: "#f9fbf9",
};

const logoStyle = {
  borderRadius: "50%",
  border: "3px solid #d1fae5",
  display: "block",
  margin: "0 auto 10px",
  objectFit: "cover" as const,
  width: "80px",
  height: "80px",
};

const brandName = {
  color: "#064e3b",
  fontSize: "15px",
  fontWeight: "700",
  margin: "0",
  letterSpacing: "0.3px",
};

const logoDivider = {
  borderColor: "#e5e7eb",
  margin: "0",
};

const innerContent = {
  padding: "32px 40px 40px",
};

const iconWrapper = {
  textAlign: "center" as const,
  marginBottom: "12px",
};

const checkIcon = {
  display: "inline-block",
  width: "48px",
  height: "48px",
  lineHeight: "48px",
  backgroundColor: "#d1fae5",
  color: "#065f46",
  fontSize: "22px",
  fontWeight: "700",
  borderRadius: "50%",
  textAlign: "center" as const,
  margin: "0 auto",
};

const h1 = {
  color: "#064e3b",
  fontSize: "24px",
  fontWeight: "700",
  textAlign: "center" as const,
  margin: "0 0 14px",
  letterSpacing: "-0.3px",
};

const welcomeText = {
  color: "#1f2937",
  fontSize: "16px",
  textAlign: "center" as const,
  margin: "0 0 8px",
};

const bodyText = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "22px",
  textAlign: "center" as const,
  margin: "0 0 24px",
};

const dataCard = {
  backgroundColor: "#f9fafb",
  border: "1px solid #e5e7eb",
  borderRadius: "10px",
  padding: "4px 20px",
  marginBottom: "28px",
  width: "100%",
};

const rowBorder = {
  borderBottom: "1px solid #f0f0f0",
};

const columnLeft = {
  width: "45%",
  minWidth: "120px",
  padding: "12px 0",
  verticalAlign: "middle" as const,
};

const columnRight = {
  width: "55%",
  padding: "12px 0",
  textAlign: "right" as const,
  verticalAlign: "middle" as const,
};

const label = {
  color: "#9ca3af",
  fontSize: "11px",
  fontWeight: "700",
  textTransform: "uppercase" as const,
  letterSpacing: "0.8px",
  margin: "0",
  whiteSpace: "nowrap" as const,
};

const value = {
  color: "#111827",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0",
  wordBreak: "break-word" as const,
};

const monoValue = {
  color: "#064e3b",
  fontSize: "14px",
  fontWeight: "700",
  fontFamily: '"Courier New", Courier, monospace',
  margin: "0",
  wordBreak: "break-all" as const,
};

const statusBadge = {
  display: "inline-block",
  backgroundColor: "#fffbeb",
  color: "#92400e",
  fontSize: "11px",
  fontWeight: "700",
  padding: "5px 12px",
  borderRadius: "20px",
  border: "1px solid #fcd34d",
  letterSpacing: "0.5px",
  textTransform: "uppercase" as const,
  margin: "0",
  whiteSpace: "nowrap" as const,
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
  msoHide: "none",
};

const footerNote = {
  fontSize: "13px",
  color: "#d1d5db",
  textAlign: "center" as const,
  fontStyle: "italic",
  margin: "0 0 20px",
  lineHeight: "20px",
};

const hr = {
  borderColor: "#f3f4f6",
  margin: "20px 0",
};

const footerLinks = {
  fontSize: "12px",
  color: "#9ca3af",
  textAlign: "center" as const,
  lineHeight: "22px",
};

const link = {
  color: "#059669",
  textDecoration: "none",
  fontWeight: "500",
};

const outerFooter = {
  fontSize: "11px",
  color: "#9ca3af",
  textAlign: "center" as const,
  marginTop: "20px",
  padding: "0 16px",
};
