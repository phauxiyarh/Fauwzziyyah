// Single source for every fact shown on the public site.
// Sources: the CV of July 2026 (authoritative), the skills profile summary, the previous site, and themartischool.web.app.
// Items awaiting owner confirmation are listed in planning/SPEC.md, section 13.

export const person = {
  name: "Fauwzziyyah Umar",
  firstName: "Fauwzziyyah",
  lastName: "Umar",
  initials: "FU",
  role: "School principal, data analyst, ML engineer, and co-founder",
  disciplines: ["Data and AI", "Education", "Enterprise"],
  statement:
    "I lead a school, turn data into decisions, and build ventures in education and retail. A computer science degree, a master's in data analytics, and life across Nigeria, France, Turkey, and the United States shape how I work.",
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
  { value: "90", suffix: "%+", label: "Crop-type classification accuracy", source: "Omdena" },
  { value: "200", suffix: "+", label: "Students mentored in STEM", source: "Kaduna State" },
  { value: "5,000", suffix: "+", label: "Participants reached by outreach", source: "Haleyouth Foundation" },
  { value: "400", suffix: "+", label: "Titles curated as co-founder", source: "EduvateKids" },
];

export const credentialStrip = [
  "The Marti School",
  "Western Governors University",
  "Nabafat AI",
  "Omdena",
  "Nile University of Nigeria",
  "Prince George's County Public Schools",
  "Haleyouth Foundation",
  "EduvateKids",
  "Google",
  "Udacity",
  "NITDA Future-Hack",
];

export const profile = {
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

export type Expertise = {
  icon: "chart" | "brain" | "workflow" | "school" | "users" | "store";
  title: string;
  body: string;
  skills: string[];
};

export const expertise: Expertise[] = [
  {
    icon: "chart",
    title: "Data analytics and business intelligence",
    body: "Exploratory analysis, statistical modelling, and dashboards for teams who need numbers they trust.",
    skills: ["Python, SQL, R", "Power BI and Tableau", "Exploratory data analysis (EDA)", "Data storytelling"],
  },
  {
    icon: "brain",
    title: "Machine learning and computer vision",
    body: "Predictive models and image pipelines, from data preparation through evaluation and deployment.",
    skills: ["Scikit-learn", "TensorFlow and PyTorch", "OpenCV", "Remote sensing"],
  },
  {
    icon: "workflow",
    title: "AI tools and automation",
    body: "Small AI and no-code tools for schools and youth programmes, built with the people who will run them.",
    skills: ["Prompt design", "Zapier and Make", "Form-to-CRM workflows", "ETL with Apache Airflow"],
  },
  {
    icon: "school",
    title: "School leadership and STEM education",
    body: "Leading a school community of students, teachers, and parents, built on years of project-based STEM teaching.",
    skills: ["School leadership", "Teacher development", "Curriculum design", "Parent partnership"],
  },
  {
    icon: "users",
    title: "Programme leadership and community",
    body: "Coordination of outreach programmes, volunteers, and partners from plan to impact report.",
    skills: ["Programme coordination", "Stakeholder communication", "Impact reporting", "Content strategy"],
  },
  {
    icon: "store",
    title: "Entrepreneurship and brand building",
    body: "Founder experience across retail and education, from supplier contracts to digital storefronts.",
    skills: ["Operations and P&L", "Brand and marketing", "Partner relationships", "Event management"],
  },
];

export type Role = {
  org: string;
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
  tag: string;
  year: string;
  title: string;
  context: string;
  contribution: string;
  tools: string[];
};

export const work: Work[] = [
  {
    tag: "Remote sensing",
    year: "Omdena",
    title: "Crop-type classification from satellite imagery",
    context: "Collaborative AI project with a distributed international team.",
    contribution:
      "Built a computer vision pipeline on satellite imagery which reached over 90% crop-type classification accuracy.",
    tools: ["Python", "TensorFlow", "OpenCV", "Multispectral imagery"],
  },
  {
    tag: "Energy siting",
    year: "Omdena",
    title: "Solar-panel site selection",
    context: "Geospatial analysis for renewable energy planning.",
    contribution:
      "Automated solar-site selection, cutting manual survey time by 40%, and put the results into a dashboard the field team used to pick sites.",
    tools: ["Python", "Remote sensing", "Object detection", "Dashboards"],
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
    tag: "Health technology",
    year: "2019",
    title: "LifeLine",
    context: "Future-Hack, National Information Technology Development Agency (NITDA), Nigeria.",
    contribution: "LifeLine, a health technology solution, placed second nationally at the NITDA Future-Hack.",
    tools: ["Product design", "Prototyping", "Pitching"],
  },
];

export type Milestone = { year: string; title: string; body: string };

export const journey: Milestone[] = [
  {
    year: "2017",
    title: "Founded MeeFa Fashion",
    body: "A women's apparel brand in Kaduna, Nigeria, now with more than 50 retail partners.",
  },
  {
    year: "2018",
    title: "BSc Computer Science, Nile University of Nigeria",
    body: "Top 2% of the graduating class and third best graduate, with the Academic Excellence Award.",
  },
  {
    year: "2019",
    title: "Second place, NITDA Future-Hack",
    body: "National recognition for LifeLine, a health technology solution.",
  },
  {
    year: "2020",
    title: "Programme Coordinator, Haleyouth Foundation",
    body: "Youth empowerment and girl-child education programmes across Nigeria. Project management certificate from Coursera.",
  },
  {
    year: "2021",
    title: "ML engineering and STEM teaching",
    body: "Began volunteer ML engineering with Omdena and taught STEM for the Kaduna State Government Education Board.",
  },
  {
    year: "2022",
    title: "Three professional certifications",
    body: "Google Data Analytics, the Udacity Data Analyst Nanodegree, and Power BI Data Analyst.",
  },
  {
    year: "2023",
    title: "Co-Founder and CEO, EduvateKids",
    body: "Co-founded an Islamic education platform for families and schools across North America.",
  },
  {
    year: "2024",
    title: "STEM Educator, Prince George's County Public Schools",
    body: "Classroom STEM teaching across grade levels in Laurel, Maryland.",
  },
  {
    year: "June 2025",
    title: "MSc Data Analytics, Western Governors University",
    body: "Decision Process Engineering focus, a capstone on diabetes progression, and three micro-credential awards.",
  },
  {
    year: "2025",
    title: "Data Analyst Intern, Nabafat AI",
    body: "A six-month internship delivering analytics and ML projects, dashboards, and reporting standards.",
  },
  {
    year: "2026",
    title: "Principal, The Marti School",
    body: "Leading a Saturday school in Columbia, Maryland, and its community of students, teachers, and parents.",
  },
  {
    year: "Now",
    title: "Leading where data and education meet",
    body: "Taking on roles and projects where analysis, ML, and education meet a real decision.",
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

// Confirm this list with the owner before launch.
export const learningFocus = [
  { title: "ML operations (MLOps)", body: "Deploying, monitoring, and versioning models with MLflow, DVC, and Kubeflow." },
  { title: "Large language model (LLM) applications", body: "Retrieval, evaluation, and safe use of language models in workflows." },
  { title: "AI in education", body: "Data and AI tools to support teachers, learners, and families." },
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

export const engagements: { type: EnquiryType; title: string; body: string }[] = [
  { type: "role", title: "Full-time and contract roles", body: "Data analyst, ML engineer, business intelligence, EdTech, and education leadership positions." },
  { type: "consulting", title: "Consulting projects", body: "Scoped analytics, dashboard, or automation work with a clear outcome." },
  { type: "research", title: "Education and impact partnerships", body: "Programmes, curricula, and research with schools and nonprofits." },
  { type: "speaking", title: "Speaking and mentoring", body: "Talks, workshops, and mentoring for people entering data and STEM careers." },
  { type: "support", title: "Virtual professional support", body: "Analytics, research, design, and automation support on a flexible basis." },
];

export const enquiryLabels: Record<EnquiryType, string> = {
  role: "Full-time or contract role",
  consulting: "Consulting project",
  research: "Education or impact partnership",
  speaking: "Speaking or mentoring",
  support: "Virtual professional support",
  other: "Something else",
};

export const process = [
  { title: "Conversation", body: "We agree on the goal, the constraints, and what success looks like." },
  { title: "Proposal", body: "You receive a written scope, timeline, and price before any work begins." },
  { title: "Delivery", body: "I share progress at agreed points and flag risks as soon as they appear." },
  { title: "Follow-through", body: "Handover includes documentation, so your team owns the result." },
];

export const nav = [
  { href: "#profile", label: "Profile" },
  { href: "#expertise", label: "Expertise" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#journey", label: "Journey" },
  { href: "#engage", label: "Engage" },
];
