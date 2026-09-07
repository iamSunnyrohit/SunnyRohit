const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Project = require('./models/Project');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const mongoURI = (process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio').trim();

if (mongoURI) {
    mongoose.connect(mongoURI)
        .then(() => console.log('MongoDB Connected Successfully'))
        .catch(err => console.error('Database connection error (falling back to initial data if needed):', err.message));
} else {
    console.warn('No MONGO_URI specified. Server will run with fallback initial projects.');
}

// Initial Portfolio Data
const initialProjects = [
    {
        title: "Eat and Fit – Fitness Application",
        description: "Developed a comprehensive dashboard to visualize caloric intake and workout consistency. Leveraged Apple Health Kit to automate health data synchronization, eliminating manual user entry, and utilized Chart.js for interactive tracking visualizations.",
        category: "HEALTH-TECH",
        tags: ["React.js", "Apple Health Kit", "Chart.js", "Tailwind"],
        imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "AI Text Detection System",
        description: "Engineered a full-stack platform using React.js and Node.js to classify text as AI-generated or human-written. Integrated NLP libraries to identify linguistic patterns and optimized frontend state management for real-time text analysis.",
        category: "NLP / AI",
        tags: ["React.js", "Node.js", "NLP", "Express.js"],
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Supplements E-commerce Platform",
        description: "Architected a MERN stack e-commerce solution featuring dynamic product catalogs and specialized dietary filters. Designed a scalable microservices architecture using Redux to synchronize user carts across sessions, and implemented JWT-based authentication.",
        category: "MERN STACK",
        tags: ["MongoDB", "Express.js", "Redux", "JWT"],
        imageUrl: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Skin Disease Detection System",
        description: "Directed a team of 4 to build a diagnostic system achieving 85% classification accuracy for dermatological conditions. Orchestrated the preprocessing of 10,000+ images using CNN, and developed a Flask-based API for seamless uploads.",
        category: "ML / CNN",
        tags: ["CNN", "TensorFlow", "Flask", "Python"],
        imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
        liveUrl: "https://skin-gaurd-ai.vercel.app/"
    },
    {
        title: "Online Saloon Booking Website",
        description: "A complete MERN stack application for scheduling and managing salon appointments. Features interactive real-time slot bookings, custom services catalogs, secure authentication flow, and user profile management dashboards.",
        category: "MERN STACK",
        tags: ["React.js", "MongoDB", "Express.js", "Node.js"],
        imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
        liveUrl: "https://hair-studio-rouge.vercel.app/"
    },
    {
    title: "RediLite",
    description: "A protocol-compliant, high-concurrency Redis server built from scratch in Java 21. Powered by Virtual Threads for lightweight socket scaling, featuring a zero-dependency streaming RESP2 parser, dual-phase TTL eviction, AOF persistence replay, Pub/Sub channels, and atomic transaction pipelining.",
    category: "Systems & Backend",
    tags: ["Java 21", "Virtual Threads", "RESP2", "Concurrency", "Networking", "Distributed Systems"],
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://github.com/iamSunnyrohit/RediLite"
    },
    {
    title: "CAD-Colab",
    description: "A real-time collaborative CAD viewer and vector design platform featuring concurrent multi-user editing. Utilizes Operational Transformation (OT) algorithms over WebSockets to ensure conflict-free synchronization of geometric primitives, powered by an optimized HTML5/Konva rendering canvas and spatial indexing for low-latency collaboration.",
    category: "Full Stack & Graphics",
    tags: ["React.js", "Node.js", "Socket.IO", "HTML5 Canvas", "Konva.js", "MongoDB"],
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://github.com/iamSunnyrohit/Cad-colab"
    },
    {
    title: "SnapToCode",
    description: "A vision-to-frontend development engine powered by NVIDIA NIM microservices. Transpiles screenshots, mockups, and wireframes into clean React + Tailwind CSS components using multi-model VLM orchestration, sub-3s SSE token streaming, Monaco Editor integration, and real-time in-browser Sandpack execution.",
    category: "AI & Developer Tools",
    tags: ["React.js", "TypeScript", "FastAPI", "NVIDIA NIM", "Tailwind CSS", "Sandpack"],
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://github.com/iamSunnyrohit/SnapToCode"
    },
    {
    title: "ApexC Studio",
    description: "A mobile-native C11 compiler and IDE targeting AArch64 (ARM64) architecture built from scratch. Features a zero-dependency handwritten recursive descent parser, an embedded in-memory AST evaluation engine, AAPCS64-compliant GNU assembly code generation, and a high-performance Jetpack Compose UI integrated via Android NDK/JNI.",
    category: "Compilers & Systems",
    tags: ["C11", "ARM64", "Assembly", "Kotlin", "Jetpack Compose", "Android NDK"],
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://github.com/iamSunnyrohit/ApexC"
    }

];

// API Routes
// Get all projects (auto-seeds if database is empty)
app.get('/api/projects', async (req, res) => {
    try {
        if (mongoose.connection.readyState === 1) {
            let projects = await Project.find();
            if (!projects || projects.length === 0) {
                projects = await Project.insertMany(initialProjects);
            }
            return res.json(projects);
        } else {
            console.warn('MongoDB connection not ready, serving initial projects.');
            return res.json(initialProjects);
        }
    } catch (err) {
        console.error('Error fetching projects from MongoDB, serving fallback data:', err.message);
        res.json(initialProjects);
    }
});

// Seed Initial Portfolio Data (Helper endpoint)
app.post('/api/projects/seed', async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({ error: 'MongoDB is not connected. Check your MONGO_URI in .env.' });
        }
        await Project.deleteMany({});
        const seeded = await Project.insertMany(initialProjects);
        res.json({ message: "Database seeded successfully!", data: seeded });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server running smoothly on port ${PORT}`));
