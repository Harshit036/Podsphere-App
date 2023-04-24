import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Container, Row, Col } from "react-bootstrap";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Homepage from "./components/home";
import PodcastPlay from "./components/PodcastPlay";
import AudioPlayer from "./components/audio-player/AudioPlayer.js";
import PodcastForm from "./components/Podcast/PodcastForm";
import { UserAuthContextProvider } from "./components/context/UserAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
function App() {
  return (
    <div>
      <UserAuthContextProvider>
        <Routes>
          {/* <Route path="/" element={<Layout />}> */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/newPodcast"
            element={
              <ProtectedRoute>
                <PodcastForm />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Register />} />
          {/* <Route path="home" element={<Homepage />} /> */}
          <Route path="signup" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="playPodcast" element={<PodcastPlay />} />

          {/* </Route> */}
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
