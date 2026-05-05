export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  subject: string;
  message: string;
  date: string;
  status: 'read' | 'unread';
}

export const INITIAL_MESSAGES: ContactMessage[] = [
  { id: '1', name: 'Dr. Priya Sharma', email: 'priya.sharma@university.edu', phone: '+91 98765 43210', role: 'Professor', subject: 'Collaboration on Smart Farming Research', message: 'I am interested in collaborating on the upcoming Smart Farming Technologies Workshop. Our department has been working on IoT-based soil monitoring systems and we would love to present our findings.', date: '2026-02-07', status: 'unread' },
  { id: '2', name: 'Rajesh Kumar', email: 'rajesh.farmer@gmail.com', phone: '+91 87654 32109', role: 'Farmer', subject: 'Registration Query for Agriculture Summit', message: 'I am a progressive farmer from Punjab and would like to attend the National Agricultural Innovation Summit. Is there any concession for farmers?', date: '2026-02-06', status: 'unread' },
  { id: '3', name: 'Anita Desai', email: 'anita.d@research.org', phone: '+91 76543 21098', role: 'PhD Scholar', subject: 'Abstract Submission for Research Symposium', message: 'I would like to submit my abstract for the PhD Research Symposium. My research is on drought-resistant wheat varieties.', date: '2026-02-05', status: 'read' },
];