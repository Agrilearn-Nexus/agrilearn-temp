const PrivacyContent = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-8xl mx-auto bg-white rounded-3xl p-8 md:p-16 shadow-sm border border-gray-100">
          
          {/* Last Updated Date */}
          <div className="mb-10 pb-6 border-b border-gray-100 flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-sm font-bold text-[#E8BA30] uppercase tracking-wide mb-1">
                Effective Date
              </p>
              <p className="text-gray-500">March 01, 2026</p>
            </div>
            <div className="bg-[#0a2f1c]/5 px-4 py-2 rounded-lg border border-[#0a2f1c]/10">
              <p className="text-xs text-[#0a2f1c] font-semibold">
                AgriLearn Nexus Policy v2.0
              </p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="lead text-xl text-gray-700 font-medium mb-8 leading-relaxed">
              Welcome to AgriLearn Nexus. We value your trust and are dedicated to protecting your personal data. This policy explains how we gather, utilize, and safeguard your information when you engage with our educational platform.
            </p>

            <PolicySection title="1. Data We Gather">
              <p>
                To provide you with a seamless learning experience, we may collect specific personal details. This includes, but is not limited to, your full name, email address, contact number, and academic or professional background when you enroll in a program, subscribe to updates, or reach out to our support team.
              </p>
            </PolicySection>

            <PolicySection title="2. Cookies and Tracking Technologies">
              <p>
                Our website utilizes "cookies" and similar tracking technologies to enhance your browsing experience. Cookies are small text files stored on your device that help us:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-[#E8BA30]">
                <li><strong>Remember Preferences:</strong> Save your login details and language settings for future visits.</li>
                <li><strong>Analyze Traffic:</strong> Understand how users interact with our site so we can improve content and layout.</li>
                <li><strong>Personalize Content:</strong> Show you courses and events relevant to your interests.</li>
              </ul>
              <p className="mt-4">
                You can choose to accept or decline cookies through your browser settings. However, disabling cookies may limit your ability to use certain features of our platform.
              </p>
            </PolicySection>

            <PolicySection title="3. Purpose of Data Usage">
              <p>
                We utilize the information we collect to:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-[#E8BA30]">
                <li>Facilitate your registration for faculty development programs and workshops.</li>
                <li>Send crucial updates regarding schedules, certifications, and course materials.</li>
                <li>Optimize our website's performance and personalize your user journey.</li>
                <li>Distribute our educational newsletter (only with your explicit consent).</li>
              </ul>
            </PolicySection>

            <PolicySection title="4. Security Measures">
              <p>
                Safeguarding your data is our top priority. We employ advanced encryption protocols and secure server infrastructure to prevent unauthorized access, data leaks, or misuse of your personal information.
              </p>
            </PolicySection>

            <PolicySection title="5. Third-Party Disclosure">
              <p>
                AgriLearn Nexus does not sell or trade your private information. We may share anonymized, aggregated demographic data with trusted partners for analytical purposes. In cases where third-party services (like payment gateways) are used, they are strictly bound by confidentiality agreements.
              </p>
            </PolicySection>

            <PolicySection title="6. User Rights & Control">
              <p>
                You retain full rights over your data. You may request to view, edit, or delete your personal information from our records at any time. If you wish to opt-out of marketing communications, you can do so via the unsubscribe link in our emails or by contacting us directly.
              </p>
            </PolicySection>

            <PolicySection title="7. Get in Touch">
              <p>
                If you have concerns regarding this policy or our data practices, please contact our Data Protection Officer at <a href="mailto:support@agrilearnnexus.com" className="text-[#0a2f1c] font-bold hover:text-[#E8BA30] transition-colors underline decoration-[#E8BA30]/30">support@agrilearnnexus.com</a> or via our contact page.
              </p>
            </PolicySection>

          </div>
        </div>
      </div>
    </section>
  );
};

// Helper Component for consistent section styling
const PolicySection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="mb-12 group">
    <h3 className="text-2xl font-serif font-bold text-[#0a2f1c] mb-4 group-hover:text-[#E8BA30] transition-colors duration-300">
      {title}
    </h3>
    <div className="leading-relaxed border-l-2 border-transparent group-hover:border-[#E8BA30]/30 pl-0 group-hover:pl-4 transition-all duration-300">
      {children}
    </div>
  </div>
);

export default PrivacyContent;