# MERN Stack Portfolio — Sunny Rohit Gattu

A decoupled, scalable MERN stack portfolio application. The project is divided into a modern React frontend powered by Vite and Tailwind CSS, and a robust Node.js/Express backend connected to a MongoDB cluster.

---

## 👤 About Me

**Sunny Rohit Gattu**  
*Full-Stack Software Engineer & CS Master’s Candidate at Pace University (CGPA: 3.82/4.0)*

*   **Location:** Andhra Pradesh, India
*   **Email:** [sunnyrohit2023@gmail.com](mailto:sunnyrohit2023@gmail.com)
*   **Phone:** +91-6303869123
*   **GitHub:** [iamSunnyrohit](https://github.com/iamSunnyrohit)
*   **LinkedIn:** [sunny-rohit](https://www.linkedin.com/in/sunny-rohit/)

### Technical Skills
*   **Languages:** JavaScript (ES6+), TypeScript, Java, Python, C++, C, Rust, Go
*   **Web Technologies:** React.js, Node.js, Next.js, AngularJS, Express.js, Flask, Django
*   **Databases & Cloud:** MongoDB, MySQL, PostgreSQL, AWS, Firebase
*   **Tools & Workflows:** Git, Docker, REST APIs, JSON, Apple Health Kit, Agile/Scrum, CI/CD

---

## 📁 Project Structure

The codebase is decoupled into two separate packages:

```text
Portfolio/
├── client/             # React (Vite) + Tailwind CSS Frontend
│   ├── public/         # Static assets (Resume PDF, icons)
│   ├── src/
│   │   ├── components/ # Modular layouts (Navbar, Hero, About, Projects, Contact, Footer)
│   │   ├── App.jsx     # Main entry orchestrating state and sections
│   │   └── index.css   # Global Tailwind styles
│   ├── tailwind.config.js
│   └── vite.config.js
└── server/             # Node.js + Express + MongoDB Backend
    ├── models/         # Mongoose Schemas (Project.js)
    ├── .env            # Environment configurations (Port, DB connection string)
    └── server.js       # Main server entry & API routing
```

---

## 🛠️ Portfolio Features

1.  **Modular React Architecture**: The layout is split into specialized sub-components (`Navbar`, `Hero`, `About`, `Projects`, `Contact`, `Footer`).
2.  **Subtle Spotlight LERP Glow**: The Hero section features a custom mouse-tracking radial gradient glow. It utilizes Linear Interpolation (LERP) and a `requestAnimationFrame` render loop to smoothly glide and trail the cursor.
3.  **Sequenced Page Entry Transitions**: Smooth delayed load animations (slide down, fade-in, and slide up) for hero elements configured via Tailwind CSS keyframes.
4.  **Dynamic MongoDB Hydration**: Project records (Title, Description, Category, Tags, Unsplash Image URLs) are served dynamically from your MongoDB Atlas database cluster.
5.  **Direct Resume Viewer**: The "View Resume" button loads the resume PDF directly in the browser's built-in viewer via `target="_blank"`.
6.  **Sleek Dark Theme Styling**: Curated typography utilizing the Google "Inter" font, smooth border tones, custom yellow accents (`#f5e700`), and rounded card structures.

---

## 🚀 Running the Application

### 1. Database Configuration
Create a secure `.env` file inside the `server/` directory:
```env
PORT=5005
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
```
*(Note: Port `5005` is configured to avoid conflicts with macOS AirPlay Receiver which binds to port `5000` by default).*

### 2. Launch the Express Backend
Navigate to the server directory, install dependencies, and run in dev mode:
```bash
cd server
npm install
npm run dev
```

### 3. Seed Initial Projects Data
To seed your portfolio projects from the resume directly into the MongoDB collection, boot the server and navigate to:
```text
http://localhost:5005/api/projects/seed
```
This endpoint will clear and re-initialize the projects collection with your 4 main projects:
*   *Eat and Fit – Fitness Application*
*   *AI Text Detection System*
*   *Supplements E-commerce Platform*
*   *Skin Disease Detection System*

### 4. Launch the React Frontend
Navigate to the client directory, install dependencies, and start the Vite dev server:
```bash
cd client
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view your live portfolio!
