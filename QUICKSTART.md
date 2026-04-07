# Quick Start Guide

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn

## One-Command Setup

### Windows (PowerShell)
```powershell
cd backend; npm install; npm run dev &
cd ../frontend; npm install; npm start
```

### macOS/Linux
```bash
cd backend && npm install && npm run dev &
cd ../frontend && npm install && npm start
```

## Step-by-Step Setup

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Start Backend Server
```bash
npm run dev
```
Expected output: `Server running on http://localhost:5000`

### Step 3: Install Frontend Dependencies (in a new terminal)
```bash
cd frontend
npm install
```

### Step 4: Start Frontend Server
```bash
npm start
```
The app will automatically open at `http://localhost:3000`

## First Time Use

1. **Create Account**
   - Click "Sign up" on the login page
   - Enter full name, email, and password
   - Click "Sign Up"

2. **Create First Project**
   - From dashboard, click "+ New Project"
   - Enter project name and description
   - Click "Create Project"

3. **Add Tasks**
   - Click "View →" on a project card
   - Click "+ New Task"
   - Add task title, description, and priority
   - Click "Create Task"

4. **Manage Tasks**
   - Drag tasks between columns (To Do, In Progress, Done)
   - Or use the status dropdown to update
   - Click "Delete" to remove tasks

5. **View Analytics**
   - Dashboard shows completion rates and statistics
   - Profile page shows your account information

## Troubleshooting

### Port 5000 Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000
npm run dev
```

### Port 3000 Already in Use
```bash
# Set different port
PORT=3001 npm start
```

### Dependencies Installation Issues
```bash
# Clear npm cache
npm cache clean --force

# Reinstall
npm install
```

### Backend Connection Error
- Ensure backend is running on port 5000
- Check that CORS is properly configured
- Clear browser cache and reload

## Development Notes

- Backend runs on `http://localhost:5000`
- Frontend runs on `http://localhost:3000`
- Data is stored in `backend/data.json`
- Authentication token is stored in browser localStorage

## Testing Credentials

After creating an account, use those credentials to login. No default test accounts are provided for security reasons.

## Building for Production

### Backend
```bash
cd backend
npm run build  # (or just use node server.js)
```

### Frontend
```bash
cd frontend
npm run build
```

This creates optimized production builds in:
- `frontend/build/` - React production build

## Available Scripts

### Backend
- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## Next Steps

- Customize the design by editing CSS files in `frontend/src/styles/`
- Add more features as needed
- Deploy to your preferred hosting service
- Set up a real database (MongoDB recommended)

## Support

For issues or questions, refer to the main README.md file or check the API documentation in the code comments.
