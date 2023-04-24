import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Homepage from "./components/home";
import PodcastPlay from "./components/PodcastPlay";
import AudioPlayer from "./components/audio-player/AudioPlayer.js";
import PodcastForm from "./components/Podcast/PodcastForm";
function App() {
  return (
    <div>
      {/* <UserAuthContextProvider> */}
      <Router>
        <Routes>
          {/* <Route path="/" element={<Layout />}> */}
          <Route path="/" element={<Register />} />
          <Route path="home" element={<Homepage />} />
          <Route path="signup" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="playPodcast" element={<PodcastPlay />} />
          <Route path="newPodcast" element={<PodcastForm />} />
          {/* </Route> */}
        </Routes>
      </Router>
      {/* </UserAuthContextProvider> */}
    </div>
  );
}

export default App;
