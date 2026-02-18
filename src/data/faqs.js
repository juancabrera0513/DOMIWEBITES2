
export const faqsCommon = [
    { q: "How fast can we launch?", a: "Most sites are ready within 72 hours once we have your content (logo, text and images). Larger scopes take 7–14 days." },
    { q: "Do you provide hosting & domain?", a: "We can set up modern hosting/CDN and connect your domain. If you already have hosting, we can deploy there too." },
    { q: "Is SEO included?", a: "Yes. On-page SEO (structure, titles, meta, headings, internal links) and JSON-LD schema for key pages. Local SEO is available in plans." },
    { q: "Do you write the copy?", a: "We help polish and structure your copy. We can also draft initial copy based on a short questionnaire." },
    { q: "How many revisions do I get?", a: "Two rounds are included in build packages. Small text/image tweaks are free inside Care Plans." },
    { q: "What’s a Care Plan?", a: "Monthly updates, backups, security checks, speed monitoring and small content edits. It keeps your site safe and fast." },
    { q: "Do I get analytics?", a: "Yes. GA4 + Tag Manager with key events so you know where leads/sales come from." },
    { q: "Who owns the website?", a: "You. We deliver source code and connect everything to your accounts (domain, hosting, analytics)." }
  ];
  
  
  
  export const faqsEcom = [
    { q: "Can you build e-commerce?", a: "Yes. We set up product pages, cart/checkout and payments. We optimize speed and UX to increase conversion." },
    { q: "Do you configure taxes & shipping?", a: "We set up payment gateways, basic taxes and shipping rules as part of the initial scope." }
  ];
  
  export const faqsBilingualSeo = [
    { q: "Do you make bilingual sites (EN/ES)?", a: "Yes. We install i18n so you can switch languages easily and grow in English and Spanish." },
    { q: "Will this help SEO?", a: "Yes. Properly structured bilingual sites can rank for both languages and locations." }
  ];
  
  export const allFaqs = [...faqsCommon, ...faqsPricing, ...faqsEcom, ...faqsBilingualSeo];
  
  export const faqsByCategory = {
    "General": [
      ...faqsCommon
    ],
    "Pricing": [
      ...faqsPricing
    ],
    "E-commerce": [
      ...faqsEcom
    ],
    "Bilingual & SEO": [
      ...faqsBilingualSeo
    ],
    "Care Plans": [
      { q: "What exactly is a Care Plan?", a: "Monthly maintenance that covers updates, backups, security checks, speed monitoring and small content edits." },
      { q: "Can I cancel anytime?", a: "Yes, it’s month-to-month. We recommend staying on a plan to keep your site safe and fast." }
    ]
  };
  