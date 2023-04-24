import { useState } from "react";
import axios from "axios";
import FileInput from "../../usables/FileInput";
import LeftBanner from "../../auth/LeftBanner";
import styles from "./styles.module.css";

const PodcastForm = () => {
  const [data, setData] = useState({
    title: "",
    artist: "",
    audio: "",
    image: "",
  });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleInputState = (name, value) => {
    setData((prev) => ({ ...prev, [name]: toString(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/api/podcasts";
      console.log("data is ", data);
      console.log(typeof data);
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
          <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={styles.heading}>Song Form</h1>
            <input
              type="text"
              className={styles.input}
              placeholder="Song Name"
              name="title"
              onChange={handleChange}
              value={data.title}
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
              name="image"
              label="Choose Image"
              handleInputState={handleInputState}
              type="image"
              value={data.image}
            />
            <FileInput
              name="audio"
              label="Choose Song"
              handleInputState={handleInputState}
              type="audio"
              value={data.audio}
            />
            <button type="submit" className={styles.submit_btn}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PodcastForm;
