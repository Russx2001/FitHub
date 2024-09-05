import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./util/themeConfig";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import User from "./Pages/User";
import SharedPosts from "./Pages/SharedPosts";
import Profile from "./Pages/Profile";
import UserPosts from "./Pages/UserPosts";
import Mealplan from "./Pages/MealPlan";
import Workoutplan from "./Pages/WorkoutPlan";
import Statuspage from "./Pages/StatusPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Router>
          <Navbar />
          <div className="body">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/user" element={<User />} />
              <Route path="/user/:userId" element={<UserPosts />} />
              <Route path="/sharedposts" element={<SharedPosts />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/mealplan" element={<Mealplan />} />
              <Route path="/workoutplan" element={<Workoutplan />} />
              <Route path="/statuspage" element={<Statuspage />} />
            </Routes>
          </div>
        </Router>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
