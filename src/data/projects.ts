import type { Project, ProjectCategoryOption } from '@/models'

export const projectCategories: ProjectCategoryOption[] = [
  { value: 'all', label: 'All' },
  { value: 'ai', label: 'AI & ML' },
  { value: 'gis', label: 'GIS' },
  { value: 'platform', label: 'Web platforms' },
  { value: 'systems', label: 'Backend systems' },
  { value: 'research', label: 'Research' },
]

// Every fact below comes from the CV. Add detail here only when it is true.
export const projects: Project[] = [
  {
    slug: 'tt-bot',
    title: 'TT Bot — AI travel assistant',
    category: 'ai',
    summary:
      'An AI-powered module for the Tripturbo e-commerce platform, enabling search, price comparison and activity recommendations for domestic flights and bus services.',
    organization: 'Pathway Technologies and Services',
    role: 'Developer',
    domain: 'Travel e-commerce',
    tags: ['AI & ML', 'LangChain', 'Travel'],
    stack: ['LangChain', 'LangGraph', 'PGVector'],
    featured: true,
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'TT Bot is a module of the Tripturbo e-commerce platform. It brings AI-powered search, price comparison and activity recommendations to domestic flights and bus services.',
        ],
      },
      {
        heading: 'What I built',
        paragraphs: [
          'I developed the TT Bot module using LangChain and LangGraph, with PGVector as the vector database behind it.',
        ],
        bullets: [
          'AI-powered search across domestic flights and bus services',
          'Price comparison',
          'Activity recommendations',
        ],
      },
    ],
  },
  {
    slug: 'crop-health-consultation',
    title: 'Real-time crop health consultation',
    category: 'ai',
    summary:
      'A real-time consultation system that pairs an AI-powered chatbot with expert review workflows, using WebSockets for live communication.',
    organization: 'Pathway Technologies and Services',
    role: 'Architect & developer',
    domain: 'Agriculture',
    tags: ['AI & ML', 'Real-time', 'WebSockets'],
    stack: ['Django Channels', 'WebSockets', 'Celery'],
    featured: true,
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'A real-time crop health consultation system that combines an AI-powered chatbot with expert review workflows.',
        ],
      },
      {
        heading: 'What I built',
        paragraphs: ['I architected and developed the system.'],
      },
      {
        heading: 'How it works',
        bullets: [
          'Django Channels provides WebSocket-based live communication.',
          'Celery handles asynchronous task processing.',
          'An AI-powered chatbot works alongside expert review workflows.',
        ],
      },
    ],
  },
  {
    slug: 'airline-api-integration',
    title: 'International airline API integration',
    category: 'systems',
    summary:
      'Multiple international airline APIs integrated through an adapter-based orchestration architecture, with a circuit breaker for fault tolerance.',
    organization: 'Pathway Technologies and Services',
    role: 'Developer',
    domain: 'Air travel',
    tags: ['Backend systems', 'Integrations', 'Sabre GDS'],
    stack: ['Adapter-based orchestration', 'Circuit breaker pattern', 'Sabre GDS'],
    featured: true,
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'I integrated multiple international airline APIs: Indigo, Air India, Jazeera, Fly Dubai and Sabre GDS.',
        ],
      },
      {
        heading: 'How it works',
        bullets: [
          'An adapter-based orchestration architecture brings the different airline APIs together.',
          'A circuit breaker pattern implementation provides fault tolerance and service reliability.',
        ],
      },
    ],
  },
  {
    slug: 'price-prediction',
    title: 'Agricultural price prediction',
    category: 'ai',
    summary:
      'Real-time and forecasted market prices for farmers across Koshi Province, powered by machine learning models with 80% prediction accuracy.',
    organization: 'Pathway Technologies and Services',
    role: 'Developer',
    domain: 'Agriculture',
    tags: ['AI & ML', 'Forecasting', 'Django'],
    stack: ['Machine learning', 'Django'],
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'An agricultural product price prediction system that gives farmers real-time and forecasted market prices across Koshi Province.',
        ],
      },
      {
        heading: 'What I built',
        paragraphs: [
          'I developed the system, combining machine learning models with a Django backend.',
        ],
      },
      {
        heading: 'Outcome',
        paragraphs: ['The prediction models reach 80% prediction accuracy.'],
      },
    ],
  },
  {
    slug: 'gis-land-inventory',
    title: 'GIS land inventory & socio-economic survey',
    category: 'gis',
    summary:
      'A GIS-based land inventory and socio-economic survey platform for hilly regions of Nepal, built from scratch.',
    organization: 'Pathway Technologies and Services',
    role: 'Co-lead',
    domain: 'Land & survey',
    tags: ['GIS', 'Geospatial', 'Survey'],
    stack: ['GIS', 'Geospatial data collection & analysis'],
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'A platform for land inventory and socio-economic surveys covering hilly regions in Nepal.',
        ],
      },
      {
        heading: 'What I built',
        paragraphs: [
          'I co-led development of the platform from scratch, integrating geospatial data collection and analysis.',
        ],
      },
    ],
  },
  {
    slug: 'gis-performance',
    title: 'GIS map performance optimisation',
    category: 'gis',
    summary:
      'Faster map rendering for a tablet-based Android application slowed down by large-scale farmer location data.',
    organization: 'Pathway Technologies and Services',
    role: 'Developer',
    domain: 'Agriculture',
    tags: ['GIS', 'Performance', 'Caching'],
    stack: ['Database query optimisation', 'Caching'],
    sections: [
      {
        heading: 'The problem',
        paragraphs: [
          'A tablet-based Android application struggled with slow map rendering because of large-scale farmer location data.',
        ],
      },
      {
        heading: 'What I did',
        paragraphs: ['I optimised the GIS service behind the app:'],
        bullets: ['Database query optimisation', 'Caching strategies'],
      },
      {
        heading: 'Outcome',
        paragraphs: ['Map load times went down.'],
      },
    ],
  },
  {
    slug: 'seed-import-permit',
    title: 'Seed import permit system',
    category: 'platform',
    summary:
      'An online seed import permit application system with payment integration, replacing a legacy paper-based process.',
    organization: 'Pathway Technologies and Services',
    role: 'Developer',
    domain: 'Agriculture',
    tags: ['Web platforms', 'Payments', 'Workflow'],
    stack: ['Online payment integration'],
    sections: [
      {
        heading: 'Overview',
        paragraphs: ['Seed import permits used to go through legacy paper-based processes.'],
      },
      {
        heading: 'What I built',
        paragraphs: [
          'I built an online application system for seed import permits, with online payment integration.',
        ],
      },
      {
        heading: 'Outcome',
        paragraphs: ['Digitising the workflow replaced the paperwork and reduced processing time.'],
      },
    ],
  },
  {
    slug: 'seed-certification-qr',
    title: 'QR-based seed certification tracking',
    category: 'platform',
    summary:
      'A QR-based system that tracks the entire seed certification lifecycle, from field inspections to farmer delivery.',
    organization: 'Pathway Technologies and Services',
    role: 'Designer & developer',
    domain: 'Agriculture',
    tags: ['Web platforms', 'QR', 'Tracking'],
    stack: ['QR codes'],
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'Seed certification runs from field inspections all the way to delivery to farmers. This system tracks that entire lifecycle.',
        ],
      },
      {
        heading: 'What I built',
        paragraphs: [
          'I designed and implemented the QR-based tracking system used to monitor each stage of certification.',
        ],
      },
    ],
  },
  {
    slug: 'crop-notification-system',
    title: 'Crop-aware group notification system',
    category: 'systems',
    summary:
      'Scheduled alerts for large farmer groups, with intelligent batching and filtering that reduce redundant notifications.',
    organization: 'Pathway Technologies and Services',
    role: 'Designer & developer',
    domain: 'Agriculture',
    tags: ['Backend systems', 'Notifications', 'Scheduling'],
    stack: ['Scheduled alerts', 'Batching & filtering'],
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'A crop-aware, group-based notification system that delivers scheduled alerts to large groups of farmers.',
        ],
      },
      {
        heading: 'What I built',
        paragraphs: [
          'I designed and optimised the system, using intelligent batching and filtering to decide what reaches each group.',
        ],
      },
      {
        heading: 'Outcome',
        paragraphs: ['Less notification redundancy and better user engagement.'],
      },
    ],
  },
  {
    slug: 'malaria-xai-thesis',
    title: 'Explainable AI for malaria diagnosis (MSc thesis)',
    category: 'research',
    summary:
      'A two-stage deep-learning pipeline that detects malaria parasites in thin blood smear images and classifies them by Plasmodium species, with Grad-CAM, Grad-CAM++, LIME and SHAP explanations at both stages.',
    organization: 'IOE Pulchowk Campus, Tribhuvan University',
    role: 'Researcher (MSc thesis)',
    domain: 'Medical imaging',
    tags: ['Research', 'Deep learning', 'Explainable AI'],
    stack: [
      'Python',
      'PyTorch',
      'YOLOv8',
      'EfficientNet-B0',
      'SpinalNet',
      'WGAN-GP',
      'Grad-CAM',
      'LIME',
      'SHAP',
    ],
    links: [
      {
        label: 'Read the paper',
        url: 'https://www.nepjol.info/index.php/JACEM/article/view/93926',
      },
      {
        label: 'DOI 10.3126/jacem.v12i01.93926',
        url: 'https://doi.org/10.3126/jacem.v12i01.93926',
      },
    ],
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'My MSc thesis in Data Science and Analytics at IOE Pulchowk Campus, "Multi-Stage Malaria Parasite Classification in Thin Blood Smears: An Explainable AI (XAI)-Guided CNN Approach", supervised by Assoc. Prof. Dr. Sanjeeb Prasad Panday.',
          'The aim was a diagnostic aid that is both accurate and transparent: it finds parasites, names the species, and shows clinicians why it made each call.',
        ],
      },
      {
        heading: 'The problem',
        paragraphs: [
          'Parasites are tiny and rare. In the detection data, healthy red blood cells outnumbered parasites 69 to 1, and rare species such as P. ovale and P. malariae are heavily under-represented, so ordinary models default to the majority class. A "black box" prediction is also hard for a clinician to trust.',
        ],
      },
      {
        heading: 'How it works',
        bullets: [
          'Preprocessing: bilateral filtering, then CLAHE on the lightness channel to bring out faint parasites.',
          'Detection: YOLOv5NU, YOLOv8N and YOLO11N compared on the IML and MBB datasets, trained with a class-aware oversampling dataloader to counter the 69:1 imbalance.',
          'Balancing: a WGAN-GP generated synthetic images of the minority species, growing the training set to 14,305 images while the validation and test sets stayed real.',
          'Classification: a custom CNN and an ImageNet-pretrained EfficientNet-B0, each with a SpinalNet head, classify detected parasites into four Plasmodium species (MP-IDB dataset).',
          'Explainability: Grad-CAM, Grad-CAM++, LIME and SHAP applied at both the detection and the classification stage.',
        ],
      },
      {
        heading: 'Results',
        bullets: [
          'YOLOv8N was the best detector: mAP@0.5 of 0.959, parasite AP of 0.940 and F1 of 0.93.',
          'EfficientNet-B0 + SpinalNet reached 97% accuracy on the real-image test set.',
          'The custom CNN + SpinalNet reached 96% accuracy and 0.94 macro recall, with 100% recall on the rare P. ovale and P. malariae test images.',
          "The explanation maps showed the models focusing on real biology, such as enlarged host cells and Schüffner's dots for P. vivax, rather than background artefacts. A clinical laboratory specialist at Patan Academy of Health Sciences reviewed these findings.",
        ],
      },
      {
        heading: 'Publication',
        paragraphs: [
          'The classification work was published as "Malaria Parasite Classification in Thin Blood Smears Based on CNN with SpinalNet and GAN" in the Journal of Advanced College of Engineering and Management, Vol. 12, No. 01 (2026), pp. 131–149.',
        ],
      },
    ],
  },
]
