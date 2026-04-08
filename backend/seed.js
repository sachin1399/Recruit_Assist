import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "./models/question-model.js";

dotenv.config();

const questions = [
  // FRONTEND
  {
    topic: "frontend",
    question: "How does the Virtual DOM work in React?",
    answer: "React maintains a virtual representation of the UI in memory. When state changes, it creates a new virtual DOM, compares it with the previous one (diffing), and calculates the most efficient way to update the real DOM.",
    difficulty: "Medium"
  },
  {
    topic: "frontend",
    question: "Explain CSS Specificity.",
    answer: "Specificity is the set of rules used by browsers to determine which CSS property values are most relevant to an element. It follows a hierarchy: Inline styles > IDs > Classes/Attributes > Elements.",
    difficulty: "Medium"
  },
  // MERN STACK
  {
    topic: "mern",
    question: "What is the role of Middleware in Express.js?",
    answer: "Middleware functions have access to the request object (req), response object (res), and the next middleware function. They can execute code, modify request/response objects, and end the request-response cycle.",
    difficulty: "Medium"
  },
  {
    topic: "mern",
    question: "How does Mongoose manage relationships between collections?",
    answer: "Mongoose uses 'Population' (via .populate()) to reference documents in other collections. It allows you to define a field as an ObjectId and link it to another model's schema.",
    difficulty: "Hard"
  },
  // JAVA FULL STACK
  {
    topic: "java",
    question: "What is Spring Boot and why is it used?",
    answer: "Spring Boot is an extension of the Spring framework that simplifies the initial setup and development of new Spring applications. It uses 'Convention over Configuration' and provides embedded servers like Tomcat.",
    difficulty: "Easy"
  },
  {
    topic: "java",
    question: "Explain Hibernate's Lazy Loading.",
    answer: "Lazy Loading is a design pattern which delays the initialization of an object until the point at which it is needed. In Hibernate, it prevents loading nested objects from the database until they are explicitly accessed.",
    difficulty: "Hard"
  },
  // APP DEVELOPMENT
  {
    topic: "app developer",
    question: "What is the difference between Flutter and React Native?",
    answer: "Flutter uses the Dart language and compiles to native code directly with its own rendering engine. React Native uses JavaScript/React and relies on native bridges to communicate with mobile OS components.",
    difficulty: "Medium"
  },
  {
    topic: "app developer",
    question: "What are Android Activity Lifecycle methods?",
    answer: "The primary methods are onCreate(), onStart(), onResume(), onPause(), onStop(), onDestroy(), and onRestart(). They manage the state of an app from start to finish.",
    difficulty: "Medium"
  },
  // WEB DEVELOPMENT (GENERAL/ARCHITECTURE)
  {
    topic: "web development",
    question: "Explain JWT (JSON Web Token) Authentication flow.",
    answer: "1. User logs in. 2. Server creates a signed JWT. 3. Client stores JWT (e.g., localStorage). 4. Request includes JWT in Authorization header. 5. Server verifies signature and grants access.",
    difficulty: "Hard"
  },
  {
    topic: "web development",
    question: "What is a RESTful API?",
    answer: "REST (Representational State Transfer) is an architectural style for distributed systems. It uses HTTP methods (GET, POST, PUT, DELETE) and is stateless, meaning each request contains all necessary information.",
    difficulty: "Easy"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for seeding...");
    
    await Question.deleteMany({});
    console.log("Cleared existing questions.");
    
    await Question.insertMany(questions);
    console.log("Sample questions seeded successfully!");
    
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
