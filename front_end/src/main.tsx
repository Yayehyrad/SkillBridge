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


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children : [{
      path : "/auth",
      element : <div>hi</div>
    }]
  },
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
