const TermsContent = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-8xl mx-auto bg-white rounded-3xl p-8 md:p-16 shadow-sm border border-gray-100">
          
          {/* Header Info */}
          <div className="mb-10 pb-6 border-b border-gray-100 flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-sm font-bold text-[#E8BA30] uppercase tracking-wide mb-1">
                Effective Date
              </p>
              <p className="text-gray-500">February 05, 2026</p>
            </div>
            <div className="bg-[#0a2f1c]/5 px-4 py-2 rounded-lg border border-[#0a2f1c]/10">
              <p className="text-xs text-[#0a2f1c] font-semibold">
                AgriLearn Nexus Terms v1.2
              </p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="lead text-xl text-gray-700 font-medium mb-8 leading-relaxed">
              Welcome to AgriLearn Nexus. By accessing our website, registering for events, or utilizing our educational resources, you signify your agreement to be legally bound by these Terms of Service. If you do not agree, please discontinue use of our services immediately.
            </p>

            <TermsSection title="1. Acceptance of Terms">
              <p>
                These Terms constitute a legally binding agreement between you ("User", "Student", or "Visitor") and AgriLearn Nexus ("we", "us", or "our"). By using our platform, you confirm that you are of legal age to form a binding contract or have obtained parental consent.
              </p>
            </TermsSection>

            <TermsSection title="2. Educational Services & Usage">
              <p>
                AgriLearn Nexus provides specialized agricultural training, workshops, and digital content. 
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-[#E8BA30]">
                <li>You agree to use our services solely for lawful educational and professional development purposes.</li>
                <li>You must not use the platform to distribute spam, malware, or illegal content.</li>
                <li>We reserve the right to modify or discontinue any course or service at our discretion without prior notice.</li>
              </ul>
            </TermsSection>

            <TermsSection title="3. User Accounts & Security">
              <p>
                To access certain features, you may be required to create an account. You are responsible for maintaining the confidentiality of your login credentials. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate.
              </p>
            </TermsSection>

            <TermsSection title="4. Intellectual Property Rights">
              <p>
                All content provided on AgriLearn Nexus, including but not limited to course materials, videos, text, graphics, logos, and code, is the exclusive property of AgriLearn Nexus or its content creators.
              </p>
              <p className="mt-4 bg-[#0a2f1c]/5 p-4 rounded-lg border-l-4 border-[#0a2f1c] text-sm">
                <strong>Restriction:</strong> You may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit any content without our express written permission.
              </p>
            </TermsSection>

            <TermsSection title="5. Payments & Refunds">
              <p>
                Certain programs require payment of fees. All fees are stated in Indian Rupees (INR) unless otherwise noted.
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-[#E8BA30]">
                <li>Payments are non-transferable unless explicitly approved by administration.</li>
                <li>Refund requests are subject to our specific Refund Policy available on the registration page of each event.</li>
              </ul>
            </TermsSection>

            <TermsSection title="6. Termination of Access">
              <p>
                We reserve the right to suspend or terminate your account and refuse any current or future use of the Service if we suspect that you have violated these Terms, engaged in fraudulent activity, or abused the platform in any way.
              </p>
            </TermsSection>

            <TermsSection title="7. Limitation of Liability">
              <p>
                Our educational content is provided on an "as is" basis. While we strive for accuracy, AgriLearn Nexus makes no warranties regarding the specific results that may be obtained from the use of our training programs. We shall not be liable for any indirect, incidental, or consequential damages.
              </p>
            </TermsSection>

            <TermsSection title="8. Governing Law">
              <p>
                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in New Delhi, India.
              </p>
            </TermsSection>

            <TermsSection title="9. Updates to Terms">
              <p>
                We may update these Terms of Service from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Continued use of the platform after any such changes constitutes your acceptance of the new Terms.
              </p>
            </TermsSection>

            <div className="mt-12 pt-8 border-t border-gray-100">
              <h4 className="text-lg font-bold text-[#0a2f1c] mb-2">Questions?</h4>
              <p>
                If you have any questions about these Terms, please contact us at <a href="mailto:support@agrilearnnexus.com" className="text-[#E8BA30] font-semibold hover:underline">support@agrilearnnexus.com</a>.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

// Helper Component for consistent styling
const TermsSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="mb-12 group">
    <h3 className="text-2xl font-serif font-bold text-[#0a2f1c] mb-4 group-hover:text-[#E8BA30] transition-colors duration-300">
      {title}
    </h3>
    <div className="leading-relaxed border-l-2 border-transparent group-hover:border-[#E8BA30]/30 pl-0 group-hover:pl-4 transition-all duration-300">
      {children}
    </div>
  </div>
);

export default TermsContent;