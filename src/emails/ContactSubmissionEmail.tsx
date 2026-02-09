import {
    Body, Container, Head, Heading, Hr, Html, Preview, Section, Text,
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
                                                   name, email, phone, role, subject, message
                                               }: ContactEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>New Contact Form Submission from {name}</Preview>
            <Body style={{ backgroundColor: "#f6f9fc", fontFamily: "sans-serif" }}>
                <Container style={{ backgroundColor: "#ffffff", padding: "40px", borderRadius: "8px" }}>
                    <Heading style={{ color: "#0a2f1c" }}>New Contact Request</Heading>
                    <Text><strong>From:</strong> {name} ({role})</Text>
                    <Text><strong>Email:</strong> {email}</Text>
                    <Text><strong>Phone:</strong> {phone}</Text>
                    <Hr />
                    <Heading as="h3" style={{ fontSize: "18px" }}>{subject}</Heading>
                    <Section style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "4px" }}>
                        <Text>{message}</Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}