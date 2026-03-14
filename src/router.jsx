import { createBrowserRouter } from "react-router-dom";

import Root from "./components/Root/Root";
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
import MySubmissions from "./UserDashBoard/MySubmissions";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import UserDashboard from "./UserDashBoard/UserDashBoard";
import ProtectedRoute from "./ProtectedRoute";
import AdminProfile from "./AdminDashboard/AdminProfile";
import ManageUsers from "./AdminDashboard/ManageUsers";
import ManageBlogs from "./AdminDashboard/ManageBlogs";
import AllAssignments from "./AdminDashboard/AllAssignments";
import AddBlog from "./components/BlogRoutes/AddBlog";
import MyAssignments from "./UserDashBoard/MyAssignments";
import AddAssignment from "./components/AssignmentRoutes/AddAssignment";
import UserProfile from "./UserDashBoard/UserProfile";
import AssignmentSubmit from "./components/AssignmentRoutes/AssignmentSubmit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "blogs", element: <Blogs /> },
      { path: "addBlogs", element: <AddBlog /> },
      { path: "blogs/:id", element: <BlogDetails /> },
      { path: "assignments", element: <Assignments /> },
      { path: "addAssignment", element: <AddAssignment /> },
      { path: "assignments/:id", element: <AssignmentDetails /> },
      { path: "login", element: <Login /> },
      { path: "assignments/submit/:id", element: <AssignmentSubmit /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard/user",
    element: (
      <ProtectedRoute role="user">
        <UserDashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <UserProfile />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "mySubmissions",
        element: <MySubmissions />,
      },
      {
        path: "myAssignments",
        element: <MyAssignments />,
      },
    ],
  },
  {
    path: "/dashboard/admin",
    element: (
      <ProtectedRoute role="admin">
        <AdminDashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminProfile />,
      },
      {
        path: "manageUsers",
        element: <ManageUsers />,
      },
      {
        path: "manageBlogs",
        element: <ManageBlogs />,
      },
      {
        path: "allAssignments",
        element: <AllAssignments />,
      },
    ],
  },
]);

export default router;
