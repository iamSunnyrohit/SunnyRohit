export const initialProjectsData = [
  {
    id: "redilite",
    title: "RediLite",
    description: "A protocol-compliant, high-concurrency Redis server built from scratch in Java 21 powered by Virtual Threads.",
    longDescription: "RediLite is a custom high-performance Redis engine implementing the RESP2 wire protocol. Designed for ultra-high throughput and concurrent TCP connections using Java 21 Virtual Threads (Project Loom), it features custom memory eviction algorithms, dual-phase TTL cleanup, AOF (Append-Only File) crash-recovery persistence, Pub/Sub event channels, and atomic pipeline execution.",
    category: "Systems & Backend",
    tags: ["Java 21", "Virtual Threads", "RESP2", "Concurrency", "Networking", "Distributed Systems"],
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://github.com/iamSunnyrohit/RediLite",
    githubUrl: "https://github.com/iamSunnyrohit/RediLite",
    featured: true,
    architectureHighlights: [
      "Zero-dependency custom RESP2 binary streaming parser",
      "Java 21 Virtual Threads for lightweight 100k+ concurrent socket handling",
      "Atomic transactional multi-command execution & Pub/Sub broker engine",
      "AOF persistence engine with log replaying & background rewrite"
    ]
  },
  {
    id: "apexc-studio",
    title: "ApexC Studio",
    description: "Mobile-native C11 compiler & IDE targeting AArch64 (ARM64) architecture built from scratch.",
    longDescription: "ApexC Studio is a full C11 compiler and mobile development IDE crafted to compile native ARM64 assembly directly on target hardware. Includes a handwritten recursive descent lexer/parser, an in-memory abstract syntax tree (AST) evaluator, AAPCS64-compliant code generator, and a Jetpack Compose frontend linked via JNI/NDK.",
    category: "Compilers & Systems",
    tags: ["C11", "ARM64", "Assembly", "Kotlin", "Jetpack Compose", "Android NDK"],
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://github.com/iamSunnyrohit/ApexC",
    githubUrl: "https://github.com/iamSunnyrohit/ApexC",
    featured: true,
    architectureHighlights: [
      "Zero-dependency handwritten recursive descent parser for C11 subset",
      "Direct AAPCS64 GNU assembly generation & register allocation",
      "High-performance Jetpack Compose UI integrated with Android NDK/JNI",
      "Real-time syntax highlighting, AST visualizer & execution terminal"
    ]
  },
  {
    id: "snaptocode",
    title: "SnapToCode",
    description: "Vision-to-frontend engine transpiling wireframes into production React components via NVIDIA NIM.",
    longDescription: "SnapToCode transforms UI designs, screenshots, and hand-drawn wireframes into production-ready React + Tailwind CSS code within seconds. Uses multi-model VLM orchestration powered by NVIDIA NIM microservices, sub-3s Server-Sent Events (SSE) code streaming, interactive Monaco Editor preview, and in-browser Sandpack execution.",
    category: "AI & Developer Tools",
    tags: ["React.js", "TypeScript", "FastAPI", "NVIDIA NIM", "Tailwind CSS", "Sandpack"],
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://github.com/iamSunnyrohit/SnapToCode",
    githubUrl: "https://github.com/iamSunnyrohit/SnapToCode",
    featured: true,
    architectureHighlights: [
      "Multi-VLM vision processing pipeline using NVIDIA NIM APIs",
      "Sub-3 second streaming response via Server-Sent Events (SSE)",
      "Live component sandbox rendering powered by Sandpack & Monaco Editor",
      "Exportable React component bundles with Tailwind CSS utility mappings"
    ]
  },
  {
    id: "cad-colab",
    title: "CAD-Colab",
    description: "Real-time collaborative CAD viewer and vector design platform with multi-user editing.",
    longDescription: "CAD-Colab brings real-time Figma-like collaborative CAD vector editing to the web browser. Driven by Operational Transformation (OT) synchronization algorithms over WebSockets, it prevents editing conflicts during simultaneous multi-user modifications of 2D/3D geometry primitives over a Konva.js HTML5 canvas.",
    category: "Full Stack & Graphics",
    tags: ["React.js", "Node.js", "Socket.IO", "HTML5 Canvas", "Konva.js", "MongoDB"],
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://github.com/iamSunnyrohit/Cad-colab",
    githubUrl: "https://github.com/iamSunnyrohit/Cad-colab",
    featured: true,
    architectureHighlights: [
      "Operational Transformation (OT) conflict resolution over WebSockets",
      "High-speed 60FPS vector canvas rendering with Konva.js",
      "Spatial indexing for rapid object selection & collision handling",
      "Multi-tenant room persistence with MongoDB backings"
    ]
  },
  {
    id: "skin-disease-detection",
    title: "Skin Disease Detection System",
    description: "Diagnostic CNN system achieving 85% accuracy across dermatological conditions.",
    longDescription: "A deep learning diagnostic solution for dermatological screening. Processed and augmented 10,000+ clinical skin lesion images using Convolutional Neural Networks (CNNs) in TensorFlow, exposing a low-latency Flask inference microservice with an intuitive patient reporting frontend.",
    category: "ML / CNN",
    tags: ["CNN", "TensorFlow", "Flask", "Python", "Computer Vision"],
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://skin-gaurd-ai.vercel.app/",
    githubUrl: "https://github.com/iamSunnyrohit",
    featured: false,
    architectureHighlights: [
      "85% classification accuracy across diverse skin lesion datasets",
      "Data pipeline processing 10,000+ clinical images with augmentation",
      "RESTful Flask microservice for high-throughput image inference",
      "Responsive patient upload & confidence score UI dashboard"
    ]
  },
  {
    id: "saloon-booking",
    title: "Online Saloon Booking Website",
    description: "Full-stack MERN platform for real-time salon appointment scheduling & management.",
    longDescription: "An end-to-end appointment scheduling solution for salons and spas. Provides interactive real-time slot selection, dynamic service pricing catalogs, secure JWT user authentication, SMS/email reminders, and administrative shop management control panels.",
    category: "MERN Stack",
    tags: ["React.js", "MongoDB", "Express.js", "Node.js", "Tailwind CSS"],
    imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://hair-studio-rouge.vercel.app/",
    githubUrl: "https://github.com/iamSunnyrohit",
    featured: false,
    architectureHighlights: [
      "Real-time calendar slot reservation preventing double booking",
      "Dynamic service matrix & custom stylist allocation",
      "Secure JWT-based role authentication (Client / Owner / Admin)",
      "Automated appointment status updates & dashboard metrics"
    ]
  },
  {
    id: "eat-and-fit",
    title: "Eat and Fit – Fitness Application",
    description: "Comprehensive health dashboard visualizing nutritional intake & workout metrics.",
    longDescription: "Eat and Fit syncs directly with Apple HealthKit to automate activity data capture without manual user input. Features interactive Chart.js nutrition analytics, macro-nutrient breakdown graphs, workout target tracking, and tailored meal planning recommendations.",
    category: "Health-Tech",
    tags: ["React.js", "Apple Health Kit", "Chart.js", "Tailwind CSS"],
    imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://github.com/iamSunnyrohit",
    githubUrl: "https://github.com/iamSunnyrohit",
    featured: false,
    architectureHighlights: [
      "Automated Apple HealthKit telemetry data synchronization",
      "Interactive Chart.js visualizations for calories, macros & workouts",
      "Client-side dietary targets calculator and goal tracking",
      "Responsive fitness log & streak tracking view"
    ]
  },
  {
    id: "ai-text-detection",
    title: "AI Text Detection System",
    description: "Full-stack NLP platform classifying text as AI-generated vs human-written.",
    longDescription: "An AI detection tool built to analyze text perplexity, burstiness, and linguistic patterns. Uses NLP token analysis libraries and custom statistical heuristics to classify content authenticity in real time with high accuracy.",
    category: "NLP / AI",
    tags: ["React.js", "Node.js", "NLP", "Express.js", "Python"],
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://github.com/iamSunnyrohit",
    githubUrl: "https://github.com/iamSunnyrohit",
    featured: false,
    architectureHighlights: [
      "Real-time linguistic pattern & perplexity score calculation",
      "N-gram statistical analysis for burstiness detection",
      "Fast API response layer with streamlined frontend state management",
      "Detailed highlighted breakdown of flagged text fragments"
    ]
  },
  {
    id: "supplements-ecommerce",
    title: "Supplements E-commerce Platform",
    description: "Full-stack MERN e-commerce solution with dynamic product catalogs & Redux state.",
    longDescription: "A specialized fitness store web app built with React, Redux Toolkit, Node.js, and MongoDB. Features advanced search and dietary filters (vegan, keto, gluten-free), shopping cart persistence, JWT authentication, and administrative inventory management.",
    category: "MERN Stack",
    tags: ["MongoDB", "Express.js", "React.js", "Node.js", "Redux", "JWT"],
    imageUrl: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://github.com/iamSunnyrohit",
    githubUrl: "https://github.com/iamSunnyrohit",
    featured: false,
    architectureHighlights: [
      "Redux Toolkit state management for shopping cart & user sessions",
      "Multi-faceted dietary & brand filter engine",
      "JWT auth pipeline with protected checkout workflows",
      "Optimized product gallery with image caching"
    ]
  }
];

export default initialProjectsData;
