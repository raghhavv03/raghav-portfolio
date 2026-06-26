// ============================================================
// PORTFOLIO CONTENT — edit everything here, never in components
// Anything marked [PLACEHOLDER] is meant to be replaced by you.
// ============================================================

export const personal = {
  name: 'Raghav Gupta',
  title: 'CS Student',
  location: 'Delhi, India',
  email: 'raghavgupta9348@gmail.com',
  phone: '+91 9958658622',
  linkedin: 'https://www.linkedin.com/in/raghhavv93',
  github: 'https://github.com/placeholder-github', // [PLACEHOLDER] real GitHub URL
  resumeUrl: '/resume.pdf', // [PLACEHOLDER] drop your real resume at /public/resume.pdf
  // [PLACEHOLDER] 3-4 line bio — replace with your own words
  bio: `[PLACEHOLDER] A compelling 3-4 line bio goes here. Who you are, what you
build, what you're learning right now, and what kind of problems get you excited.
Write it in your own voice — this is the first real thing visitors read about you.`,
  currentlyBuilding: '[PLACEHOLDER] An ML-powered something — watch this space',
};

export const heroRoles = [
  'CS Student',
  'ML Enthusiast',
  'Problem Solver',
];

export const funFacts = [
  { icon: 'coffee', text: '[PLACEHOLDER] Fueled by an alarming amount of chai' },
  { icon: 'terminal', text: '[PLACEHOLDER] Vim keybindings everywhere, no regrets' },
  { icon: 'globe', text: '[PLACEHOLDER] A fun fact about places you have lived or studied' },
  { icon: 'zap', text: '[PLACEHOLDER] Hackathon regular, sleep optional' },
];

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export const skills = [
  {
    category: 'Languages',
    items: [
      { name: 'Python', icon: 'python' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Java', icon: 'java' },
      { name: 'C++', icon: 'cpp' },
      { name: 'SQL', icon: 'database' },
    ],
  },
  {
    category: 'Frameworks',
    items: [
      { name: 'React', icon: 'react' },
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'Express', icon: 'server' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
      { name: 'FastAPI', icon: 'server' },
    ],
  },
  {
    category: 'Tools',
    items: [
      { name: 'Git', icon: 'git' },
      { name: 'Docker', icon: 'docker' },
      { name: 'AWS', icon: 'aws' },
      { name: 'Linux', icon: 'linux' },
      { name: 'PostgreSQL', icon: 'database' },
      { name: 'MongoDB', icon: 'mongodb' },
    ],
  },
  {
    category: 'AI / ML',
    items: [
      { name: 'PyTorch', icon: 'pytorch' },
      { name: 'TensorFlow', icon: 'tensorflow' },
      { name: 'scikit-learn', icon: 'brain' },
      { name: 'Pandas', icon: 'pandas' },
      { name: 'OpenCV', icon: 'eye' },
      { name: 'Hugging Face', icon: 'brain' },
    ],
  },
];

export const projects = [
  {
    name: 'Project Alpha',
    description:
      '[PLACEHOLDER] One-to-two line description of what Project Alpha does and why it is impressive.',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL'],
    category: 'web',
    github: 'https://github.com/placeholder-github/project-alpha',
    demo: 'https://project-alpha-placeholder.vercel.app',
    comingSoon: false,
  },
  {
    name: 'Project Beta',
    description:
      '[PLACEHOLDER] One-to-two line description of what Project Beta does and why it is impressive.',
    tech: ['Python', 'PyTorch', 'FastAPI'],
    category: 'ml',
    github: 'https://github.com/placeholder-github/project-beta',
    demo: 'https://project-beta-placeholder.vercel.app',
    comingSoon: false,
  },
  {
    name: 'Project Gamma',
    description:
      '[PLACEHOLDER] One-to-two line description of what Project Gamma does and why it is impressive.',
    tech: ['React', 'Node.js', 'MongoDB'],
    category: 'web',
    github: 'https://github.com/placeholder-github/project-gamma',
    demo: 'https://project-gamma-placeholder.vercel.app',
    comingSoon: false,
  },
  {
    name: 'Project Delta',
    description:
      '[PLACEHOLDER] One-to-two line description of what Project Delta does and why it is impressive.',
    tech: ['Python', 'OpenCV', 'TensorFlow'],
    category: 'other',
    github: 'https://github.com/placeholder-github/project-delta',
    demo: 'https://project-delta-placeholder.vercel.app',
    comingSoon: true,
  },
];

export const projectFilters = [
  { label: 'All', value: 'all' },
  { label: 'Web', value: 'web' },
  { label: 'ML', value: 'ml' },
  { label: 'Other', value: 'other' },
];

// Everything below is a PLACEHOLDER — replace with your real internships.
export const experience = [
  {
    company: '[PLACEHOLDER] Company One',
    role: '[PLACEHOLDER] Role / Internship Title',
    date: '[PLACEHOLDER] Month Year – Month Year',
    location: '[PLACEHOLDER] City, Country',
    bullets: [
      '[PLACEHOLDER DESCRIPTION] — what you built, shipped, or improved.',
      '[PLACEHOLDER DESCRIPTION] — a metric or impact statement.',
      '[PLACEHOLDER DESCRIPTION] — tech you worked with and what you learned.',
    ],
  },
  {
    company: '[PLACEHOLDER] Company Two',
    role: '[PLACEHOLDER] Role / Internship Title',
    date: '[PLACEHOLDER] Month Year – Month Year',
    location: '[PLACEHOLDER] City, Country',
    bullets: [
      '[PLACEHOLDER DESCRIPTION] — what you built, shipped, or improved.',
      '[PLACEHOLDER DESCRIPTION] — a metric or impact statement.',
      '[PLACEHOLDER DESCRIPTION] — tech you worked with and what you learned.',
    ],
  },
  {
    company: '[PLACEHOLDER] Company Three',
    role: '[PLACEHOLDER] Role / Internship Title',
    date: '[PLACEHOLDER] Month Year – Month Year',
    location: '[PLACEHOLDER] City, Country',
    bullets: [
      '[PLACEHOLDER DESCRIPTION] — what you built, shipped, or improved.',
      '[PLACEHOLDER DESCRIPTION] — a metric or impact statement.',
      '[PLACEHOLDER DESCRIPTION] — tech you worked with and what you learned.',
    ],
  },
];

export const education = [
  {
    school: '[PLACEHOLDER] University One',
    degree: '[PLACEHOLDER] Degree, Field of Study',
    date: '[PLACEHOLDER] Year – Year',
    location: '[PLACEHOLDER] City, Country',
    detail: '[PLACEHOLDER] Focus areas, GPA, relevant coursework.',
  },
  {
    school: '[PLACEHOLDER] University Two',
    degree: '[PLACEHOLDER] Degree, Field of Study',
    date: '[PLACEHOLDER] Year – Year',
    location: '[PLACEHOLDER] City, Country',
    detail: '[PLACEHOLDER] Focus areas, GPA, relevant coursework.',
  },
];

export const certifications = [
  {
    name: '[PLACEHOLDER] Certification One',
    issuer: '[PLACEHOLDER] Issuer Name',
    date: '2025',
    link: 'https://example.com/cert-1',
  },
  {
    name: '[PLACEHOLDER] Certification Two',
    issuer: '[PLACEHOLDER] Issuer Name',
    date: '2024',
    link: 'https://example.com/cert-2',
  },
  {
    name: '[PLACEHOLDER] Certification Three',
    issuer: '[PLACEHOLDER] Issuer Name',
    date: '2024',
    link: 'https://example.com/cert-3',
  },
  {
    name: '[PLACEHOLDER] Certification Four',
    issuer: '[PLACEHOLDER] Issuer Name',
    date: '2023',
    link: 'https://example.com/cert-4',
  },
];

export const achievements = [
  {
    icon: 'trophy',
    title: '[PLACEHOLDER] Achievement One',
    description: '[PLACEHOLDER] Short description of the achievement and its context.',
  },
  {
    icon: 'award',
    title: '[PLACEHOLDER] Achievement Two',
    description: '[PLACEHOLDER] Short description of the achievement and its context.',
  },
  {
    icon: 'star',
    title: '[PLACEHOLDER] Achievement Three',
    description: '[PLACEHOLDER] Short description of the achievement and its context.',
  },
];

// All numbers are [PLACEHOLDER] — update with real ones.
export const stats = [
  { value: 12, suffix: '', label: 'Projects Built' },
  { value: 3, suffix: '', label: 'Internships' },
  { value: 500, suffix: '+', label: 'GitHub Commits' },
  { value: 2, suffix: '', label: 'Years Coding' },
];

// ------------------------------------------------------------
// Terminal content
// ------------------------------------------------------------
export const terminal = {
  prompt: 'raghav@portfolio:~$',
  windowTitle: 'raghav@portfolio: ~',
  // Auto-typed on load, in order.
  bootSequence: ['whoami', 'ls projects/', 'cat about.txt'],
  responses: {
    help: [
      'Available commands:',
      '  help                show available commands',
      '  whoami              who is this guy?',
      '  pwd                 print working directory',
      '  ls                  list directory contents',
      '  ls projects/        list project directories',
      '  tree                display directory tree',
      '  cat about.txt       display about information',
      '  cat skills.txt      display technical skills',
      '  cat experience.txt  display work experience',
      '  cat contact.txt     display contact information',
      '  cat projects.txt    display project summaries',
      '  clear               clear the terminal',
      '  exit                exit terminal',
    ],
    whoami: [
      'Raghav Gupta — CS Student',
      'Delhi, India · [PLACEHOLDER] one-liner about you',
    ],
    pwd: ['/home/raghav/portfolio'],
    ls: [
      'about.txt',
      'skills.txt',
      'experience.txt',
      'contact.txt',
      'projects.txt',
      'projects/',
    ],
    tree: [
      '.',
      '├── about.txt',
      '├── skills.txt',
      '├── experience.txt',
      '├── contact.txt',
      '├── projects.txt',
      '└── projects/',
      '    ├── project-alpha/',
      '    ├── project-beta/',
      '    ├── project-gamma/',
      '    └── project-delta/',
    ],
    'ls projects/': [
      'project-alpha/',
      'project-beta/',
      'project-gamma/',
      'project-delta/',
    ],
    'cat about.txt': [
      '[PLACEHOLDER] A few lines about who you are,',
      '[PLACEHOLDER] what you build, and',
      '[PLACEHOLDER] what you care about.',
    ],
    'cat skills.txt': [
      'Languages   : Python, JavaScript, TypeScript, Java, C++, SQL',
      'Frameworks  : React, Next.js, Node.js, Express, FastAPI',
      'Tools       : Git, Docker, AWS, Linux, PostgreSQL, MongoDB',
      'AI/ML       : PyTorch, TensorFlow, scikit-learn, OpenCV',
    ],
    'cat projects.txt': [
      'project-alpha   [PLACEHOLDER] one-liner about Project Alpha',
      'project-beta    [PLACEHOLDER] one-liner about Project Beta',
      'project-gamma   [PLACEHOLDER] one-liner about Project Gamma',
      'project-delta   [PLACEHOLDER] one-liner about Project Delta',
    ],
    'cat experience.txt': [
      '[PLACEHOLDER] Company One    · [PLACEHOLDER role] · [PLACEHOLDER dates]',
      '[PLACEHOLDER] Company Two    · [PLACEHOLDER role] · [PLACEHOLDER dates]',
      '[PLACEHOLDER] Company Three  · [PLACEHOLDER role] · [PLACEHOLDER dates]',
    ],
    'cat contact.txt': [
      'email    : raghavgupta9348@gmail.com',
      'phone    : +91 9958658622',
      'linkedin : linkedin.com/in/raghhavv93',
      'github   : github.com/placeholder-github',
    ],
    exit: ["Nice try. There's no escaping this portfolio. Type 'help' instead."],
  },
};

// ------------------------------------------------------------
// Keyboard shortcuts (shown in the `?` modal)
// ------------------------------------------------------------
export const shortcuts = [
  { keys: ['H'], action: 'Go to Home' },
  { keys: ['A'], action: 'Go to About' },
  { keys: ['S'], action: 'Go to Skills' },
  { keys: ['P'], action: 'Go to Projects' },
  { keys: ['E'], action: 'Go to Experience' },
  { keys: ['C'], action: 'Go to Contact' },
  { keys: ['T'], action: 'Toggle theme' },
  { keys: ['Ctrl', 'K'], action: 'Command palette' },
  { keys: ['?'], action: 'Show shortcuts' },
  { keys: ['Esc'], action: 'Close modals' },
];

// ------------------------------------------------------------
// SEO
// ------------------------------------------------------------
export const seo = {
  title: 'Raghav Gupta — CS Student',
  // [PLACEHOLDER] keep under 160 chars
  description:
    '[PLACEHOLDER] Portfolio of Raghav Gupta — CS student based in Delhi, India. Replace this with a real 160-character description.',
  url: 'https://placeholder-domain.com', // [PLACEHOLDER] canonical URL
  ogImage: '/images/og-image.png', // [PLACEHOLDER] 1200x630 image
  twitterHandle: '@placeholder', // [PLACEHOLDER]
};
