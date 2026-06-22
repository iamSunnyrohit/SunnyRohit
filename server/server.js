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
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.error('Database connection error:', err));

// API Routes
// Get all projects
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: 'Server Error fetching projects' });
    }
});

// Seed Initial Portfolio Data (Helper endpoint)
app.post('/api/projects/seed', async (req, res) => {
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
            imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Online Saloon Booking Website",
            description: "A complete MERN stack application for scheduling and managing salon appointments. Features interactive real-time slot bookings, custom services catalogs, secure authentication flow, and user profile management dashboards.",
            category: "MERN STACK",
            tags: ["React.js", "MongoDB", "Express.js", "Node.js"],
            imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
            liveUrl: "https://hair-studio-rouge.vercel.app/"
        }
    ];

    try {
        await Project.deleteMany({});
        const seeded = await Project.insertMany(initialProjects);
        res.json({ message: "Database seeded successfully!", data: seeded });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server running smoothly on port ${PORT}`));
