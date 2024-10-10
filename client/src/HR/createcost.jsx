import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import './style.css';
import Axios from 'axios';
import img1 from './images/1.jpg';
import img2 from './images/2.jpg';
import img3 from './images/3.jpg';

function CreateCost() {
  const [cost, setCost] = useState([]);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [date, setdate] = useState("");
  const [time_start, settime_start] = useState("");
  const [time_end, settime_end] = useState("");
  const [location, setlocation] = useState("");
  const [department, setdepartment] = useState("");
  const [status, setstatus] = useState(0);
  const [deletecost, setdeletecost] = useState(0);
  const [Platform,setPlatform] = useState("");
  const [Trainer,setTrainer] = useState("");

  // image 

  const [image_cost, setimage_cost] = useState("");
  const [images, setimage] = useState([]);
  const [imageURL, setimageURL] = useState([]);



  useEffect(() => {
    getCost();

    if (images.length < 1) return;
    const newimageURL = [];
    images.forEach(image => newimageURL.push(URL.createObjectURL(image)))
    setimageURL(newimageURL);

  }, [images, image_cost]);

  const onImageChange = (e) => {
    setimage([...e.target.files]);

    const file = e.target.files[0];
    if (file) {
      setimage_cost(file.name);
      console.log(image_cost);
    }
  }
  const getCost = () => {
    Axios.get('http://localhost:5000/costs')
      .then((response) => {
        setCost(response.data);
      })
      .catch((error) => {
        console.error("Error fetching costs:", error);
      });
  };

  const filteredData = cost.filter((item) => item.status === 0);

  const deleteCost = (id) => {
    let con = confirm("คุณต้องการลบไหม");
    if (con) {
      Axios.delete(`http://localhost:5000/delete/${id}`).then((response) => {

      })
      setdeletecost(id);
      const updatedData = cost.filter((item) => item.id !== id);
      setCost(updatedData);
    }
  };
  console.log(deletecost);

  const addCost = (e) => {

    e.preventDefault();

    Axios.post('http://localhost:5000/create', {
      title: title,
      description: description,
      date: date,
      time_start: time_start,
      time_end: time_end,
      location: location,
      department: department,
      image_cost: image_cost,
      status: status,
      Trainer:Trainer,
      Platform:Platform
    })
      .then(() => {
        setCost((prevCost) => [
          ...prevCost,
          {
            title: title,
            description: description,
            date: date,
            time_start: time_start,
            time_end: time_end,
            location: location,
            department: department,
            image_cost: image_cost,
            status: status,
            Trainer:Trainer,
            Platform:Platform
          },
        ]);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error adding cost:', error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="main-create-cost">
        <h1>Create Cost</h1>
        <div className="box-create">
          <div className="left">
            <div className="box-images">
              {imageURL.map(imageSrc => (
                <img width="100%" height="100%" src={imageSrc} />
              ))}
            </div>
            <input type="file" multiple accept="image/*" onChange={onImageChange} />

          </div>

          <div className="right">
            <form>
            <div>
                <label htmlFor="Trainer">Trainer</label>
                <input
                  type="text"
                  id="Trainer"
                  name="Trainer"
                  placeholder="Enter Name Trainer"
                  onChange={(event) => {
                    setTrainer(event.target.value)
                  }}
                />
              </div>
              <div>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter title"
                  onChange={(event) => {
                    settitle(event.target.value)
                  }}
                />
              </div>

              <div>
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Enter description"
                  onChange={(event) => {
                    setdescription(event.target.value)
                  }}
                />
              </div>

              <div>
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  onChange={(event) => {
                    setdate(event.target.value)
                  }}
                />
              </div>

              <div>
                <label htmlFor="time">Time</label>
                <div className="time-zone">
                  <input
                    type="time"
                    id="time-start"
                    name="timeStart"
                    onChange={(event) => {
                      settime_start(event.target.value)
                    }}
                  />
                  <p>to</p>
                  <input
                    type="time"
                    id="time-end"
                    name="timeEnd"
                    onChange={(event) => {
                      settime_end(event.target.value)
                    }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="location">Location</label>
                <select
                  name="location"
                  id="location"
                  value={location}
                  onChange={(event) => {
                    setlocation(event.target.value);
                  }}
                >
                  <option value="onsite">Onsite</option>
                  <option value="online">Online</option>
                </select>
              </div>
              <div>
                <label htmlFor="Platform">Platform</label>
                {location === 'online' ? (
                  <select
                  name="platform"
                  id="platform"
                  value={Platform}
                  onChange={(even) =>{
                    setPlatform(even.target.value);
                  }}
                  >
                    <option value="zoom">Zoom 123 654 789</option>
                    <option value="google-meet">Google Meet 987 654 321</option>
                    <option value="microsoft-teams">Microsoft Teams 555 666 777</option>
                    <option value="webex">Webex 111 222 333</option>
                    <option value="skype">Skype 444 555 666</option>
                  </select>
                ) : (
                  <select
                    name="platform"
                    id="platform2"
                    value={Platform}
                    onChange={(even) =>{
                      setPlatform(even.target.value);
                    }}
                  >
                    <option value="onsite1">Location 1</option>
                    <option value="onsite2">Location 2</option>
                    <option value="onsite3">Location 3</option>
                    <option value="onsite4">Location 4</option>
                    <option value="onsite5">Location 5</option>
                  </select>
                )}


                {/* <input type="text"  placeholder='platform'/> */}
              </div>

              <div>
                <label htmlFor="department">Department</label>
                <select
                  name="department"
                  id="department"
                  value={department}

                  onChange={(event) => {
                    setdepartment(event.target.value)
                  }}
                >
                  <option value="IT">IT</option>
                  <option value="Sales">Sales</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>
              <button onClick={addCost}>submit</button>
            </form>
          </div>
        </div>
        <div className="show-cost-create">
          <h1>Total Cost</h1>
          {filteredData.map((item) => (
            <div className="box-cost" key={item.id}>
              <div
                className="left"
                style={{
                  backgroundImage:
                    item.image === '1.jpg' ? `url(${img1})` :
                      item.image === '2.jpg' ? `url(${img2})` :
                        item.image === '3.jpg' ? `url(${img3})` :
                          'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: '100px',
                  height: '100px',
                }}
              ></div>
              <div className="right">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <p>Time: {item.time_start} - {item.time_end}</p>
                <p>date : {new Date(item.date).toISOString().split('T')[0]}</p>
                <div className="delete">
                  <button onClick={() => deleteCost(item.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreateCost;
