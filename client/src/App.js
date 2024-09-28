import './App.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import User from './components/getuser/User';
import Add from './components/adduser/Add';
import Edit from './components/updateuser/Edit';
import Login from './components/login/login';
import Header from './components/Header/Header';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <User />,
    },
    {
      path: "/add",
      element: <Add />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/edit/:id",
      element: <Edit />,
    },
  ]);

  return (
    <div className="App">
      {/* <Header /> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
