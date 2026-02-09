export const CONTACT_ROLES = [
    "STUDENT",
    "FARMER",
    "PROFESSOR",
    "ORGANIZATION",
    "OTHER",
] as const;

export type ContactRole = typeof CONTACT_ROLES[number];
