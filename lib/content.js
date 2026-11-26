export const site = {
  name: 'BRYN Technologies',
  title: 'BRYN Technologies | Digital Services & Solutions',
  description:
    'BRYN Technologies provides web and software development, mobile app development, digital marketing, UI/UX and creative design, and AI, automation and IT solutions.',
  ogTitle: 'BRYN Technologies | Digital Services & Solutions',
  ogDescription:
    'Digital solutions for businesses: web and software development, mobile apps, digital marketing, design, AI, automation and IT.',
  themeColor: '#09090B',
};

export const primaryNav = [
  { label: 'Services', href: '/#services' },
  { label: 'What We Do', href: '/#customers' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Docs', href: '/docs' },
  { label: 'Resources', href: '/journal' },
];

export const mobileNav = [
  { label: 'Services', href: '/#services' },
  { label: 'What We Do', href: '/#customers' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Docs', href: '/docs' },
  { label: 'Journal', href: '/journal' },
  { label: 'Careers', href: '/careers' },
];

export const footerColumns = [
  {
    title: 'Explore',
    links: [
      { label: 'Home', href: '/' },
      { label: 'What We Do', href: '/#customers' },
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Connect', href: '/connect' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Web & Software Development', href: '/#services', 'data-svc': 0 },
      { label: 'Mobile App Development', href: '/#services', 'data-svc': 1 },
      { label: 'Digital Marketing', href: '/#services', 'data-svc': 2 },
      { label: 'UI/UX & Creative Design', href: '/#services', 'data-svc': 3 },
      { label: 'AI, Automation & IT Solutions', href: '/#services', 'data-svc': 4 },
    ],
  },
  {
    title: 'Resources',
    links: [{ label: 'FAQs', href: '/#faq' }],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Preferences',
    links: [{ label: 'Cookie settings', href: '#cookie-settings' }],
  },
];

export const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/14tXEkD7DxV/',
  },
  { label: 'X', href: 'https://x.com/BRYNDOTTECH' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/bryn-technologies/',
  },
  { label: 'Instagram', href: 'https://www.instagram.com/bryndottech' },
  { label: 'Email', href: 'mailto:bryndottech@gmail.com' },
];

export const contactSocialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/bryn-technologies/',
  },
  { label: 'Instagram', href: 'https://www.instagram.com/bryndottech' },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/14tXEkD7DxV/',
  },
  { label: 'X', href: 'https://x.com/BRYNDOTTECH' },
];

export const commandPages = [
  { label: 'Home', href: '/', group: 'Page' },
  { label: 'Services', href: '/#services', group: 'Page' },
  { label: 'What We Do', href: '/#customers', group: 'Page' },
  { label: 'Our process', href: '/#approach', group: 'Page' },
  { label: 'About BRYN', href: '/about', group: 'Page' },
  { label: 'Contact', href: '/contact', group: 'Page' },
  { label: 'FAQs', href: '/#faq', group: 'Page' },
  { label: 'Pricing', href: '/pricing', group: 'Page' },
  { label: 'Documentation', href: '/docs', group: 'Page' },
  { label: 'Journal', href: '/journal', group: 'Page' },
  { label: 'Changelog', href: '/changelog', group: 'Page' },
  { label: 'Trust center', href: '/trust', group: 'Page' },
  { label: 'System status', href: '/status', group: 'Page' },
  { label: 'Careers', href: '/careers', group: 'Page' },
  { label: 'Book a demo', href: '/demo', group: 'Page' },
  { label: 'Privacy policy', href: '/privacy', group: 'Page' },
  { label: 'Terms of service', href: '/terms', group: 'Page' },
  { label: 'Services', href: '/#services', group: 'Jump' },
  { label: 'FAQs', href: '/#faq', group: 'Jump' },
];

export const customerSectors = [
  'Logistics',
  'Financial services',
  'Healthcare',
  'Manufacturing',
  'Technology',
  'Public sector',
  'Energy',
  'Retail',
];

export const platformCards = [
  {
    eyebrow: 'Network · sample',
    title: 'Latency you can watch',
    body: 'Global p95 measured at the edge, refreshed every second across 31 regions.',
    kind: 'latency',
  },
  {
    eyebrow: 'Access',
    title: 'Role-based security',
    body: 'Click a cell to change a permission.',
    kind: 'access',
  },
  {
    eyebrow: 'Workflows',
    title: 'Automation as a graph',
    body: 'Trigger, approve, deploy. Every step is traceable.',
    kind: 'graph',
  },
  {
    eyebrow: 'Regions',
    title: 'Local by default',
    body: 'Pin data and compute to the jurisdiction you choose.',
    kind: 'regions',
  },
  {
    eyebrow: 'Audit',
    title: 'Every action, signed',
    body: 'Immutable event stream, exportable to your SIEM.',
    kind: 'audit',
  },
];

export const auditEvents = [
  { time: '14:32:08', event: 'deploy.approved', who: 'm.kowalski' },
  { time: '14:31:54', event: 'policy.updated', who: 's.chen' },
  { time: '14:31:21', event: 'token.rotated', who: 'ci-bot' },
  { time: '14:30:47', event: 'workflow.completed', who: 'j.ortiz' },
  { time: '14:30:12', event: 'login.verified', who: 'm.kowalski' },
];

export const workflowSteps = [
  {
    title: 'Orchestrate',
    body: 'Model any process as a graph. Bryn runs it, retries it and reports on it.',
    panel: 'workflow',
  },
  {
    title: 'Observe',
    body: 'Metrics, traces and cost in one view, tied to the team that owns them.',
    panel: 'observe',
  },
  {
    title: 'Govern',
    body: 'Write policy once. Bryn enforces it on every deploy and every request.',
    panel: 'govern',
  },
];

export const services = [
  {
    title: 'Web & Software Development',
    description:
      'We design and build websites, web applications, eCommerce experiences, WordPress websites and custom software.',
    tags: [
      'Website Development',
      'Web Application Development',
      'eCommerce Development',
      'WordPress Development',
      'Custom Software Development',
    ],
    art: 'browser',
  },
  {
    title: 'Mobile App Development',
    description:
      'We develop mobile applications for Android, iOS and cross-platform requirements.',
    tags: ['Android App Development', 'iOS App Development', 'Cross-platform App Development'],
    art: 'phone',
  },
  {
    title: 'Digital Marketing',
    description:
      'We support digital growth through search, social media, paid campaigns, content and email marketing.',
    tags: [
      'Search Engine Optimization (SEO)',
      'Social Media Marketing',
      'Social Media Management',
      'Paid Advertising',
      'Content Marketing',
      'Email Marketing',
    ],
    art: 'chart',
  },
  {
    title: 'UI/UX & Creative Design',
    description:
      'We create user experiences and visual assets that make digital products and brands clear and consistent.',
    tags: ['UI/UX Design', 'Graphic Design', 'Branding', 'Creative and Visual Design'],
    art: 'design',
  },
  {
    title: 'AI, Automation & IT Solutions',
    description:
      'We help businesses apply AI, automate workflows and maintain dependable technology systems.',
    tags: [
      'AI Chatbot Development',
      'AI Integration',
      'Business Workflow Automation',
      'IT Support',
      'Technical Maintenance',
    ],
    art: 'ai',
  },
];

export const faqs = [
  {
    question: 'What services does BRYN Technologies provide?',
    answer:
      'BRYN offers web and software development, mobile app development, digital marketing, UI/UX and creative design, and AI, automation and IT solutions.',
  },
  {
    question: 'Can I request a custom website or web application?',
    answer:
      'Yes. Share your goals, required features and target audience so the team can understand the scope of your website or application.',
  },
  {
    question: 'Do you develop mobile apps?',
    answer:
      'BRYN offers Android, iOS and cross-platform mobile app development. The right approach depends on your product requirements and users.',
  },
  {
    question: 'Can you help with an existing website or application?',
    answer:
      'You can contact BRYN to discuss improvements, new features, redesigns, maintenance or technical support for an existing digital product.',
  },
  {
    question: 'Do you provide digital marketing services?',
    answer:
      'Services include SEO, social media marketing and management, paid advertising, content marketing and email marketing.',
  },
  {
    question: 'Can you help with AI and automation?',
    answer:
      'BRYN can discuss AI chatbots, AI integrations and business workflow automation based on your use case.',
  },
  {
    question: 'How do I get started?',
    answer:
      'Use the Contact page or email bryndottech@gmail.com with a short description of your project and what you want to achieve.',
  },
];

export const workCards = [
  [
    '01 / WEB',
    'Websites & web applications',
    'Business websites, landing pages, eCommerce stores, customer portals and custom web applications.',
    'Explore web services',
    0,
  ],
  [
    '02 / MOBILE',
    'Mobile experiences',
    'Android, iOS and cross-platform applications planned around your product goals and user needs.',
    'Explore app services',
    1,
  ],
  [
    '03 / GROWTH',
    'Digital marketing',
    'SEO, social media, paid campaigns, content and email marketing to strengthen your digital reach.',
    'Explore marketing',
    2,
  ],
  [
    '04 / DESIGN',
    'Product & brand design',
    'UI/UX, graphic design, visual systems and branding for clear, consistent digital experiences.',
    'Explore design services',
    3,
  ],
  [
    '05 / AUTOMATION',
    'AI & business automation',
    'AI chatbots, integrations and workflow automation that address practical business use cases.',
    'Explore AI & IT services',
    4,
  ],
];

export const processCards = [
  ['01 / DISCOVER', 'Understand the goal', 'We discuss your business, audience, requirements and the problem to solve.'],
  ['02 / PLAN', 'Define the direction', 'We agree on scope, priorities, deliverables and a practical delivery plan.'],
  ['03 / BUILD', 'Design & develop', 'We create the experience, build the solution and review progress with you.'],
  ['04 / IMPROVE', 'Launch & support', 'We prepare for launch and identify useful next steps for maintenance and improvement.'],
];

export const plans = [
  {
    name: 'Team',
    price: 29,
    description: 'For product and engineering teams getting started.',
    features: ['Up to 25 seats', '10 active workflows', 'Community support', '7-day audit log'],
  },
  {
    name: 'Business',
    price: 79,
    description: 'For companies running critical operations.',
    features: [
      'Unlimited workflows',
      'SSO and SCIM provisioning',
      'Priority support',
      '1-year audit log',
      'Region pinning',
    ],
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 0,
    description: 'For regulated, global organizations.',
    features: ['Dedicated cloud', '99.99% uptime SLA', '24/7 support', 'SIEM export', 'Security review'],
  },
];

export const comparison = [
  ['Active workflows', '10', 'Unlimited', 'Unlimited'],
  ['SSO and SCIM', '–', '✓', '✓'],
  ['Audit log retention', '7 days', '1 year', 'Custom'],
  ['Region pinning', '–', '✓', '✓'],
  ['SIEM export', '–', '–', '✓'],
  ['Uptime SLA', '–', '99.9%', '99.99%'],
  ['Support', 'Community', 'Priority', '24/7 dedicated'],
];

export const pricingFaqs = [
  {
    question: 'Is there a free trial?',
    answer: 'Yes. Every plan includes a 14-day trial with full features. No credit card needed.',
  },
  {
    question: 'Can we change plans later?',
    answer: 'Anytime. Upgrades apply immediately and downgrades apply at the next billing date.',
  },
  {
    question: 'Do you offer discounts?',
    answer:
      'Annual billing saves 20%. Startups, nonprofits and education teams qualify for additional discounts.',
  },
  {
    question: 'How is studio work priced?',
    answer:
      'Web, app and marketing projects are scoped as fixed-price engagements or monthly retainers.',
  },
];

export const docsSections = [
  {
    heading: 'Getting started',
    items: [
      { key: 'intro', label: 'Introduction' },
      { key: 'quick', label: 'Quickstart' },
      { key: 'auth', label: 'Authentication' },
    ],
  },
  {
    heading: 'Platform',
    items: [
      { key: 'wf', label: 'Workflows' },
      { key: 'pol', label: 'Policies' },
    ],
  },
  {
    heading: 'API',
    items: [
      { key: 'api', label: 'REST reference' },
      { key: 'hook', label: 'Webhooks' },
    ],
  },
];

export const docsContent = {
  intro: {
    title: 'Introduction',
    body: 'Bryn runs, observes and governs operational workflows. Everything in the dashboard is available through the API and CLI.',
    samples: {
      Shell: 'npm i -g @bryn/cli\nbryn login --sso',
    },
  },
  quick: {
    title: 'Quickstart',
    body: 'List your workflows in under a minute. Create an API key in Settings, then run a request.',
    samples: {
      cURL: 'curl https://api.bryn.com/v1/workflows -H "Authorization: Bearer $BRYN_KEY"',
      Node: "import Bryn from '@bryn/sdk'\nconst bryn = new Bryn(process.env.BRYN_KEY)\nconst list = await bryn.workflows.list()",
      Python: 'from bryn import Bryn\nclient = Bryn(api_key=KEY)\nprint(client.workflows.list())',
    },
  },
  auth: {
    title: 'Authentication',
    body: 'Authenticate with a bearer token. Keys are scoped to a workspace and can be rotated without downtime.',
    samples: {
      cURL: 'curl https://api.bryn.com/v1/me -H "Authorization: Bearer $BRYN_KEY"',
    },
  },
  wf: {
    title: 'Workflows',
    body: 'A workflow is a graph of triggers, approvals and actions. Define it in YAML or the visual editor.',
    samples: {
      YAML: 'name: release\ntriggers: [merge]\nsteps:\n  - test\n  - approve: 2\n  - deploy: production',
    },
  },
  pol: {
    title: 'Policies',
    body: 'Policies are rules enforced on every deploy and request. Simulate a change before you enforce it.',
    samples: {
      Shell: 'bryn policy simulate ./policies/prod.yaml\nbryn policy enforce ./policies/prod.yaml',
    },
  },
  api: {
    title: 'REST reference',
    body: 'The API is versioned, JSON-based and rate-limited to 1,000 requests per minute per workspace.',
    samples: {
      cURL: 'POST /v1/workflows/{id}/runs\nGET  /v1/runs/{id}\nGET  /v1/audit?since=2026-11-01',
    },
  },
  hook: {
    title: 'Webhooks',
    body: 'Subscribe to run, policy and audit events. Every delivery is signed and retried with exponential backoff.',
    samples: {
      JSON: '{\n  "type": "run.completed",\n  "id": "evt_8f2a",\n  "data": { "workflow": "release", "status": "success" }\n}',
    },
  },
};

export const journalPosts = [
  {
    category: 'Engineering',
    title: 'How we cut p95 latency to 12ms across 31 regions',
    date: 'Nov 12, 2026',
    read: '8 min',
    excerpt:
      'A tour of the routing, caching and connection-reuse changes that took our global p95 from 41ms to 12ms.',
    takeaways: ['Measure at the edge, not the origin', 'Reuse connections aggressively', 'Budget latency per hop'],
  },
  {
    category: 'Product',
    title: 'Release 4.2: policy simulations and faster rollouts',
    date: 'Nov 3, 2026',
    read: '5 min',
    excerpt:
      'See the effect of any rule change before it ships, and roll out to regions in parallel.',
    takeaways: ['Simulate before you enforce', 'Roll out region by region', 'Undo in one click'],
  },
  {
    category: 'Security',
    title: 'What a SOC 2 Type II audit really tests',
    date: 'Oct 21, 2026',
    read: '7 min',
    excerpt:
      'Type I checks that controls exist. Type II checks that they worked for months. Here’s what that means in practice.',
    takeaways: ['Evidence beats policy documents', 'Automate the boring controls', 'Treat the audit as a product review'],
  },
  {
    category: 'Studio',
    title: 'Designing a mobile app that works on a plane',
    date: 'Oct 9, 2026',
    read: '6 min',
    excerpt:
      'Offline-first patterns we use when building iOS and Android apps for field teams.',
    takeaways: ['Queue every write locally', 'Resolve conflicts predictably', 'Show sync state honestly'],
  },
  {
    category: 'Growth',
    title: 'SEO for enterprise: measure revenue, not rankings',
    date: 'Sep 28, 2026',
    read: '6 min',
    excerpt:
      'How we tie organic search work to pipeline so it survives the budget review.',
    takeaways: ['Map keywords to deal stages', 'Fix crawl and speed first', 'Report on revenue weekly'],
  },
  {
    category: 'Company',
    title: 'Why we’re remote-first with real offices',
    date: 'Sep 14, 2026',
    read: '4 min',
    excerpt: 'What we learned running a distributed company across 19 countries.',
    takeaways: ['Write things down', 'Meet in person quarterly', 'Hire for ownership'],
  },
];

export const journalCategories = ['All', 'Engineering', 'Product', 'Security', 'Studio', 'Growth', 'Company'];

export const changelog = [
  {
    version: '4.2',
    date: 'Nov 18, 2026',
    items: [
      ['New', 'Policy simulations preview every rule change before it ships.'],
      ['New', 'Command menu across the dashboard. Press Cmd or Ctrl + K.'],
      ['Improved', 'Workflow runs start 38% faster.'],
      ['Fixed', 'Audit exports no longer time out above 10M events.'],
    ],
  },
  {
    version: '4.1',
    date: 'Oct 6, 2026',
    items: [
      ['New', 'Region pinning for data and compute.'],
      ['Improved', 'SSO now supports Microsoft Entra conditional access.'],
      ['Fixed', 'Webhook retries respect custom backoff.'],
    ],
  },
  {
    version: '4.0',
    date: 'Aug 24, 2026',
    items: [
      ['New', 'Bryn Studio: web, app and marketing delivery on the platform.'],
      ['New', 'Role-based access matrix editor.'],
      ['Improved', 'Dashboard loads in under 900ms globally.'],
    ],
  },
  {
    version: '3.9',
    date: 'Jul 2, 2026',
    items: [
      ['New', 'SIEM export to Splunk and Datadog.'],
      ['Improved', 'Audit log search is 5x faster.'],
      ['Fixed', 'Rare duplicate approvals on slow networks.'],
    ],
  },
];

export const changelogFilters = ['All', 'New', 'Improved', 'Fixed'];

export const roles = [
  ['Senior Platform Engineer', 'Engineering', 'San Francisco, hybrid', 'Build the orchestration engine behind every Bryn workflow.'],
  ['Staff Frontend Engineer', 'Engineering', 'Remote, US', 'Own the design system and web platforms we build for clients.'],
  ['iOS and Android Engineer', 'Engineering', 'Remote, worldwide', 'Ship native mobile apps with offline-first architecture.'],
  ['Product Designer', 'Design', 'San Francisco, hybrid', 'Design dense, calm interfaces for enterprise operators.'],
  ['Brand and Motion Designer', 'Design', 'Remote, worldwide', 'Shape how Bryn looks, moves and sounds across every channel.'],
  ['Performance Marketing Lead', 'Marketing', 'New York, hybrid', 'Run paid and lifecycle programs tied directly to revenue.'],
  ['SEO and Content Strategist', 'Marketing', 'Remote, US', 'Grow qualified organic demand for us and our clients.'],
  ['Enterprise Account Executive', 'Sales', 'Austin, hybrid', 'Sell Bryn and studio engagements to Fortune 1000 teams.'],
].map(([title, department, location, description]) => ({ title, department, location, description }));

export const departments = ['All', 'Engineering', 'Design', 'Marketing', 'Sales'];

export const benefits = [
  ['Equity for everyone', 'Every teammate owns part of what we build.'],
  ['Remote-first', 'Work from anywhere in 19 countries. Offices in SF and NYC are optional.'],
  ['Learning budget', '$4,000 a year for courses, conferences and books.'],
  ['Health and family', 'Full medical, dental and vision, plus 16 weeks of parental leave.'],
  ['Real ownership', 'Small teams that ship to production in week one.'],
  ['Quarterly offsites', 'Four times a year, the whole company meets in person.'],
];

export const trustPillars = [
  ['SOC 2 Type II', 'Audited annually across security, availability and confidentiality.'],
  ['ISO 27001', 'Certified information security management system.'],
  ['GDPR and CCPA', 'Data processing addendum and regional data pinning.'],
  ['Annual pen tests', 'Independent testers, with summaries available on request.'],
  ['Encryption everywhere', 'TLS 1.3 in transit and AES-256 at rest.'],
  ['Zero standing access', 'Production access is time-boxed, approved and logged.'],
];

export const controls = [
  ['Access control', 'SSO with SAML and OIDC, SCIM provisioning, role-based permissions and mandatory MFA for staff.'],
  ['Infrastructure', 'Hardened cloud environments, network isolation per tenant tier and immutable deployments.'],
  ['Data residency', 'Pin data and compute to US, EU or APAC regions with documented failover.'],
  ['Incident response', '24/7 on-call, a documented runbook and customer notification within 72 hours of a confirmed incident.'],
  ['Vulnerability management', 'Continuous scanning, a 30-day patch SLA for high severity issues and a public disclosure channel.'],
];

export const subprocessors = [
  ['Amazon Web Services', 'Cloud hosting', 'US, EU, APAC'],
  ['Cloudflare', 'Edge network and DDoS protection', 'Global'],
  ['Datadog', 'Observability', 'US'],
  ['Stripe', 'Payments', 'US'],
  ['Postmark', 'Transactional email', 'US'],
];

export const statusComponents = ['API', 'Dashboard', 'Workflow engine', 'Webhooks', 'Audit stream', 'Edge network'];

export const incidents = [
  ['Nov 9', 'Elevated webhook latency', 'Resolved in 18 minutes. A queue backlog in us-east was drained and capacity raised.'],
  ['Oct 14', 'Delayed audit exports', 'Resolved in 42 minutes. Exports above 10M events were re-queued automatically.'],
  ['Sep 2', 'Dashboard sign-in errors for some SSO users', 'Resolved in 26 minutes after an identity provider certificate rotation.'],
];

export const privacySections = [
  ['Information we collect', 'Account details, usage data and device information needed to run the service and keep it secure.'],
  ['How we use it', 'To provide and improve Bryn, support customers, prevent abuse and meet legal obligations.'],
  ['Sharing and subprocessors', 'We share data only with vendors listed in our trust center and when required by law. We do not sell personal information.'],
  ['Cookies', 'Essential cookies run the site. Analytics and marketing cookies are optional and controlled by your cookie settings.'],
  ['Your rights', 'Depending on where you live, including California and the EU, you can access, correct, delete or export your data, and opt out of sharing. Email privacy@bryn.com.'],
  ['Retention and security', 'We keep data only as long as needed and protect it with encryption and access controls.'],
];

export const termsSections = [
  ['Acceptance', 'By using Bryn you agree to these terms on behalf of yourself or your organization.'],
  ['Accounts', 'Keep credentials secure. You are responsible for activity under your workspace.'],
  ['Acceptable use', 'Do not misuse the service, attempt to breach it or use it to violate the law.'],
  ['Fees', 'Fees are billed in advance and non-refundable except where required by law.'],
  ['Intellectual property', 'You own your data. Bryn owns the platform. We grant you a limited right to use it.'],
  ['Liability', 'The service is provided as is, and our liability is limited to fees paid in the prior 12 months.'],
  ['Governing law', 'These terms are governed by the laws of the State of California, USA.'],
];

export const integrations = ['Okta', 'Slack', 'GitHub', 'Datadog', 'Splunk', 'AWS', 'Jira', 'Snowflake'];

export const terminalLines = [
  ['$', 'npm i -g @bryn/cli'],
  ['', '✓ installed bryn 4.2.0'],
  ['$', 'bryn login --sso okta'],
  ['', '✓ signed in as m.chen'],
  ['$', 'bryn deploy ./checkout --region us-east'],
  ['', '→ policy check passed (4 of 4)'],
  ['', '→ rolled out to 3 regions in 11.8s'],
  ['', '✓ live at checkout.northwind.app'],
];

export const caseStudy = {
  quote:
    '“We retired nine internal tools in a quarter. Bryn gave every team the same source of truth, and our auditors finally had one place to look.”',
  initials: 'MK',
  name: 'Maya Kowalski',
  role: 'Chief Operating Officer, Northwind Logistics',
  metrics: [
    ['63%', 'faster release cycles'],
    ['$4.1M', 'annual tooling savings'],
    ['0', 'audit findings, 2 years'],
  ],
};

export const aboutValues = [
  ['Understand first', 'Start with the business problem and the people who will use the solution.'],
  [
    'Build with purpose',
    'Choose tools and features that fit the requirements rather than adding complexity.',
  ],
  [
    'Keep improving',
    'Make room for feedback, refinement and ongoing technical improvement.',
  ],
];

export const contactTopics = ['Project enquiry', 'Service question', 'Collaboration', 'Other'];

export const contactChannels = [
  [
    'General enquiries & projects',
    'bryndottech@gmail.com',
    'For project enquiries, service questions and collaborations.',
  ],
];

export const demoSteps = [
  ['Pick a time', 'Choose a slot that suits your team. All times are Pacific.'],
  ['Tell us the goal', 'We prepare a walkthrough around your use case.'],
  ['Get a written plan', 'Scope, timeline and pricing within 48 hours.'],
];

export const demoDays = 5;
export const demoTimes = ['9:00 AM', '10:30 AM', '1:00 PM', '3:30 PM'];
export const demoSizes = ['1–50', '51–250', '251–1,000', '1,000+'];

export const careersStats = [
  ['120+', 'people across 19 countries'],
  ['4', 'disciplines: platform, web, app, growth'],
  ['5 days', 'from application to first reply'],
  ['100%', 'of teammates hold equity'],
];
