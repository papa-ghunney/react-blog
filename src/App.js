import { useSelector } from "react-redux";
import Blogs from "./components/Blogs";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import { selectSignedIn } from "./features/userSlice";
import './styling/app.css'
function App() {
  const isSignedIn = useSelector(selectSignedIn)
  return (
    <div className="App">
      <Navbar />
      <HomePage />
      {isSignedIn && <Blogs />}
    </div>
  );
}

export default App;
