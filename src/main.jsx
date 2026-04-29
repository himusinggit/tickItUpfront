import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "./pages/HomePage.jsx";
import App from "./App.jsx";
import MyTickets from "./pages/MyTickets.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import TickitUpLanding from "./pages/guestPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CreateEventForm from "./pages/TicketTemplateCreationPage.jsx";
import ScannerPage from "./pages/ScannerPage.jsx";
import MyEventsPage from "./pages/MyEvents.jsx";
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path:"/guest",
        element:<TickitUpLanding/>
      },
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "createEvent",
        element: <CreateEventForm />,
      },
      {
        path: "myTickets",
        element: <MyTickets />,
      },
      {
        path:"scanner",
        element:<ScannerPage/>
      },
      {
        path:"myEvents",
        element:<MyEventsPage/>
      }
    ],
  },
  {
    path: "/auth/register",
    element: <RegisterPage />,
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
]);
createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  // </StrictMode>,
);
