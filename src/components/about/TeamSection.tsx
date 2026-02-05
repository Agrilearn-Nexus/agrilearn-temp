import { Linkedin, Twitter, Mail } from "lucide-react";
import Image from "next/image";

const team = [
  { 
    name: "Madhav Kumar", 
    role: "Founder & Director", 
    bio: "Bsc in Agricultural Sciences with 2+ years of experience in sustainable farming research.",
    linkedin: "https://www.linkedin.com/",
    twitter: "https://twitter.com/",
    email: "mailto:madhav@agrilearnnexus.com"
  },
  { 
    name: "Satyam Kumar", 
    role: "C.E.O", 
    bio: "Visionary leader driving strategic partnerships and business growth to revolutionize agricultural education.",
    linkedin: "https://www.linkedin.com/",
    twitter: "https://twitter.com/",
    email: "mailto:satyam@agrilearnnexus.com"
  },
  { 
    name: "Aryan Kumar", 
    role: "C.T.O", 
    bio: "Tech innovator spearheading the development of cutting-edge digital platforms and scalable learning solutions.",
    linkedin: "https://www.linkedin.com/",
    twitter: "https://twitter.com/",
    email: "mailto:aryan@agrilearnnexus.com"
  },
];

const TeamSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest text-[#0a2f1c] bg-[#0a2f1c]/10 rounded-full mb-4">
            OUR EXPERTS
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0a2f1c] mb-4">
            Meet the Minds Behind the Mission
          </h2>
        </div>
        
        {/* Featured Team Image */}
        {/* <div className="relative mb-20 max-w-5xl mx-auto h-[400px] rounded-3xl overflow-hidden shadow-2xl">
           <Image 
             src="/vision-background.jpg" 
             alt="Team"
             fill
             className="object-cover"
           />
           <div className="absolute inset-0 bg-[#0a2f1c]/20"></div>
        </div> */}
        
        {/* Team Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {team.map((member) => (
            <div key={member.name} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#E8BA30]/30 transition-all duration-300">
              <div className="w-20 h-20 mx-auto mb-6 bg-[#0a2f1c] rounded-full flex items-center justify-center text-2xl font-bold text-[#E8BA30]">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 className="text-xl font-bold text-[#0a2f1c] text-center mb-1">
                {member.name}
              </h3>
              <p className="text-[#E8BA30] text-center text-sm font-bold uppercase tracking-wide mb-4">
                {member.role}
              </p>
              <p className="text-gray-500 text-center text-sm mb-6 leading-relaxed">
                {member.bio}
              </p>
              
              {/* Dynamic Social Links */}
              <div className="flex justify-center gap-3">
                <SocialIcon icon={<Linkedin size={16}/>} href={member.linkedin} label="LinkedIn" />
                <SocialIcon icon={<Twitter size={16}/>} href={member.twitter} label="Twitter" />
                <SocialIcon icon={<Mail size={16}/>} href={member.email} label="Email" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


function SocialIcon({ icon, href, label }: { icon: React.ReactNode, href: string, label: string }) {
    return (
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label={label}
          className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-[#0a2f1c] hover:text-[#E8BA30] transition-colors text-gray-500"
        >
            {icon}
        </a>
    )
}

export default TeamSection;