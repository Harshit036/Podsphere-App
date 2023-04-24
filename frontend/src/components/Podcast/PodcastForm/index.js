import { useState, useEffect } from "react";
import axios from "axios";
import FileInput from "../../usables/FileInput";
import LeftBanner from "../../auth/LeftBanner";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import { useUserAuth } from "../../context/UserAuthContext";

const PodcastForm = () => {
  const [userId, setUserId] = useState(null);
  const auth = useUserAuth();
  const user = auth.user;
  console.log(user.email);
  const [data, setData] = useState({
    name: "",
    artist: "",
    song: "",
    img: "",
    userId: userId,
  });
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleInputState = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userEmail = {
        email: user.email,
      };
      const url = "http://localhost:5000/api/podcasts";
      const res1 = await axios.post(url + "/getUserId", userEmail);
      console.log("res1 is ", res1);
      setUserId(res1.data.userId);
      const res = await axios.post(url, data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="loginWrapper">
      <div className="messageLogin">
        <LeftBanner></LeftBanner>
      </div>
      <div className="userLoginForm">
        <div className="midWrapperLogin">
          <div className="loginMessage">
            Add your<span className="changeCol loginMessage">Podcast</span>
          </div>

          <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <h1 className={styles.heading}>Song Form</h1>
              <input
                type="text"
                className={styles.input}
                placeholder="Song Name"
                name="name"
                onChange={handleChange}
                value={data.name}
              />
              <input
                type="text"
                className={styles.input}
                placeholder="Artist Name"
                name="artist"
                onChange={handleChange}
                value={data.artist}
              />
              <FileInput
                name="img"
                label="Choose Image"
                handleInputState={handleInputState}
                type="image"
                value={data.img}
              />
              <FileInput
                name="song"
                label="Choose Song"
                handleInputState={handleInputState}
                type="audio"
                value={data.song}
              />
              <button type="submit" className={styles.submit_btn}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastForm;

// <div className="loginWrapper">
// <div className="messageLogin">
//   <LeftBanner></LeftBanner>
// </div>
// <div className="userLoginForm">
//   <div className="midWrapperLogin">
//     <div className="loginMessage">
//       Add your<span className="changeCol loginMessage">Podcast</span>
//     </div>
