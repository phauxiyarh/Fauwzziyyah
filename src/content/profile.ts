// Single source for every fact shown on the public site.
// Sources: the CV of July 2026 (authoritative), the skills profile summary, the previous site, and themartischool.web.app.
// Items awaiting owner confirmation are listed in planning/SPEC.md, section 13.

export const person = {
  name: "Fauwzziyyah Umar",
  firstName: "Fauwzziyyah",
  lastName: "Umar",
  initials: "FU",
  role: "School principal, educator, and data analyst",
  disciplines: ["Education", "Data", "AI"],
  statement:
    "I lead a school and use data and AI to help students learn and teachers teach. My work rests on a computer science degree, a master's in data analytics, and classrooms and communities in Nigeria and the United States.",
  location: "Maryland, United States",
  workMode: "Remote-first, open to hybrid",
  languages: "English, conversational French and Turkish",
  email: "phauzee97@gmail.com",
  linkedin: "https://linkedin.com/in/fauwzziyyah-umar",
  github: "https://github.com/phauxiyarh",
};

export const siteUrl = "https://fauwzziyyah.web.app";

export type Stat = { value: string; suffix: string; label: string; source: string };

// Each figure comes from a named role in the CV summary.
export const stats: Stat[] = [
  { value: "200", suffix: "+", label: "Students mentored in STEM", source: "Kaduna State" },
  { value: "12", suffix: "", label: "Teachers trained in digital tools", source: "Kaduna State" },
  { value: "5,000", suffix: "+", label: "Participants in youth programmes", source: "Haleyouth Foundation" },
  { value: "90", suffix: "%+", label: "ML classification accuracy", source: "Omdena" },
];

export const profile = {
  summary:
    "I am a school principal and educator with a background in computer science and data analytics. My work sits where learning, data, and people meet: I build small, useful data and AI tools for schools and youth programmes, then train the teachers and staff who run them.",
  paragraphs: [
    "I trained as a computer scientist at Nile University of Nigeria and graduated in 2018 with a 3.69 grade point average (GPA), in the top 2% of my class. Coursework in artificial intelligence (AI), digital image processing, and network security set the direction for what came next.",
    "Since 2021 I have built computer vision and remote-sensing pipelines as a volunteer machine learning (ML) engineer with Omdena. In June 2025 I completed a Master of Science (MSc) in Data Analytics at Western Governors University (WGU), and in 2025 I spent six months as a data analyst intern at Nabafat AI. The part of the work I value most is the front end: sitting with a team to learn what they need, building the tool, then teaching people who do not code to run the tool themselves.",
    "Since September 2026 I have served as Principal of The Marti School, a Saturday school in Columbia, Maryland. Before this I taught science, technology, engineering, and mathematics (STEM) in Nigeria and in Maryland. I also coordinate programmes for a youth nonprofit as a volunteer and co-founded EduvateKids, an education platform. Each strand feeds the others: teaching sharpens how I explain data, and running a business sharpens which questions deserve an answer.",
  ],
  principles: [
    {
      title: "Evidence first",
      body: "Every recommendation carries the data and the limits behind the claim.",
    },
    {
      title: "Build to ship",
      body: "A model earns its place once a person uses the output to decide something.",
    },
    {
      title: "Teach and document",
      body: "A tool outlives its builder only with plain-language guides, runbooks, and people trained to run the tool.",
    },
  ],
};

export const education = [
  {
    degree: "Master of Science (MSc), Data Analytics",
    focus: "Decision Process Engineering",
    school: "Western Governors University",
    year: "June 2025",
    points: [
      "Three micro-credential awards: Data Analytics Professional, Data Operations, Decision Process Engineer.",
      "Capstone: predictive analysis of diabetes progression with machine learning, from data to modelling, evaluation, and storytelling.",
    ],
  },
  {
    degree: "Bachelor of Science (BSc), Computer Science",
    focus: "",
    school: "Nile University of Nigeria",
    year: "September 2018",
    points: [
      "GPA 3.69 of 4.0. Top 2% of the graduating class and third best graduating student.",
      "Coursework in artificial intelligence, digital image processing, and network security.",
    ],
  },
];

export const languages = [
  { name: "English", level: "Full professional" },
  { name: "French", level: "Conversational, lived and studied in France" },
  { name: "Turkish", level: "Conversational, lived and studied in Turkey" },
];

export type Expertise = {
  icon: "chart" | "brain" | "school" | "users";
  title: string;
  body: string;
  skills: string[];
};

export const expertise: Expertise[] = [
  {
    icon: "school",
    title: "Education leadership",
    body: "Leading a school community of students, teachers, and parents, with clear expectations and steady support.",
    skills: ["School leadership", "Teacher development", "Parent partnership", "Admissions"],
  },
  {
    icon: "chart",
    title: "Learning data and analytics",
    body: "Analysis and dashboards to follow progress and guide decisions, explained in plain language.",
    skills: ["Python, SQL, R", "Power BI and Tableau", "Exploratory data analysis (EDA)", "Data storytelling"],
  },
  {
    icon: "brain",
    title: "AI and machine learning",
    body: "Predictive models and small AI tools for schools and youth programmes, built with the people who run them.",
    skills: ["Scikit-learn", "TensorFlow", "Prompt design", "Zapier and Make"],
  },
  {
    icon: "users",
    title: "Teaching and programme design",
    body: "Project-based STEM teaching, teacher training, and youth programmes from plan to impact report.",
    skills: ["Curriculum design", "Teacher training", "Workshop facilitation", "Programme coordination"],
  },
];

export type Role = {
  org: string;
  url?: string;
  title: string;
  place: string;
  period: string;
  points: string[];
};

export type Track = { key: "technology" | "education" | "leadership"; label: string; roles: Role[] };

export const experience: Track[] = [
  {
    key: "technology",
    label: "Data and AI",
    roles: [
      {
        org: "Nabafat AI",
        title: "Data Analyst Intern",
        place: "Remote",
        period: "2025, six-month internship",
        points: [
          "Delivered end-to-end analytics and ML projects in Python and SQL, so programme managers saw which cohorts were slipping without a manual data pull.",
          "Built Power BI and Tableau dashboards which cut manual reporting time by 20% and let non-technical teammates answer their own questions.",
          "Documented data flows and reporting standards so anyone on the team found the numbers.",
        ],
      },
      {
        org: "Omdena",
        title: "Machine Learning Engineer (volunteer)",
        place: "Remote",
        period: "2021 to present",
        points: [
          "Built computer vision and remote-sensing pipelines with Python, OpenCV, and TensorFlow.",
          "Reached over 90% accuracy on crop-type classification from satellite imagery.",
          "Cut manual survey time by 40% by automating solar-site selection, with results in a dashboard the field team used to pick sites.",
        ],
      },
    ],
  },
  {
    key: "education",
    label: "Education and school leadership",
    roles: [
      {
        org: "The Marti School",
        url: "https://themartischool.web.app",
        title: "Principal",
        place: "Columbia, Maryland",
        period: "September 2026 to present",
        points: [
          "Leads the Saturday school of the Maryland Turkish-American Inhabitants, with classes in Turkish language, Quran and Islamic studies, performance, and enrichment.",
          "Sets the academic direction so every student learns with confidence, builds good character, and achieves at a level suited to each child.",
          "Leads, supports, and develops the teaching team, from lesson planning and ability grouping to classroom practice.",
          "Partners with parents through admissions, open days, termly progress reports, and the online family portal.",
        ],
      },
      {
        org: "Prince George's County Public Schools",
        title: "STEM Educator and Substitute Teacher",
        place: "Laurel, Maryland",
        period: "2024",
        points: [
          "Taught STEM classes across grade levels, often at short notice.",
          "Learned from resident teachers what worked for each class and adapted lessons to suit the day.",
        ],
      },
      {
        org: "Kaduna State Government Education Board",
        title: "STEM Instructor (contract)",
        place: "Kaduna, Nigeria",
        period: "2021 to 2022",
        points: [
          "Built a project-based STEM curriculum for grades 7 to 12 and ran weekly workshops and capstone tracks across schools.",
          "Mentored over 200 students.",
          "Trained 12 teachers on Google Classroom and digital tools, lifting STEM lesson adoption by 20%.",
        ],
      },
      {
        org: "STEMi Makers Africa",
        title: "Creative Director",
        place: "Laurel, Maryland",
        period: "April 2021 to November 2022",
        points: [
          "Led 12 or more creative and educational STEM projects.",
          "Ran weekly ideation workshops and generated over 30 programme concepts, eight of which reached pilot.",
        ],
      },
    ],
  },
  {
    key: "leadership",
    label: "Leadership and ventures",
    roles: [
      {
        org: "EduvateKids",
        url: "https://eduvatekids.com",
        title: "Co-Founder and Chief Executive Officer",
        place: "Maryland, United States",
        period: "2023 to present",
        points: [
          "Co-founded and runs an Islamic education platform for families and schools across North America, with over 400 curated titles and more than 50 learning events a year.",
          "Automated registration, reminder, and reporting workflows with AI assistants, Zapier, and Make, and reviews every AI-drafted answer before the answer reaches families.",
          "Manages partnerships with publishers including Learning Roots and Kube Publishing.",
        ],
      },
      {
        org: "Haleyouth Foundation",
        title: "Programme Coordinator (volunteer)",
        place: "Nigeria, remote",
        period: "2020 to present",
        points: [
          "Coordinates over 20 concurrent programmes, online and in person, for more than 5,000 participants in youth empowerment, girl-child education, and STEM.",
          "Interviews participants and partners to learn what they need, then assigns and supports volunteers on each piece of work.",
          "Grew newsletter reach by 50% and social media engagement by 60% on a volunteer budget.",
        ],
      },
      {
        org: "MeeFa Fashion",
        title: "Founder and Chief Executive Officer",
        place: "Kaduna, Nigeria",
        period: "January 2017 to present",
        points: [
          "Built a women's apparel brand with more than 50 retail partners.",
          "Runs operations, supplier contracts, and quality control.",
        ],
      },
    ],
  },
];

export type Work = {
  url?: string;
  tag: string;
  year: string;
  title: string;
  context: string;
  contribution: string;
  tools: string[];
};

export const work: Work[] = [
  {
    tag: "STEM education",
    year: "2021 to 2022",
    title: "Project-based STEM curriculum and teacher training",
    context: "Kaduna State Government Education Board, Nigeria.",
    contribution:
      "Built a project-based STEM curriculum for grades 7 to 12, ran weekly workshops and capstone tracks, mentored over 200 students, and trained 12 teachers on Google Classroom and digital tools, lifting STEM lesson adoption by 20%.",
    tools: ["Curriculum design", "Google Classroom", "Capstone projects", "Teacher training"],
  },
  {
    tag: "Healthcare analytics",
    year: "2025",
    title: "Predicting diabetes progression",
    context: "MSc capstone at Western Governors University.",
    contribution:
      "Ran the full cycle for predicting diabetes progression with ML: data preparation, modelling, evaluation, and a written story of the results and their limits.",
    tools: ["Python", "Scikit-learn", "Pandas", "Statistical testing"],
  },
  {
    url: "https://eduvatekids.com",
    tag: "Workflow automation",
    year: "2023 to present",
    title: "AI workflows for an education platform",
    context: "EduvateKids, Maryland.",
    contribution:
      "Automated form-to-CRM sync, reminder sequences, and reporting with AI assistants, Zapier, and Make, with a human review of every AI-drafted answer before the answer reaches families.",
    tools: ["Zapier", "Make", "Prompt design", "Process documentation"],
  },
  {
    tag: "Remote sensing",
    year: "2021 to present",
    title: "Crop-type classification from satellite imagery",
    context: "Omdena, collaborative AI project with an international team.",
    contribution:
      "Built a computer vision pipeline on satellite imagery which reached over 90% crop-type classification accuracy.",
    tools: ["Python", "TensorFlow", "OpenCV", "Satellite imagery"],
  },
];

export type Credential = { title: string; issuer: string; year: string };

export const certifications: Credential[] = [
  { title: "Power BI Data Analyst, Microsoft Certified", issuer: "Foresight BI, WiDA scholarship", year: "2022" },
  { title: "Google Data Analytics Professional", issuer: "Google, via Coursera", year: "2022" },
  { title: "Data Analyst Nanodegree", issuer: "Udacity, ALX scholarship", year: "2022" },
  { title: "ML Engineering, computer vision and TensorFlow", issuer: "Omdena", year: "2021 to present" },
  { title: "Introduction to Project Management", issuer: "Coursera", year: "2020" },
];

export const awards: Credential[] = [
  {
    title: "Three micro-credential awards",
    issuer: "WGU: Data Analytics Professional, Data Operations, Decision Process Engineer",
    year: "2025",
  },
  { title: "LifeLine HealthTech Solution Award", issuer: "Second place nationally, NITDA Future-Hack", year: "2019" },
  { title: "Academic Excellence Award", issuer: "Nile University of Nigeria, third best graduate", year: "2018" },
];

// Proposed research interests, drawn from her roles. Confirm with the owner.
export const researchInterests = [
  {
    title: "Data-informed school improvement",
    body: "How attendance, progress, and assessment data shape decisions by school leaders, teachers, and parents.",
    evidence: "Principal, The Marti School. Dashboards at Nabafat AI.",
  },
  {
    title: "AI in teaching and learning",
    body: "How teachers adopt small AI tools, and what training and safeguards help those tools serve learners.",
    evidence: "AI workflows at EduvateKids. Teacher training in Kaduna.",
  },
  {
    title: "Community and heritage-language schools",
    body: "Learning, identity, and family engagement among multilingual children in community-run schools.",
    evidence: "Saturday school leadership. Life and study across four countries.",
  },
];

export const toolkit: { group: string; items: string[] }[] = [
  { group: "Data and analysis", items: ["Python", "Pandas", "NumPy", "SQL", "R", "Excel"] },
  { group: "Machine learning", items: ["Scikit-learn", "TensorFlow", "PyTorch", "OpenCV", "Hugging Face Transformers"] },
  { group: "BI and visualisation", items: ["Power BI", "Tableau", "Data storytelling"] },
  { group: "Cloud and pipelines", items: ["Google BigQuery", "AWS SageMaker", "Apache Airflow"] },
  { group: "AI and automation", items: ["ChatGPT", "Notion AI", "Zapier", "Make", "Prompt design"] },
  { group: "Teaching and enablement", items: ["Teacher training", "Workshop facilitation", "Curriculum design", "Runbooks and FAQs"] },
];

export type EnquiryType = "role" | "consulting" | "research" | "speaking" | "support" | "other";

export const enquiryLabels: Record<EnquiryType, string> = {
  role: "Full-time or contract role",
  consulting: "Consulting project",
  research: "Research or education collaboration",
  speaking: "Speaking or mentoring",
  support: "Virtual professional support",
  other: "Something else",
};

export const nav = [
  { href: "/#profile", label: "Profile" },
  { href: "/#research", label: "Research" },
  { href: "/#expertise", label: "Expertise" },
  { href: "/#work", label: "Work" },
  { href: "/cv/", label: "CV" },
];
