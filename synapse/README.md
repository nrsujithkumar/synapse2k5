Synapse - The Intelligent Learning Co-pilot

Synapse is not just another LMS; it's an intelligent, responsive, and engaging educational partner designed for the future of learning.

Our vision was to create a platform that actively assists both teachers and students by leveraging the power of AI to automate tedious tasks and provide truly personalized learning support. The entire experience is wrapped in a fluid, beautifully animated interface, making the digital classroom feel intuitive, efficient, and genuinely fun.

Live Demo & Repository

Live Project URL: https://gemini.google.com/share/efb89878b157

GitHub Repository: https://github.com/nrsujithkumar/synapse2k5



Team Name: Code Cosmos

Team Members: 
N R SUJITH KUMAR
S M NADHIM
N SRI VIKRAM REDDY
VISHAL P J

Technology Stack

We chose a modern, scalable, and rapid-development tech stack to bring our ambitious vision to life.

Frontend: React, TypeScript, Vite

Styling: Tailwind CSS

Animations: Framer Motion

Backend & Database: Firebase (Authentication, Firestore, Cloud Functions)

AI Integration: Google Gemini API

Features Implemented

We successfully designed and structured the application to meet the Platinum Level requirements and beyond, with a strong focus on creating a superior user experience and innovative AI-powered features.

Core LMS Functionality (Platinum Rank)

✅ User Authentication (User Story 1): A complete, multi-step registration and login system with support for Email/Password, Google, and GitHub.

✅ Institution-Based System: A core architectural decision to make the platform multi-tenant. Users are scoped to their institution, ensuring students only see relevant courses.

✅ Course Management (User Story 2): Full capability for teachers to create and manage courses for their institution.

✅ Course Enrollment (User Story 3): Students can browse and enroll in courses offered by teachers from their institution.

✅ Assignments & Submissions (User Story 4): The complete loop for teachers to create assignments and for students to submit their work.

✅ Grading System (User Story 5): Backend structure and UI design for teachers to grade assignments and for students to view their performance.

Advanced & Optional Features (Beyond Platinum)

✅ Stunning User Experience:

Animated Prelude: A beautiful, animated entry sequence.

Interactive Landing Page: A fully animated, professional landing page featuring an "Aurora" background, a cursor-following blob, and 3D tilt effects.

Light/Dark Mode: A fully functional, persistent theme toggle that adjusts the entire application's appearance.

✅ AI-Powered X-Factor: The Adaptive Quiz: Our core innovation. A system designed to use the Gemini API to generate quiz questions that adapt in real-time to a student's performance. Correct answers lead to harder questions, while incorrect answers trigger easier, foundational questions.

✅ Multi-Step Onboarding: A professional, multi-step onboarding flow to personalize the user's experience after their first sign-up.

How to Run Locally

Clone the repository:

git clone [YOUR GITHUB REPO LINK HERE]
cd synapse


Install dependencies:

npm install


Set up Firebase:

Create a .env.local file in the root of the project.

Add your Firebase configuration keys to this file:

VITE_FIREBASE_API_KEY="your-key"
VITE_FIREBASE_AUTH_DOMAIN="your-domain"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-bucket"
VITE_FIREBASE_MESSAGING_SENDER_ID="your-id"
VITE_FIREBASE_APP_ID="your-app-id"


Run the development server:

npm run dev