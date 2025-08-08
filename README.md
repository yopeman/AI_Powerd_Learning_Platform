# AI-Powered Learning Platform (AiPLP)

This comprehensive platform integrates multiple components to form a complete educational ecosystem. Below is a detailed breakdown of the project structure:

## Project Overview

The platform consists of four main applications:

### 1. Express Backend Server (`Express/`)

A Node.js/Express API server responsible for all backend operations, including:

- **Authentication & Authorization**: JWT-based authentication with role-based access (admin, assistant, student).
- **Database Models**: MySQL/Sequelize models for managing users, fields, courses, chapters, topics, subscriptions, payments, and more.
- **AI Integration**: Utilizes OpenAI and Google GenAI for generating educational content and answering questions.
- **Payment Processing**: Integrates Chapa payment gateway for handling course payments.
- **Certification System**: Facilitates quiz generation and certificate creation.
- **File Management**: Organizes and stores generated content and responses in structured directories.

### 2. Expo Mobile App (`Expo/`)

A React Native mobile application for students, featuring:

- **Cross-Platform Support**: Compatible with both iOS and Android.
- **Navigation**: Includes tab, stack, and drawer navigation tailored for different user roles.
- **Learning Interface**: Enables browsing of fields, courses, chapters, and topics.
- **Interactive Learning**: AI-powered responses to user questions about topics.
- **Payment Integration**: In-app processing for premium content purchases.
- **Certification**: Offers quizzes and downloadable certificates.
- **Theme Support**: Dark/light mode and customizable text sizes.
- **Offline Caching**: Utilizes AsyncStorage for offline data access.

### 3. Admin Dashboard (`React/admin-dashboard/`)

A React web application designed for administrators to:

- **User Management**: Create, read, update, and delete user accounts.
- **Content Management**: Oversee fields, courses, chapters, and topics.
- **Assistant Assignment**: Allocate teaching assistants to specific fields.
- **Analytics**: Access comprehensive analytics across platform metrics.
- **Payment Management**: Monitor transactions and set pricing.
- **Feedback Management**: Review user feedback and ratings.
- **Certificate Management**: Track certification outcomes.

### 4. Assistant Dashboard (`React/assistant-dashboard/`)

A React web application for teaching assistants to:

- **Content Creation**: Develop and manage courses, chapters, and topics for assigned fields.
- **Field Management**: Access and organize content for assigned fields.
- **Educational Content**: Structure curriculum by year, semester, and chapters.

## Key Features

- **Multi-Role System**: Three distinct user roles with varying permissions and interfaces.
- **AI-Powered Content**: Automatic generation of educational materials and Q&A responses.
- **Freemium Model**: Free access to certain topics with premium content available for purchase.
- **Certification System**: AI-generated quizzes accompanied by downloadable certificates.
- **Payment Integration**: Secure processing through the Chapa payment gateway.
- **Responsive Design**: Mobile-first design ensures cross-platform compatibility.
- **Real-Time Learning**: Interactive Q&A system featuring AI tutoring.
- **Progress Tracking**: Tools for monitoring learning progress and completion rates.
- **Analytics Dashboard**: Detailed metrics provided for administrators.

## Technology Stack

- **Backend**: Node.js, Express, Sequelize ORM, MySQL
- **Mobile**: React Native, Expo, React Navigation
- **Web**: React, React Router
- **AI**: OpenAI GPT-4, Google GenAI
- **Payments**: Chapa payment gateway
- **Authentication**: JWT tokens with role-based access
- **Storage**: AsyncStorage (mobile), LocalStorage (web)
- **File System**: Organized content storage using markdown files

---

The AiPLP creates a robust educational ecosystem where administrators manage the system, assistants develop content, and students enjoy an engaging mobile learning experience enhanced by AI assistance.
