export interface TeamMember {
  name: string;
  initials: string;
  description: string;
  imageUrl?: string;
  role?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export const teamMembers: TeamMember[] = [
  {
    name: "Krishna Goutham - aka KG",
    initials: "KG",
    role: "AI Strategy & Product Leadership",
    description: "An AI strategist with 9+ years scaling products at BYJU'S, launching solutions across 6 countries and cutting development time by 70% using AI. I help businesses harness automation and AI to build efficient digital solutions.",
    imageUrl: "/team/kg.jpeg"
  },
  {
    name: "Venkatesh Golisetti - aka Venky",
    initials: "VG",
    role: "Client Relations & Strategy",
    description: "I bridge innovative ideas with practical execution, translating technical possibilities into business value. My strength is helping founders understand AI implementation value while negotiating the right approach for their needs.",
    imageUrl: "/team/venky.jpeg"
  }
];