export interface Experience {
  role: string;
  organization: string;
  location: string;
  period: string;
  bullets: string[];
  logoUrl: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  details: string[];
  logoUrl: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Certification {
  name: string;
  url: string;
  logoUrl?: string;
}

export const personalInfo = {
  name: "Mochammad Syahrindra Akbar Suharno",
  role: "Fresh Graduate of Informatics Engineering",
  email: "syahrindraakbar09 [at] gmail [dot] com",
  github: "https://github.com/syahrindra",
  linkedin: "https://www.linkedin.com/in/m-syahrindra/",
  kaggle: "https://kaggle.com/mochammadsasuharno",
  leetcode: "https://leetcode.com/u/M_syah/",
};

export const education: Education[] = [
  {
    degree: "Bachelor of Informatics Engineering",
    institution: "Universitas Widyatama",
    location: "Bandung, Indonesia",
    period: "2021 — 2026",
    details: [
      "Relevant coursework: Programming and Algorithm, Object-Oriented Programming, Data Structure and Algorithm",
    ],
    logoUrl: "/img/resume/universitas_widyatama.png"
  },
  {
    degree: "Beswan Djarum 2023/2024",
    institution: "Djarum Beasiswa Plus",
    location: "Indonesia",
    period: "Aug 2023 — Nov 2024",
    details: [],
    logoUrl: "/img/resume/dbph.png"
  }
];

export const professionalExperience: Experience[] = [
  {
    role: "Machine Learning Instructor & Co-Lead",
    organization: "GDG on Campus Widyatama University",
    location: "Bandung, Indonesia",
    period: "Sep 2023 — Present",
    bullets: [
      "Drove successful execution of over 50 events and distributed IDR 43.500.00+ worth of Dicoding subscription tokens",
      "Collaborate with more than 10 partners",
      "Recognized as the 2nd most active and 3rd most impactful GDSC chapter among 86 nationwide",
    ],
    logoUrl: "/img/resume/gdgoc_widyatama_university.png"
  },
  {
    role: "Region Business Performance",
    organization: "PT Bank Muamalat Indonesia",
    location: "Bandung, Indonesia",
    period: "Feb 2025 — Apr 2025",
    bullets: [],
    logoUrl: "/img/resume/pt_muamalat.png"
  },
  {
    role: "Assistant Lecturer",
    organization: "Universitas Widyatama",
    location: "Bandung, Indonesia",
    period: "Sep 2024 — Feb 2025",
    bullets: [
      "Supported academic development by facilitating learning in Programming and Algorithm I, Object-Oriented Programming I, and Data Structure and Algorithm",
      "Assisted students in learning Object Oriented Programming Courses using Java programming language (Oct 2023 - Jan 2024)",
    ],
    logoUrl: "/img/resume/universitas_widyatama.png"
  },
  {
    role: "Machine Learning Cohort",
    organization: "Bangkit Academy led by Google, Tokopedia, Gojek, & Traveloka",
    location: "Indonesia",
    period: "Feb 2024 — Jul 2024",
    bullets: [
      "Chosen as one of 4.650 participants from a pool of over 57.000 applicants",
      "Completed an intensive 900+ hours machine-learning curriculum",
      "Recognized as one of the 1.000 most active students in the Instructor-Led Training (ILT) sessions",
      "Recognized as top 1.000 performing students in English courses & tests (average score: 93.23/100)",
    ],
    logoUrl: "/img/resume/bangkit.png"
  },
];

export const leadershipExperience: Experience[] = [
  {
    role: "Organizing Committee Program of Local Project",
    organization: "AIESEC in Bandung",
    location: "Bandung, Indonesia",
    period: "Aug 2023 — Feb 2024",
    bullets: [
      "Developed a comprehensive 4-week hybrid program with 20 agendas",
      "Conducted thorough research to identify target audiences, speakers, and other key elements",
      "Achieved recognition as the best general board for Local Project of the Year",
    ],
    logoUrl: "/img/resume/aiesec.jpg"
  },
  {
    role: "Organizing Committee Customer Experience of Local Project",
    organization: "AIESEC in Bandung",
    location: "Bandung, Indonesia",
    period: "Feb 2023 — Aug 2023",
    bullets: [
      "Maintained 30 delegates during the project and International Relationship partner from two different countries",
      "Created tools that support the customer experience productivity",
    ],
    logoUrl: "/img/resume/aiesec.jpg"
  },
  {
    role: "Staff of Ta'jil Division",
    organization: "P3RI Salman ITB 1444 H",
    location: "Bandung, Indonesia",
    period: "Feb 2023 — Jun 2023",
    bullets: [
      "Responsible for providing ta'jil to be distributed to the congregation of Salman Mosque",
      "Facilitated ta'jil distribution to 500+ congregants per day during Ramadan",
    ],
    logoUrl: "/img/resume/p3ri.jpg"
  },
  {
    role: "Campus Ambassador",
    organization: "International MUN",
    location: "Indonesia",
    period: "Oct 2021 — Nov 2021",
    bullets: [
      "Promoted the IMUN Conference program and assisted participants in the process of joining",
      "Become an International MUN Brand Ambassador and promote it on social media",
    ],
    logoUrl: "/img/resume/imun.jpg"
  },
];

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    items: ["Python", "Java", "English"],
  },
  {
    category: "Data & ML",
    items: [
      "Data Analysis",
      "Machine Learning",
      "Cloud Technologies",
    ],
  },
  {
    category: "Tools",
    items: [
      "Excel",
      "Microsoft Azure",
    ],
  },
];

export const certification: Certification[] = [
  {
    name: "Microsoft Office Specialist (MOS) in Excel",
    url: "https://drive.google.com/file/d/1LJRpuKGXc8pzVsPWpOWiEcHEB_thEoD0/view?usp=sharing",
    logoUrl: "/img/resume/certification_mos.png"
  },
  {
    name: "AI-900: Microsoft Azure AI Fundamentals",
    url: "https://learn.microsoft.com/api/credentials/share/en-us/MSyahrindra-6092/C7C5792D96D8134A?sharingId=EF00FED9943A07E0",
    logoUrl: "/img/resume/certification_ai_900.png"
  },
  {
    name: "Data Analyst Associate",
    url: "https://www.datacamp.com/certificate/DAA0015321624436",
    logoUrl: "/img/resume/certification_daa.png"
  },
  {
    name: "BNSP (Badan Nasional Sertifikasi Profesi) Certified: Database Administrator",
    url: "https://drive.google.com/file/d/1HJhScbBzS4rGbJIxikoZXRJMMzcXAKeQ/view?usp=sharing",
    logoUrl: "/img/resume/bnsp.png"
  }
]; 