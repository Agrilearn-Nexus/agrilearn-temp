import {
    Body, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from "@react-email/components";
import * as React from "react";

interface AdminAlertEmailProps {
    source: string;
    errorMessage: string;
    errorStack?: string;
    submissionId?: string;
    time: string;
    metadata?: any;
}

export default function AdminAlertEmail({
                                            source, errorMessage, errorStack, submissionId, time, metadata
                                        }: AdminAlertEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>🚨 Critical Error in {source}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={h1}>System Alert: Critical Failure</Heading>
                    <Text style={text}>
                        A critical error occurred in the <strong>{source}</strong> worker.
                    </Text>

                    <Section style={box}>
                        <Text style={label}>Error Message:</Text>
                        <Text style={errorText}>{errorMessage}</Text>
                    </Section>

                    {submissionId && (
                        <Text style={text}>
                            <strong>Related Submission ID:</strong> {submissionId}
                        </Text>
                    )}

                    <Text style={text}><strong>Time:</strong> {time}</Text>

                    {errorStack && (
                        <>
                            <Hr style={hr} />
                            <Text style={label}>Stack Trace:</Text>
                            <pre style={codeBox}>{errorStack}</pre>
                        </>
                    )}

                    {metadata && (
                        <>
                            <Hr style={hr} />
                            <Text style={label}>Context Data:</Text>
                            <pre style={codeBox}>{JSON.stringify(metadata, null, 2)}</pre>
                        </>
                    )}
                </Container>
            </Body>
        </Html>
    );
}

// Styles
const main = { backgroundColor: "#f6f9fc", fontFamily: 'sans-serif' };
const container = { backgroundColor: "#ffffff", margin: "0 auto", padding: "20px 0 48px", marginBottom: "64px" };
const box = { padding: "24px", backgroundColor: "#ffebee", borderRadius: "5px", border: "1px solid #ffcdd2" };
const h1 = { color: "#b71c1c", fontSize: "24px", fontWeight: "bold", padding: "0 48px" };
const text = { color: "#525f7f", fontSize: "16px", lineHeight: "24px", textAlign: "left" as const, padding: "0 48px" };
const label = { color: "#333", fontWeight: "bold", fontSize: "14px", marginBottom: "8px" };
const errorText = { color: "#b71c1c", fontSize: "14px", fontFamily: "monospace" };
const codeBox = { backgroundColor: "#f4f4f4", padding: "16px", fontSize: "12px", borderRadius: "4px", overflowX: "auto" as const, margin: "0 48px" };
const hr = { borderColor: "#e6ebf1", margin: "20px 0" };