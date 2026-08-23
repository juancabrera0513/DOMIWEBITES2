const PROJECT_DISPLAY_ORDER = [
  "the-property-cousins",
  "glo-event-co",
  "kaes-kitchen",
  "gaitway-program-hours-platform",
];

export const PROJECTS = [
  {
    id: "kaes-kitchen",
    title: "Kae’s Kitchen",
    category: "Food & Retail",
    description:
      "A warm bakery website that makes custom cakes, desserts, and ordering information easy to explore.",
    challenge:
      "Kae’s Kitchen needed an online home that felt as personal as the bakery while giving customers a clearer path from inspiration to inquiry.",
    solution:
      "We created a welcoming, photo-led website with organized offerings, mobile-friendly navigation, and simple ways to request a custom order.",
    image: "/portfolio/kaes-kitchen-website-design.webp",
    url: "https://kaeskitchen.com/",
    details: [
      "Custom cake and dessert presentation",
      "Photo galleries that highlight the bakery’s work",
      "Clear custom-order inquiry path",
      "Mobile-first layout",
    ],
    goals: [
      "Help customers understand what they can order",
      "Make custom-order inquiries easier",
      "Build trust through real bakery photography",
    ],
    tags: ["Bakery", "Custom Orders", "Gallery", "Mobile Design"],
    location: "St. Louis, MO",
    type: "real",
  },
  {
    id: "glo-event-co",
    title: "Glo Event Co",
    category: "Creative & Events",
    description:
      "A bold event website for photo booths, silent parties, and memorable group experiences.",
    challenge:
      "Glo Event Co needed a website that matched its high-energy events and helped visitors quickly understand the different experiences available.",
    solution:
      "We designed an immersive neon experience with clear service choices, strong calls to action, and a direct path to booking information.",
    image: "/portfolio/glo-event-co-website-design.webp",
    url: "https://www.gloeventco.com/",
    details: [
      "Interactive live website experience",
      "Service pages for event options",
      "Booking-focused calls to action",
      "Responsive design for mobile visitors",
    ],
    goals: [
      "Make each event experience easy to understand",
      "Turn interest into booking conversations",
      "Create a memorable online brand",
    ],
    tags: ["Events", "Photo Booth", "Silent Parties", "Booking"],
    location: "St. Louis, MO",
    type: "real",
  },
  {
    id: "the-property-cousins",
    title: "The Property Cousins",
    category: "Real Estate",
    description:
      "A real estate website redesign with reliable property search, working inquiry paths, and stronger local credibility for buyers and sellers.",
    challenge:
      "The Property Cousins already had a website provided through their broker, but it was not optimized for a dependable client experience. Several links did not work, the contact form was broken, and property listings failed to load, making it harder for buyers and sellers to take the next step.",
    solution:
      "We rebuilt their online presence with a reliable MARIS MLS property search, working navigation and contact forms, detailed listings, team storytelling, client reviews, and clear consultation paths.",
    image: "/portfolio/the-property-cousins-website-screenshot.webp",
    url: "https://www.thepropertycousins.org/",
    details: [
      "Reliable MARIS MLS property search",
      "Individual property detail pages",
      "Working navigation and contact forms",
      "Buyer and seller-focused messaging",
      "Team story, awards, and client reviews",
      "Consultation and contact paths",
      "Responsive design for mobile home searches",
    ],
    goals: [
      "Restore a dependable experience for buyers and sellers",
      "Make active listings consistently accessible",
      "Showcase the team's local expertise and personal approach",
      "Turn property interest into qualified conversations",
    ],
    tags: ["Real Estate", "MLS Search", "Listings", "Lead Generation"],
    location: "Jefferson County & Greater St. Louis, MO",
    type: "real",
  },
  {
    id: "gaitway-program-hours-platform",
    title: "Gaitway Program Hours Platform",
    category: "Custom Business Software",
    description:
      "A custom kiosk and operations platform that replaces paper timesheets and spreadsheet calculations with centralized attendance, scheduling, and reporting.",
    challenge:
      "Gaitway was tracking participant program hours with paper sheets and Excel. Staff then had to combine records and calculate totals manually, creating repetitive administrative work and making reporting harder to prepare.",
    solution:
      "Domi Websites designed and developed a centralized system with kiosk clock-in and clock-out, automatic hour calculations, staff scheduling, and printable participant reports.",
    image: "/portfolio/gaitway/gaitway-participant-kiosk.webp",
    details: [
      "Participant kiosk for clock-in and clock-out",
      "Automatic program-hour calculations",
      "Weekly participant and staff scheduling",
      "Printable participant-hours reports",
      "Centralized records for daily operations",
      "Role-friendly workflows for staff and administrators",
    ],
    goals: [
      "Reduce manual entry and repeated calculations",
      "Give staff a clearer view of schedules and attendance",
      "Make participant-hour reports easier to prepare",
      "Support a growing organization with one shared system",
    ],
    tags: ["Custom Software", "Kiosk", "Scheduling", "Reporting"],
    location: "St. Louis, MO",
    type: "real",
    caseStudy: {
      lead:
        "The platform turns a paper-and-spreadsheet workflow into one connected operational process, from a participant's arrival through the report staff can print later.",
      scale:
        "The platform supports more than 10 staff members and more than 50 participants while keeping attendance, scheduling, and reporting organized in one shared system.",
      scaleTitle: "Built to support a growing organization",
      workflow: [
        {
          title: "Capture time at the source",
          description:
            "Participants use a simple kiosk to clock in and out, so attendance begins as a structured digital record instead of a handwritten entry.",
        },
        {
          title: "Coordinate the week",
          description:
            "Staff can organize participant and team schedules in the same system used for attendance, reducing the need to reconcile separate files.",
        },
        {
          title: "Calculate and report",
          description:
            "Recorded sessions feed automatic hour totals that staff can review by date range and turn into a printable report.",
        },
      ],
      images: [
        {
          src: "/portfolio/gaitway/gaitway-scheduling-dashboard.webp",
          alt: "Weekly scheduling dashboard for the Gaitway program hours platform",
          title: "Scheduling dashboard",
          caption:
            "A weekly view that helps staff coordinate participant activities and team schedules in one place.",
        },
        {
          src: "/portfolio/gaitway/gaitway-participant-hours-report.webp",
          alt: "Printable participant hours report for the Gaitway platform",
          title: "Printable hours report",
          caption:
            "A report view for reviewing automatically calculated participant hours and preparing a printable record.",
        },
      ],
    },
  },
].sort(
  (a, b) =>
    PROJECT_DISPLAY_ORDER.indexOf(a.id) - PROJECT_DISPLAY_ORDER.indexOf(b.id)
);

export const PORTFOLIO_CATEGORIES = [
  "All",
  "Real Estate",
  "Creative & Events",
  "Food & Retail",
  "Custom Business Software",
];
