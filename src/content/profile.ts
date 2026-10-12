// Single source for every fact shown on the public site.
// Sources: the previous site (virtual_service_pro) and the Fauwziyyah_Skills_Profile.md CV summary.
// Items awaiting owner confirmation are listed in planning/SPEC.md, section 13.

export const person = {
  name: "Fauwzziyyah Umar",
  firstName: "Fauwzziyyah",
  lastName: "Umar",
  initials: "FU",
  role: "School principal, data analyst, ML engineer, and founder",
  disciplines: ["Data and AI", "Education", "Enterprise"],
  statement:
    "I lead a school, turn data into decisions, and build ventures in education and retail. A computer science degree, a master's in data analytics, and life across Nigeria, France, Turkey, and the United States shape how I work.",
  location: "Maryland, United States",
  workMode: "Remote-first, open to hybrid",
  languages: "English, French, conversational Turkish",
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
  { value: "400", suffix: "+", label: "Titles curated as founder", source: "EduvateKids" },
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
    "Since 2021 I have built computer vision and remote-sensing pipelines as a machine learning (ML) engineer with Omdena. Since May 2025 I have worked as a data analyst at Nabafat AI, delivering ML and analytics projects in Python and SQL. In 2025 I completed a Master of Science (MSc) in Data Analytics at Western Governors University (WGU).",
    "Since September 2026 I have served as Principal of The Marti School, a Saturday school in Columbia, Maryland. Before this I taught science, technology, engineering, and mathematics (STEM) in Nigeria and in Maryland. I also coordinate programmes for a youth nonprofit and have founded two businesses. Each strand feeds the others: teaching sharpens how I explain data, and running a business sharpens which questions deserve an answer.",
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
      title: "Teach what you know",
      body: "Knowledge grows in value once shared, in a classroom, a workshop, or a handover document.",
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
    skills: ["Python, SQL, R", "Power BI and Tableau", "Excel and VBA", "Data storytelling"],
  },
  {
    icon: "brain",
    title: "Machine learning and computer vision",
    body: "Predictive models and image pipelines, from data preparation through evaluation and deployment.",
    skills: ["Scikit-learn", "TensorFlow and PyTorch", "OpenCV", "Remote sensing"],
  },
  {
    icon: "workflow",
    title: "Data engineering and automation",
    body: "Pipelines and workflows to remove manual steps between raw data and a finished report.",
    skills: ["BigQuery pipelines", "Extract, transform, load (ETL)", "Apache Airflow", "Zapier and Make"],
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
        title: "Data Analyst",
        place: "Remote",
        period: "May 2025 to present",
        points: [
          "Delivered six or more end-to-end ML and analytics projects in Python and SQL.",
          "Raised programme engagement by 35% through business insights acted on by the team.",
          "Improved business-to-business (B2B) customer retention by 20% with ETL and BigQuery analysis.",
          "Built Power BI and Tableau dashboards which cut manual reporting time by 20%.",
        ],
      },
      {
        org: "Omdena",
        title: "Junior Machine Learning Engineer",
        place: "Remote",
        period: "March 2021 to present",
        points: [
          "Built computer vision and remote-sensing pipelines with Python, OpenCV, and TensorFlow.",
          "Reached over 90% accuracy on crop-type classification from multispectral satellite imagery.",
          "Located solar-panel sites with vegetation indices and object detection, cutting manual survey time by 40%.",
          "Reduced inference latency by 35% through GPU acceleration and tensor batching.",
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
        period: "May 2024 to August 2024",
        points: [
          "Taught STEM subjects across grade levels.",
          "Adapted lessons to student needs and reviewed student progress.",
        ],
      },
      {
        org: "Kaduna State Government Education Board",
        title: "STEM Instructor",
        place: "Kaduna, Nigeria",
        period: "May 2021 to January 2022",
        points: [
          "Designed a project-based STEM curriculum for grades 7 to 12.",
          "Mentored over 200 students and guided 15 groups through capstone projects in engineering, coding, and data analysis.",
          "Trained 12 teachers in STEM teaching methods and technology use.",
          "Raised science fair and club participation by 30%.",
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
        title: "Founder",
        place: "Maryland, United States",
        period: "2021 to present",
        points: [
          "Founded an Islamic educational bookstore and learning resource platform for families, schools, and communities in North America.",
          "Grew the catalogue to over 400 curated titles and runs more than 50 learning events a year.",
          "Manages partnerships with publishers including Learning Roots and Kube Publishing.",
        ],
      },
      {
        org: "Haleyouth Foundation",
        title: "Programme Coordinator",
        place: "Nigeria, remote",
        period: "March 2020 to present",
        points: [
          "Coordinated over 20 outreach initiatives, online and in person, reaching more than 5,000 participants.",
          "Grew social media engagement by 60% and newsletter reach by 50%.",
          "Supports programmes in STEM education, digital skills, girl-child health, and career advice.",
        ],
      },
      {
        org: "MeeFa Fashion",
        title: "Founder and Chief Executive Officer",
        place: "Kaduna, Nigeria",
        period: "January 2017 to present",
        points: [
          "Built a women's apparel brand with more than 50 retail partners.",
          "Recorded 120% year-on-year revenue growth for three consecutive years.",
          "Leads a team of eight across operations, supplier contracts, and quality control.",
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
      "Built a computer vision pipeline on multispectral satellite imagery which reached over 90% classification accuracy, with outputs fed into stakeholder dashboards.",
    tools: ["Python", "TensorFlow", "OpenCV", "Multispectral imagery"],
  },
  {
    tag: "Energy siting",
    year: "Omdena",
    title: "Solar-panel site selection",
    context: "Geospatial analysis for renewable energy planning.",
    contribution:
      "Combined the normalised difference vegetation index (NDVI), the normalised burn ratio (NBR), and object detection to rank sites, cutting manual survey time by 40%.",
    tools: ["NDVI and NBR", "Object detection", "Python", "GPU acceleration"],
  },
  {
    tag: "Healthcare analytics",
    year: "2025",
    title: "Predicting diabetes progression",
    context: "MSc capstone at Western Governors University.",
    contribution:
      "Built and evaluated ML models to predict diabetes progression from clinical measurements, and reported the results with their limits.",
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
    title: "ML engineering, STEM teaching, and EduvateKids",
    body: "Joined Omdena as an ML engineer, taught STEM for the Kaduna State Government Education Board, and founded EduvateKids.",
  },
  {
    year: "2022",
    title: "Three professional certifications",
    body: "Google Data Analytics, the Udacity Data Analyst Nanodegree, and Power BI Data Analyst.",
  },
  {
    year: "2024",
    title: "STEM Educator, Prince George's County Public Schools",
    body: "Classroom STEM teaching across grade levels in Laurel, Maryland.",
  },
  {
    year: "2025",
    title: "MSc Data Analytics and Nabafat AI",
    body: "Completed the MSc at WGU with three micro-credential awards, and joined Nabafat AI as a data analyst.",
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
  { title: "Power BI Data Analyst Professional", issuer: "Foresight BI and Analytics, WiDA scholarship", year: "2022" },
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
  { group: "Analytics and visualisation", items: ["Python", "SQL", "R", "Pandas", "NumPy", "Power BI", "Tableau", "Excel"] },
  { group: "Machine learning", items: ["Scikit-learn", "TensorFlow", "PyTorch", "Hugging Face", "OpenCV", "Spark MLlib"] },
  { group: "Cloud and data", items: ["BigQuery", "Snowflake", "Databricks", "AWS SageMaker", "Azure ML"] },
  { group: "Pipelines and MLOps", items: ["Apache Airflow", "MLflow", "DVC", "Kubeflow", "Docker", "Kubernetes"] },
  { group: "Automation", items: ["Zapier", "Make", "LLM integration", "No-code AI tools"] },
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
