import { createBrowserRouter } from "react-router-dom";

import Root from "./components/Root/Root";
import Courses from "./components/CourseRoutes/Courses/Courses";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Home from "./components/Home/Home";
import Login from "./auth/Login/Login";
import Register from "./auth/Register/Register";
import Blogs from "./components/BlogRoutes/Blogs/Blogs";
import BlogDetails from "./components/BlogRoutes/BlogDetails/BlogDetails";
import Assignments from "./components/AssignmentRoutes/Assignments";
import AssignmentDetails from "./components/AssignmentRoutes/AssignmentDetails";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import CourseDetails from "./components/CourseRoutes/CourseDetails/CourseDetails";
import Dashboard from "./UserDashBoard/DashBoard/DashBoard";
import DashboardHome from "./UserDashBoard/DashBoardHome/DashBoardHome";
import MyCourses from "./UserDashBoard/MyCourses/MyCourses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "courses", element: <Courses /> },
      { path: "course/:id", element: <CourseDetails /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "blogs", element: <Blogs /> },
      { path: "blogs/:id", element: <BlogDetails /> },
      { path: "assignments", element: <Assignments /> },
      { path: "assignments/:id", element: <AssignmentDetails /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <DashboardHome />,
          },
          {
            path: "myCourses",
            element: <MyCourses />,
          },
        ],
      },
    ],
  },
]);

export default router;
