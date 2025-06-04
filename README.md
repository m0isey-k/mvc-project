# Household Task Management System

A web-based household task management system built with Node.js, Express.js, and EJS using the MVC architecture pattern with Server-Side Rendering.

## Project Description

This application helps users efficiently manage their household tasks by providing:
- Task creation with due dates
- Task status tracking (pending, completed, overdue)
- Visual highlighting of overdue tasks
- Task sorting by various criteria
- User authentication and session management

## Features

### User Management
- **User Registration** - Create new user accounts with secure password hashing
- **User Authentication** - Secure login/logout functionality
- **Session Management** - Maintain user sessions across requests
- **Password Security** - Passwords are hashed using bcryptjs

### Task Management
- **Add Tasks** - Create new tasks with title, description, and due date
- **Mark as Complete** - Toggle task completion status
- **Delete Tasks** - Remove tasks permanently
- **Automatic Overdue Detection** - Tasks past their due date are automatically marked as overdue
- **Task Sorting** by:
  - Date (ascending/descending)
  - Status (overdue → pending → completed)
  - Title (alphabetical)

### User Interface
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Visual Status Indicators** - Different colors and styles for task statuses
- **Intuitive Navigation** - Easy-to-use interface with clear navigation
- **Smooth Animations** - CSS transitions and hover effects
- **Modern Styling** - Clean, professional appearance with gradients and shadows

## Installation and Setup

### Prerequisites
- Node.js version 14.0 or higher
- npm (Node Package Manager)

### Installation Steps

1. **Clone the repository:**
   git clone https://github.com/m0isey-k/mvc-project.git
   cd mvc-project

2. **Install dependencies:**
   npm install

3. **Configure environment variables:**
   Create a \`.env\` file in the root directory:
   PORT=3000
   SESSION_SECRET=your-secret-key-here
   NODE_ENV=development

4. **Run the application:**
   
   **Production mode:**
   npm start
   
   **Development mode (with auto-restart):**
   npm run dev

5. **Access the application:**
   Open your browser and navigate to \`http://localhost:3000\`

## Dependencies

### Main Dependencies
- **express** (^4.18.2) - Web framework for Node.js
- **ejs** (^3.1.9) - Embedded JavaScript templating engine
- **bcryptjs** (^2.4.3) - Password hashing library
- **express-session** (^1.17.3) - Session middleware for Express
- **body-parser** (^1.20.2) - Parse incoming request bodies
- **dotenv** (^16.3.1) - Environment variable management

### Development Dependencies
- **nodemon** (^3.0.1) - Automatic server restart during development

## Application Structure

### MVC Architecture

#### Models (\`models/\`)
- **User.js** - User model with authentication methods, registration, and validation
- **Task.js** - Task model with CRUD operations, sorting, and status management

#### Views (\`views/\`)
- **auth/login.ejs** - User login form with modern styling
- **auth/register.ejs** - User registration form
- **tasks/index.ejs** - Task list with sorting options and status indicators
- **tasks/create.ejs** - New task creation form with validation

#### Controllers (\`controllers/\`)
- **authController.js** - Handles authentication (login, register, logout)
- **taskController.js** - Manages task operations (CRUD, sorting, status updates)

### Additional Components

#### Routing (\`routing/\`)
- **authRoutes.js** - Authentication-related routes
- **taskRoutes.js** - Task management routes with authentication middleware

#### Data Store (\`store/\`)
- **dataStore.js** - In-memory data simulation with sample data

#### Utilities (\`utils/\`)
- **authMiddleware.js** - Authentication middleware for protected routes
- **dateHelpers.js** - Date formatting and manipulation utilities

#### Constants (\`constants/\`)
- **statusCode.js** - HTTP status codes and application status constants
- **navigation.js** - Navigation menu items and breadcrumb definitions
- **taskStatus.js** - Task status definitions and display labels
- **sortOptions.js** - Sorting options and their display labels

#### Static Assets (\`public/\`)
- **css/style.css** - Comprehensive CSS with responsive design, animations, and modern styling

## Sample Data

The application includes sample data for testing:

### Test User Account
- **Email:** admin@example.com
- **Password:** password

### Sample Tasks
1. **Vacuum the living room** - Due tomorrow (Status: Pending)
2. **Wash the dishes** - Overdue task (Status: Overdue)
3. **Do laundry** - Completed task (Status: Completed)

## Security Features

- **Password Hashing** - All passwords are securely hashed using bcryptjs
- **Session Management** - Secure session handling with configurable options
- **Input Validation** - Server-side validation for all user inputs
- **Authentication Middleware** - Protected routes require valid authentication
- **CSRF Protection** - Form-based requests are protected
- **Environment Variables** - Sensitive configuration stored in environment variables

## API Endpoints

### Authentication Routes
- \`GET /auth/login\` - Display login form
- \`POST /auth/login\` - Process login
- \`GET /auth/register\` - Display registration form
- \`POST /auth/register\` - Process registration
- \`POST /auth/logout\` - Logout user

### Task Routes (Protected)
- \`GET /tasks\` - Display task list
- \`GET /tasks/create\` - Display task creation form
- \`POST /tasks/create\` - Create new task
- \`POST /tasks/:id/toggle\` - Toggle task completion status
- \`POST /tasks/:id/delete\` - Delete task

