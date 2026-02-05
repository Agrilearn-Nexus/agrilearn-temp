import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import ServiceDetail from "@/components/services/ServiceDetail";
import { 
  Sprout, 
  Projector, 
  Microscope, 
  Briefcase, 
  BookOpen, 
  Laptop 
} from "lucide-react";
import MarqueeNotification from "@/components/MarqueeNotification";

// Data Configuration
const servicesData: Record<string, any> = {
  "farmer-training": {
    title: "Farmer Training",
    icon: <Sprout size={48} />,
    subtitle: "Empowering Cultivators with Modern Knowledge",
    description: "Our Farmer Training programs are designed to bridge the gap between traditional wisdom and modern agricultural science. We provide on-ground training modules that empower farmers to increase yield, reduce costs, and adopt sustainable practices.",
    features: ["Sustainable Crop Management", "Organic Farming Certification", "Water Conservation Techniques", "Soil Health Management"],
    image: "/hero-agriculture.jpg"
  },
  "workshops": {
    title: "Workshops",
    icon: <Projector size={48} />,
    subtitle: "Hands-on Interactive Learning Sessions",
    description: "Our workshops are intensive, interactive sessions focusing on practical skill acquisition. From drone technology in farming to post-harvest processing, we cover diverse topics that require hands-on demonstration.",
    features: ["Live Demonstrations", "Expert-led Q&A Sessions", "Hands-on Tool Usage", "Networking Opportunities"],
    image: "/hero-agriculture.jpg"
  },
  "research": {
    title: "Research",
    icon: <Microscope size={48} />,
    subtitle: "Innovating for the Future of Agriculture",
    description: "We collaborate with universities and private institutions to conduct cutting-edge research. Our focus lies in solving real-world agricultural problems through scientific inquiry and data-driven analysis.",
    features: ["Soil & Crop Analysis", "Pest Resistance Studies", "Climate Impact Research", "Yield Optimization Algorithms"],
    image: "/hero-agriculture.jpg"
  },
  "consultancy": {
    title: "Consultancy",
    icon: <Briefcase size={48} />,
    subtitle: "Expert Advice for Agribusiness Growth",
    description: "Our consultancy division provides tailored strategies for farms, startups, and agricultural organizations. We help you navigate market trends, optimize operations, and scale your business sustainably.",
    features: ["Farm Management Strategy", "Supply Chain Optimization", "Agri-Business Modeling", "Sustainability Audits"],
    image: "/hero-agriculture.jpg"
  },
  "publications": {
    title: "Publications",
    icon: <BookOpen size={48} />,
    subtitle: "Sharing Knowledge Through Words",
    description: "We publish a wide range of educational materials, including journals, white papers, and newsletters. Our goal is to document and disseminate valuable agricultural insights to the global community.",
    features: ["Monthly Agri-Journals", "Research White Papers", "Educational E-Books", "Industry Newsletters"],
    image: "/hero-agriculture.jpg"
  },
  "digital-learning": {
    title: "Digital Learning",
    icon: <Laptop size={48} />,
    subtitle: "Education Without Borders",
    description: "Our digital learning platform offers flexible, high-quality courses for students and professionals. Learn at your own pace with our comprehensive video modules and certification programs.",
    features: ["On-demand Video Courses", "Virtual Certification", "Live Webinars", "Community Discussion Forums"],
    image: "/hero-agriculture.jpg"
  }
};

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <MarqueeNotification />
      <main className="grow">
        <ServiceDetail data={service} />
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug: slug,
  }));
}