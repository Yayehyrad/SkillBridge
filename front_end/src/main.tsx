import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient , QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {SignIn} from './pages/auth';
import StudentPage from './pages/student/layout.tsx';
import StudentHome from './pages/student/Home.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children : [{
      path : "/auth",
      element : <SignIn />
    } , {
      path : "/register",
      element : <SignIn register = {true}/>
    } 
  ]
    }, {
                path : "/student",
                element : <StudentPage />,
                children : [{
                  path : '' ,
                  element : <StudentHome />
                }]
              }
]);
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
        <ReactQueryDevtools />
    </QueryClientProvider>
    
  </StrictMode>,
)
