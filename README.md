# Project Management Tool

A modern, minimalist full-stack MERN web application for efficient project and task management.

## Features

- **User Authentication**: Secure registration and login with password hashing
- **Dashboard**: Overview of projects, tasks, and completion rate
- **Project Management**: Create, update, and delete projects
- **Task Tracking**: Manage tasks with status, priority, and assignment
- **Analytics**: Visual representation of task statistics
- **User Profiles**: Account information and settings
- **Collaboration**: Team-based project management

## Tech Stack

### Frontend
- React 18.2
- React Router for navigation
- Axios for API communication
- Modern CSS with responsive design

### Backend
- Node.js with Express.js
- JWT for authentication
- bcryptjs for password hashing
- JSON file storage (data.json)

## Project Structure

```
Project Management Tool/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── projectRoutes.js
│   │   └── taskRoutes.js
│   ├── data.json
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── pages/
    │   │   ├── LoginPage.js
    │   │   ├── RegisterPage.js
    │   │   ├── DashboardPage.js
    │   │   ├── ProjectsPage.js
    │   │   ├── ProjectDetailPage.js
    │   │   └── ProfilePage.js
    │   ├── components/
    │   │   └── Navbar.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── api/
    │   │   └── api.js
    │   ├── styles/
    │   │   ├── global.css
    │   │   ├── auth.css
    │   │   ├── navbar.css
    │   │   ├── dashboard.css
    │   │   ├── projects.css
    │   │   ├── project-detail.css
    │   │   └── profile.css
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will open at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires auth)

### Projects
- `POST /api/projects` - Create a new project
- `GET /api/projects` - Get all user projects
- `GET /api/projects/:projectId` - Get project details
- `PUT /api/projects/:projectId` - Update project
- `DELETE /api/projects/:projectId` - Delete project

### Tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/project/:projectId` - Get all tasks for a project
- `PUT /api/tasks/:taskId` - Update task
- `DELETE /api/tasks/:taskId` - Delete task

## Design Highlights

### Modern Minimalist Design
- Clean, intuitive user interface
- Consistent color scheme and typography
- Smooth animations and transitions
- Card-based layout for better organization
- Responsive design for all screen sizes

### Key UI Components
- **Navigation Bar**: Quick access to all main sections
- **Dashboard**: Overview with key metrics
- **Project Cards**: Easy project management
- **Task Board**: Kanban-style task organization
- **Status Badges**: Visual task status indicators
- **Priority Indicators**: Quick priority recognition

## Sample Data

The application uses `data.json` for storing users, projects, and tasks. Initial data structure:

```json
{
  "users": [],
  "projects": [],
  "tasks": []
}
```

## Getting Started

1. **Register**: Create a new account on the registration page
2. **Create Project**: Navigate to Projects and create your first project
3. **Add Tasks**: Open a project and start adding tasks
4. **Manage Tasks**: Update task status, priority, and details
5. **Track Progress**: View analytics and completion rates on the dashboard

## Usage Tips

- Use the dashboard for a quick overview of all activities
- Organize projects by team or functional area
- Use priority levels to focus on important tasks
- Track task status to monitor project progress
- View analytics to identify patterns and improvements

## Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- Token validation on protected routes
- Secure data storage

## Future Enhancements

- Real-time collaboration using WebSocket
- Role-based access control (Admin, Manager, User)
- Notification system (email/in-app)
- Cloud deployment (AWS, Vercel, Heroku)
- Advanced analytics and reporting
- Third-party integrations (calendar, email)
- Enhanced UI/UX features

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please feel free to create an issue or contact the development team.
