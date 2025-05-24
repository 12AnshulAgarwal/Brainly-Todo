# Brainly - Your Second Brain for Digital Content

[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Built with TypeScript](https://img.shields.io/badge/Built%20with-TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

A modern, full-stack content management application that helps you save, organize, and rediscover your favorite YouTube videos and Twitter posts. Never lose track of valuable digital content again!

## 🌟 Features

- **📺 YouTube Integration**: Save YouTube videos with embedded previews
- **🐦 Twitter Support**: Bookmark important tweets and threads
- **🔐 User Authentication**: Secure signup/signin with JWT tokens
- **📱 Responsive Design**: Beautiful, modern UI that works on all devices
- **🔗 Content Sharing**: Generate shareable links for your curated content
- **⚡ Real-time Updates**: Fast and responsive user experience
- **🎨 Modern UI**: Built with Tailwind CSS and custom components

## 🏗️ Architecture

This project consists of two main parts:

### Frontend (`Brainly-Frontend/`)
- **Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS v4 with PostCSS
- **Routing**: React Router DOM v7
- **Icons**: FontAwesome icons
- **Build Tool**: Vite
- **Linting**: ESLint with TypeScript support

### Backend (`Brainly/`)
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with bcrypt password hashing
- **CORS**: Enabled for cross-origin requests

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB instance (local or cloud)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Week\ 15-Brainly
   ```

2. **Backend Setup**
   ```bash
   cd Brainly
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../Brainly-Frontend
   npm install
   ```

### Environment Configuration

Create a `.env` file in the `Brainly/` directory:

```env
MONGO_URI=mongodb://localhost:27017/brainly
SECRET_KEY=your-jwt-secret-key-here
PORT=3000
```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd Brainly
   npm run dev
   ```
   Server will run on `http://localhost:3000`

2. **Start the Frontend Development Server**
   ```bash
   cd Brainly-Frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
Week 15-Brainly/
├── Brainly/                          # Backend application
│   ├── src/
│   │   ├── index.ts                  # Main server file with API routes
│   │   ├── db.ts                     # Database models and connection
│   │   ├── middleware.ts             # Authentication middleware
│   │   └── utils.ts                  # Utility functions
│   ├── package.json
│   └── tsconfig.json
│
├── Brainly-Frontend/                 # Frontend application
│   ├── src/
│   │   ├── pages/                    # Page components
│   │   │   ├── LandingPage.tsx       # Homepage
│   │   │   ├── Signin.tsx            # Login page
│   │   │   ├── Signup.tsx            # Registration page
│   │   │   └── Dashboard.tsx         # Main dashboard
│   │   ├── components/               # Reusable components
│   │   │   └── ui/                   # UI components
│   │   │       ├── Card.tsx          # Content cards
│   │   │       ├── Sidebar.tsx       # Navigation sidebar
│   │   │       ├── Navbar.tsx        # Top navigation
│   │   │       ├── button.tsx        # Custom buttons
│   │   │       ├── Input.tsx         # Form inputs
│   │   │       └── CreateContentModal.tsx
│   │   ├── icons/                    # Custom SVG icons
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── config.ts                 # Configuration constants
│   │   ├── App.tsx                   # Main app component
│   │   └── main.tsx                  # Application entry point
│   ├── public/                       # Static assets
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── index.html
```

## 🛠️ API Endpoints

### Authentication
- `POST /api/v1/signup` - Create new user account
- `POST /api/v1/signin` - User login

### Content Management
- `GET /api/v1/content` - Get user's saved content
- `POST /api/v1/content` - Add new content (YouTube/Twitter)
- `DELETE /api/v1/content/:contentId` - Delete specific content

### Sharing
- `POST /api/v1/share` - Generate/manage shareable links
- `GET /api/v1/brain/:shareLink` - Access shared content collections

## 🗄️ Database Schema

### User Model
```typescript
{
  name: String (unique),
  password: String (hashed),
  email: String
}
```

### Content Model
```typescript
{
  type: String,           // "youtube" | "twitter"
  title: String,
  link: String,
  tags: [ObjectId],       // References to Tag documents
  userId: ObjectId        // Reference to User
}
```

### Link Model
```typescript
{
  hash: String,           // Unique sharing identifier
  userId: ObjectId        // Reference to User
}
```

## 🎨 UI Components

The application features a comprehensive set of reusable UI components:

- **Navigation**: Responsive sidebar and top navbar
- **Content Cards**: Elegant display for saved content with previews
- **Forms**: Custom input components with validation
- **Buttons**: Various button variants (primary, secondary, sizes)
- **Modals**: Create content modal with form handling

## 🔧 Development

### Available Scripts

**Backend:**
- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Run production build
- `npm run dev` - Development mode (build + start)

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Code Quality

- **TypeScript**: Full type safety across the application
- **ESLint**: Configured with React and TypeScript rules
- **Consistent Styling**: Tailwind CSS for utility-first styling

## 🚀 Deployment

### Backend Deployment
1. Set environment variables in production
2. Build the TypeScript code: `npm run build`
3. Start the server: `npm start`

### Frontend Deployment
1. Build the production bundle: `npm run build`
2. Serve the `dist/` folder using a static file server

### Environment Variables for Production
```env
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/brainly
SECRET_KEY=your-production-jwt-secret
PORT=3000
NODE_ENV=production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:

1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Provide steps to reproduce any bugs

## 🔮 Future Enhancements

- [ ] Add support for more content types (Instagram, LinkedIn)
- [ ] Implement advanced search and filtering
- [ ] Add collaborative features
- [ ] Mobile app development
- [ ] Content recommendations
- [ ] Export functionality
- [ ] Bulk operations

---

Built with ❤️ using React, TypeScript, Express.js, and MongoDB. 