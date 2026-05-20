import { Project, Service, Testimonial, ProcessStep, WhyChooseFactor } from "./types";

export const SERVICES_DATA: Service[] = [
  {
    id: "residential",
    title: "Residential Interiors",
    description: "Designing bespoke living spaces, penthouses, and private estates that synthesize personal expression with functional elegance.",
    iconName: "Home",
    details: [
      "Custom Spatial Arrangements",
      "Bespoke Furniture Selection",
      "Art & Decor Curation",
      "Lighting & Acoustic Engineering"
    ]
  },
  {
    id: "commercial",
    title: "Commercial Spaces",
    description: "Creating prestigious offices, boutique retail lounges, and high-end hospitality venues that embody brand ethos.",
    iconName: "Briefcase",
    details: [
      "Brand-aligned Workplace Design",
      "Ergonomic Space Optimization",
      "Bespoke Reception & Boardrooms",
      "Acoustic & Material Consulting"
    ]
  },
  {
    id: "kitchens",
    title: "Modular Kitchens",
    description: "Sculpting master culinary hubs with seamless German hardware, integrated appliances, and premium natural stone finishes.",
    iconName: "ChefHat",
    details: [
      "Monolithic Stone Island Design",
      "Fully Integrated Appliances",
      "Smart Soft-close Drawer Systems",
      "Premium Matte & Veneer Textures",
    ]
  },
  {
    id: "bedrooms",
    title: "Luxury Bedrooms",
    description: "Crafting quiet-luxury sleeping chambers that evoke the serenity of 5-star resort suites, utilizing raw textures.",
    iconName: "Bed",
    details: [
      "Low-profile Custom Platform Beds",
      "Integrated Layered LED Lighting",
      "Acoustic Fabric Accent Wall Paneling",
      "Bespoke Built-in Walk-in Wardrobes"
    ]
  },
  {
    id: "planning",
    title: "Space Planning",
    description: "Architectural blueprint layout reviews to maximize floor-plan flow, daylight angles, and spatial volume efficacy.",
    iconName: "Compass",
    details: [
      "Sunlight Orientation Analysis",
      "Sightline & Privacy Mapping",
      "Structural Barrier Recommendations",
      "Circulation Flow Auditing"
    ]
  },
  {
    id: "visualization",
    title: "3D Visualization",
    description: "Pre-visualizing designs with cinematic render views and immersive VR fly-throughs before construction begins.",
    iconName: "Layers",
    details: [
      "Photo-Realistic Ray-Traced Renders",
      "Material and Texture Simulations",
      "Ambient Lighting Studies",
      "360-Degree Interactive VR Walks"
    ]
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "living-room-01",
    title: "The Travertine Lounge",
    category: "Living Room",
    image: "/src/assets/images/hero_interior_1779263324243.png",
    beforeImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200",
    location: "Beverly Hills, CA",
    year: "2025",
    description: "A double-height living room featuring custom plaster finishes, travertine furniture, and floor-to-ceiling glass highlighting soft morning light.",
    size: "1,200 sq. ft."
  },
  {
    id: "kitchen-01",
    title: "Monolithic Slate & Stone Kitchen",
    category: "Kitchen",
    image: "/src/assets/images/kitchen_interior_1779263345290.png",
    beforeImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200",
    location: "Tribeca, NY",
    year: "2026",
    description: "A premium kitchen built around a massive travertine monolith island, integrated matte charcoal cabinetry, and architectural lighting accents.",
    size: "650 sq. ft."
  },
  {
    id: "bedroom-01",
    title: "Resort Bedroom Suite",
    category: "Bedroom",
    image: "/src/assets/images/bedroom_interior_1779263367088.png",
    beforeImage: "https://images.unsplash.com/photo-1464890100898-a385f744067f?auto=format&fit=crop&q=80&w=1200",
    location: "Malibu, CA",
    year: "2024",
    description: "A master suite focusing on natural oak wood joinery, organic linen textures, and direct architectural alignment with ocean breeze elements.",
    size: "800 sq. ft."
  },
  {
    id: "villa-01",
    title: "The Horizon Concrete Villa",
    category: "Luxury Villa",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
    beforeImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200",
    location: "Santorini, Greece",
    year: "2025",
    description: "A stunning seaside villa synthesis where exposed concrete frame forms blend dynamically with Mediterranean horizons and warm wood louvers.",
    size: "4,500 sq. ft."
  },
  {
    id: "office-01",
    title: "Aether Headquarters Executive Suite",
    category: "Office",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    location: "London, UK",
    year: "2024",
    description: "An understated, acoustically-isolated workplace oasis for executives, pairing wireframed steel structures with lush timber ceilings.",
    size: "1,800 sq. ft."
  },
  {
    id: "living-room-02",
    title: "The Japandi Penthouse",
    category: "Living Room",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200",
    location: "Tokyo, Japan",
    year: "2025",
    description: "A fusion of Scandinavian functionality and Japanese rustic minimalism, curated with washi paper lamps and light oak wall moldings.",
    size: "1,450 sq. ft."
  }
];

export const PROCESS_DATA: ProcessStep[] = [
  {
    step: "01",
    title: "Curation & Consultation",
    description: "We host an immersive listening session, discovering your lifestyle habits, material affinities, and atmospheric goals.",
    duration: "Week 01",
    detailText: "We outline the initial project charter, establish timeline objectives, and align budget boundaries to create a transparent, elegant execution strategy."
  },
  {
    step: "02",
    title: "Spatial Planning",
    description: "Drafting ergonomic paths and volumetric flow options to ensure the spaces are highly optimized before structural selections occur.",
    duration: "Weeks 02 - 04",
    detailText: "Through meticulous physical modeling and blueprint studies, we coordinate traffic flow, light entry optimization, and sightlines to generate intuitive floor layouts."
  },
  {
    step: "03",
    title: "Sensory Design & 3D Renderings",
    description: "Curating a physical tray of raw materials alongside ray-traced digital visuals of identical illumination conditions.",
    duration: "Weeks 05 - 08",
    detailText: "We specify genuine travertine, bespoke veneers, bouclé textile ranges, and present photo-realistic visuals. You will understand precisely how light operates within your future rooms."
  },
  {
    step: "04",
    title: "Artisanal Execution",
    description: "Coordinating with our vetted structural engineers and master carpenters to build bespoke casework with absolute millimeter precision.",
    duration: "Weeks 09 - 18",
    detailText: "We take full charge on-site. Aura's dedicated project directors supervise construction milestones, hardware alignments, and lighting integrations, removing all friction from your plate."
  },
  {
    step: "05",
    title: "Styling & Handover",
    description: "The cinematic reveal. Our design leads personally place final artwork, lifestyle design decorations, and ambient scent nodes.",
    duration: "Week 19",
    detailText: "We present you with the key to a synthesized, immaculate home, completely outfitted, styled, and ready for calm dwelling."
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "t1",
    name: "Genevieve Montgomery",
    role: "Collector & Curator",
    location: "Bel Air, CA",
    quote: "Aura Interiors did not just design a structure; they captured the atmospheric stillness I’ve searched for. Walking into this living space feels like deep breathing. There is an absolute poetry in how the sunlight aligns with the textured walls.",
    rating: 5
  },
  {
    id: "t2",
    name: "Marcus Sterling",
    role: "Managing Director",
    location: "Tribeca Penthouse",
    quote: "Their focus on custom timber joinery and raw travertine monoliths sets them lightyears apart. Working with them was zero friction; they coordinated the contracting teams directly and delivered a flawless product ahead of schedule.",
    rating: 5
  },
  {
    id: "t3",
    name: "Sian Thorne",
    role: "Founder, Muse Gallery",
    location: "Kensington, London",
    quote: "Aura understands how objects and people relate in space. Every sightline is incredibly balanced, and the materials are sustainable yet incredibly luxury. Our guests are consistently stunned by the acoustics and minimal beauty.",
    rating: 5
  }
];

export const CHOOSE_FACTORS: WhyChooseFactor[] = [
  {
    id: "custom",
    title: "Signature Custom Design",
    description: "We completely reject flat templates. Every cabinet contour, travertine surface chamfer, and linear layout is uniquely drafted around your day-to-day habits.",
    iconName: "PenTool"
  },
  {
    id: "materials",
    title: "Curation of Elite Materials",
    description: "We source real travertine blocks from Italian quarries, premium Belgian linens, and authentic white-oak veneers directly to secure sustainable beauty.",
    iconName: "Gem"
  },
  {
    id: "delivery",
    title: "Millimeter Precision Delivery",
    description: "Our projects utilize double-verification tolerances down to +/- 1mm, guaranteeing that custom modular joints slide smoothly and align beautifully.",
    iconName: "Maximize2"
  },
  {
    id: "expert",
    title: "World-Class Designers",
    description: "Our design panel has received multiple accolades in spatial planning, and we operate as senior architectural advisors on spatial aesthetics.",
    iconName: "Compass"
  },
  {
    id: "end",
    title: "Obsessive End-to-End Control",
    description: "From structural permissions to placing the final coffee-table sculpture, Aura supervises all logistics, engineering, and styling so your calendar stays pristine.",
    iconName: "ShieldCheck"
  }
];
