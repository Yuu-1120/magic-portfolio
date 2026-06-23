import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work, Uses, Now } from '@/types';
import { Line, Row, Text } from '@once-ui-system/core';

const person: Person = {
  firstName: 'Selene',
  lastName: 'Yu',
  name: `Selene Yu`,
  role: 'Design Engineer',
  avatar: '/images/avatar.jpg',
  email: 'example@gmail.com',
  location: 'Asia/Jakarta', // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ['English', 'Bahasa'], // optional: Leave the array empty if you don't want to display languages
  locale: 'en' // BCP 47 language tag for the HTML lang attribute, e.g., 'en', 'ja', 'zh-TW'
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: 'GitHub',
    icon: 'github',
    link: 'https://github.com/once-ui-system',
    essential: true
  },
  {
    name: 'LinkedIn',
    icon: 'linkedin',
    link: 'https://www.linkedin.com/company/once-ui/',
    essential: true
  },
  {
    name: 'Instagram',
    icon: 'instagram',
    link: 'https://www.instagram.com/once_ui/',
    essential: false
  },
  {
    name: 'Threads',
    icon: 'threads',
    link: 'https://www.threads.com/@once_ui',
    essential: true
  },
  {
    name: 'Email',
    icon: 'email',
    link: `mailto:${person.email}`,
    essential: true
  }
];

const home: Home = {
  path: '/',
  image: '/images/og/home.jpg',
  label: 'Home',
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Building bridges between design and code</>,
  featured: {
    display: true,
    title: (
      <Row gap='12' vertical='center'>
        <strong className='ml-4'>Once UI</strong> <Line background='brand-alpha-strong' vert height='20' />
        <Text marginRight='4' onBackground='brand-medium'>
          Featured work
        </Text>
      </Row>
    ),
    href: '/work/building-once-ui-a-customizable-design-system'
  },
  subline: (
    <>
      I'm {person.firstName}, a {person.role.toLowerCase()} at{' '}
      <Text as='span' size='xl' weight='strong'>
        ONCE UI
      </Text>
      , where I craft intuitive <br /> user experiences. After hours, I build my own projects.
    </>
  )
};

const about: About = {
  path: '/about',
  label: 'About',
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false
  },
  avatar: {
    display: true
  },
  calendar: {
    display: true,
    link: 'https://cal.com'
  },
  intro: {
    display: true,
    title: 'Introduction',
    description: (
      <>
        {person.firstName} is a {person.location.split('/')[1]?.replace('_', ' ')}-based {person.role.toLowerCase()}{' '}
        with a passion for transforming complex challenges into simple, elegant design solutions. Their work spans
        digital interfaces, interactive experiences, and the convergence of design and technology.
      </>
    )
  },
  work: {
    display: true, // set to false to hide this section
    title: 'Work Experience',
    experiences: [
      {
        company: 'FLY',
        timeframe: '2022 - Present',
        role: 'Senior Design Engineer',
        achievements: [
          <>
            Redesigned the UI/UX for the FLY platform, resulting in a 20% increase in user engagement and 30% faster
            load times.
          </>,
          <>Spearheaded the integration of AI tools into design workflows, enabling designers to iterate 50% faster.</>
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: '/images/projects/project-01/cover-01.jpg',
            alt: 'Once UI Project',
            width: 16,
            height: 9
          }
        ]
      },
      {
        company: 'Creativ3',
        timeframe: '2018 - 2022',
        role: 'Lead Designer',
        achievements: [
          <>
            Developed a design system that unified the brand across multiple platforms, improving design consistency by
            40%.
          </>,
          <>
            Led a cross-functional team to launch a new product line, contributing to a 15% increase in overall company
            revenue.
          </>
        ],
        images: []
      }
    ]
  },
  studies: {
    display: true, // set to false to hide this section
    title: 'Studies',
    institutions: [
      {
        name: 'University of Jakarta',
        description: <>Studied software engineering.</>
      },
      {
        name: 'Build the Future',
        description: <>Studied online marketing and personal branding.</>
      }
    ]
  },
  technical: {
    display: true, // set to false to hide this section
    title: 'Technical skills',
    skills: [
      {
        title: 'Figma',
        description: <>Able to prototype in Figma with Once UI with unnatural speed.</>,
        tags: [
          {
            name: 'Figma',
            icon: 'figma'
          }
        ],
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: '/images/projects/project-01/cover-02.jpg',
            alt: 'Project image',
            width: 16,
            height: 9
          },
          {
            src: '/images/projects/project-01/cover-03.jpg',
            alt: 'Project image',
            width: 16,
            height: 9
          }
        ]
      },
      {
        title: 'Next.js',
        description: <>Building next gen apps with Next.js + Once UI + Supabase.</>,
        tags: [
          {
            name: 'JavaScript',
            icon: 'javascript'
          },
          {
            name: 'Next.js',
            icon: 'nextjs'
          },
          {
            name: 'Supabase',
            icon: 'supabase'
          }
        ],
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: '/images/projects/project-01/cover-04.jpg',
            alt: 'Project image',
            width: 16,
            height: 9
          }
        ]
      }
    ]
  }
};

const blog: Blog = {
  path: '/blog',
  label: 'Blog',
  title: 'Writing about design and tech...',
  description: `Read what ${person.name} has been up to recently`
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: '/work',
  label: 'Work',
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: '/gallery',
  label: 'Gallery',
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: '/images/gallery/horizontal-1.jpg',
      alt: 'image',
      orientation: 'horizontal'
    },
    {
      src: '/images/gallery/vertical-4.jpg',
      alt: 'image',
      orientation: 'vertical'
    },
    {
      src: '/images/gallery/horizontal-3.jpg',
      alt: 'image',
      orientation: 'horizontal'
    },
    {
      src: '/images/gallery/vertical-1.jpg',
      alt: 'image',
      orientation: 'vertical'
    },
    {
      src: '/images/gallery/vertical-2.jpg',
      alt: 'image',
      orientation: 'vertical'
    },
    {
      src: '/images/gallery/horizontal-2.jpg',
      alt: 'image',
      orientation: 'horizontal'
    },
    {
      src: '/images/gallery/horizontal-4.jpg',
      alt: 'image',
      orientation: 'horizontal'
    },
    {
      src: '/images/gallery/vertical-3.jpg',
      alt: 'image',
      orientation: 'vertical'
    }
  ]
};

const uses: Uses = {
  path: '/uses',
  label: 'Uses',
  title: `Uses – ${person.name}`,
  description: `Tools, software, and gear that ${person.name} uses daily`,
  categories: [
    {
      title: 'Hardware',
      display: true,
      items: [
        {
          name: 'MacBook Pro 16"',
          slug: 'macbook-pro-16',
          description: <>M3 Max, 64GB RAM — the daily driver for design and development work.</>,
          icon: 'desktop',
          tags: ['Daily Driver']
        },
        {
          name: 'Apple Studio Display',
          slug: 'apple-studio-display',
          description: <>5K Retina display for pixel-perfect design work and coding side-by-side.</>,
          icon: 'monitor'
        },
        {
          name: 'Keychron Q1 Pro',
          slug: 'keychron-q1-pro',
          description: <>Custom mechanical keyboard with Gateron Oil King switches and PBT keycaps.</>,
          icon: 'keyboard',
          tags: ['Mechanical']
        },
        {
          name: 'Logitech MX Master 3S',
          slug: 'logitech-mx-master-3s',
          description: <>Ergonomic mouse with horizontal scrolling and multi-device support.</>,
          icon: 'mouse'
        },
        {
          name: 'Sony WH-1000XM5',
          slug: 'sony-wh-1000xm5',
          description: <>Noise-canceling headphones for deep focus sessions.</>,
          icon: 'headphones'
        }
      ]
    },
    {
      title: 'Software',
      display: true,
      items: [
        {
          name: 'Cursor',
          slug: 'cursor',
          description: <>AI-powered code editor built on VS Code — the primary development environment.</>,
          icon: 'code',
          link: 'https://cursor.com',
          tags: ['IDE']
        },
        {
          name: 'Figma',
          slug: 'figma',
          description: <>The go-to design tool for UI/UX, prototyping, and design system management.</>,
          icon: 'figma',
          link: 'https://figma.com'
        },
        {
          name: 'Warp',
          slug: 'warp',
          description: <>Modern terminal with AI command search, split panes, and cloud sync.</>,
          icon: 'terminal',
          link: 'https://warp.dev'
        },
        {
          name: 'Arc Browser',
          slug: 'arc-browser',
          description: <>Rethought browser with spaces, boosts, and a clean command bar.</>,
          icon: 'browser',
          link: 'https://arc.net'
        },
        {
          name: 'Raycast',
          slug: 'raycast',
          description: <>Blazingly fast launcher replacing Spotlight — with extensions for everything.</>,
          icon: 'plugin',
          link: 'https://raycast.com',
          tags: ['Productivity']
        }
      ]
    },
    {
      title: 'Design & Creative',
      display: true,
      items: [
        {
          name: 'Adobe Photoshop',
          slug: 'adobe-photoshop',
          description: <>For image editing, compositing, and preparing assets for projects.</>,
          icon: 'paintbrush'
        },
        {
          name: 'Procreate',
          slug: 'procreate',
          description: <>iPad sketching and illustration — great for brainstorming visual ideas.</>,
          icon: 'paintbrush'
        },
        {
          name: 'Framer',
          slug: 'framer',
          description: <>For interactive prototypes and quick landing page experiments.</>,
          icon: 'browser',
          link: 'https://framer.com'
        }
      ]
    }
  ]
};

const now: Now = {
  path: '/now',
  label: 'Now',
  title: `Now – ${person.name}`,
  description: `What ${person.name} is currently working on and interested in`,
  updatedAt: 'June 2026',
  entries: [
    {
      category: 'Building',
      icon: 'code',
      description: (
        <>Working on a portfolio site with Next.js and Once UI — adding new pages and refining the design system.</>
      ),
      status: 'active'
    },
    {
      category: 'Learning',
      icon: 'book',
      description: (
        <>Deep diving into WebGL and shader programming — exploring Three.js and GLSL for creative coding.</>
      ),
      link: 'https://threejs.org',
      status: 'active'
    },
    {
      category: 'Reading',
      icon: 'book',
      description: (
        <>
          "Designing Data-Intensive Applications" by Martin Kleppmann — a thorough exploration of distributed systems.
        </>
      ),
      status: 'active'
    },
    {
      category: 'Exploring',
      icon: 'browser',
      description: (
        <>Experimenting with AI-assisted development workflows — Cursor, GitHub Copilot, and custom MCP servers.</>
      ),
      status: 'active'
    },
    {
      category: 'Designing',
      icon: 'paintbrush',
      description: <>Building a personal design system with Once UI — focusing on typography scale and color tokens.</>,
      status: 'active'
    }
  ]
};

export { person, social, newsletter, home, about, blog, work, gallery, uses, now };
