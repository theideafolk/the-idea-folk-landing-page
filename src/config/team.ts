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
    name: "Krishna",
    initials: "KV",
    role: "AI Strategy & Product Leadership",
    description: "An AI strategist and product leader with 9+ years of experience scaling products and teams at BYJU'S, a global EdTech leader. I've built and launched products across 6 countries, scaled teams from 45 to 300+ members, and consistently cut development time by 70% using AI.\n\nNow, I'm applying that expertise to help small businesses like yours harness the power of AI and automation. Whether you're looking to build an MVP, streamline your workflows, or develop a winning content strategy, I'm here to guide you every step of the way."
  },
  {
    name: "Venkatesh Golisetti",
    initials: "VG",
    role: "Client Relations & Financial Strategy",
    description: "I bridge the gap between innovative ideas and practical execution. At The Idea Folk, I lead client relationships and financial strategy—translating technical possibilities into business terms that matter. My strength lies in helping founders understand the true value of AI implementation while negotiating the right approach for their unique needs.\n\nWith a background in scaling operations, I ensure our partnerships deliver not just technical solutions, but measurable business outcomes."
  }
];