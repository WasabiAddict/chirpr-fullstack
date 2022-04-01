import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import ChirpCard from "./components/ChirpCard.jsx";

const App = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [chirps, setChirps] = useState([
    {
      id: uuidv4(),
      username: "Josh",
      message: "This is the chirp body!",
      created: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
    },
    {
      id: uuidv4(),
      username: "Haylee",
      message: "Hello!",
      created: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
    },
    {
      id: uuidv4(),
      username: "Garrett",
      message: "I'm not mad!",
      created: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
    },
  ]);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);
  const handleChirpSubmit = (e) => {
    e.preventDefault();

    const newChirp = {
      id: uuidv4(),
      username: username,
      message: message,
      created: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
    };

    setChirps([...chirps, newChirp]);
  };

  //rest
  const getChirps = () => {
    fetch('http://localhost:3000/api/chirps')
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(allChirps => {
        console.log(allChirps[0]);
        setChirps(allChirps);
      });
  }

  useEffect(() => {
    getChirps();
  }, []);

  //create
  const postChirp = async () => {
    console.log('test');
    const userData = {
      userid: 6,
      content: message,
      location: 'Secret Test Location'
    };
    
    try {
      const add = await fetch('http://localhost:3000/api/chirps/', {
        method: "POST",
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(userData)
      })
    } catch {
      console.log(e);
    }

  };

  //delete
  const handleDeleteChirp = (id) => {
    fetch('http://localhost:3000/api/chirps/' + id, {
      method: "DELETE"
    })
    getChirps();
  };

  return (
    <>
      <div className="container text-body text-center">
        <div className="row">
          <div className="col-12 p-0">
            <nav>
              <img
                className="banner"
                src="./assets/banner.jpg"
                alt="logo for awesome site yay"
              />
              <h1>Ghibli Chirpr</h1>
            </nav>
          </div>
        </div>
        <div className="row">
          <form action="">
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control mb-1"
                placeholder="Username"
                aria-label="Username"
                value={username}
                onChange={handleUsernameChange}
              />
              <textarea
                className="form-control mb-2"
                              aria-label="With textarea"
                              placeholder="(500 characters max)"
                value={message}
                onChange={handleMessageChange}
                cols="30"
                rows="10"
              ></textarea>
              <button className="btn btn-dark" onClick={handleChirpSubmit}>
                Chirp It!
              </button>
            </div>
          </form>
          <div className=" chirps mb-4">
            {chirps.map((chirp) => (
              <ChirpCard
                key={chirp.id}
                username={chirp.username}
                message={chirp.message}
                created={chirp.created}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
