import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/navbar';
import './style.css';
import Axios from 'axios';

import img1 from './images/1.jpg';
import img2 from './images/2.jpg';
import img3 from './images/3.jpg';

function Dashboard() {
  const [number, setNumber] = useState(0);
  const [orderStatus, setOrderStatus] = useState("total");
  const [date, setDate] = useState("");
  const popupRef = useRef(null);
  const backdropRef = useRef(null);
  const [cost, setCost] = useState([]);
  const [speakerCost, setSpeakerCost] = useState(0);
  const [venueCost, setVenueCost] = useState(0);
  const [foodCost, setFoodCost] = useState(0);

  const [id, setId] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);
  const [cost_date, setCostDate] = useState("");

  useEffect(() => {
    const total = Number(speakerCost) + Number(venueCost) + Number(foodCost);
    setTotalMoney(total);
  }, [speakerCost, venueCost, foodCost]);

  useEffect(() => {
    getCost();
  }, []);

  const selectOrder = (event) => {
    setOrderStatus(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleOpenCostClick = (id) => {
    popupRef.current.classList.add('show');
    backdropRef.current.classList.add('show');
    setNumber(id);
  };

  const handleOpenrepostClick = () => {
    popupRef.current.classList.add('create-repost');
  };

  const handleCloserepostClick = () => {
    popupRef.current.classList.remove('create-repost');
  };

  const handleCloseCostClick = () => {
    popupRef.current.classList.remove('show');
    backdropRef.current.classList.remove('show');
  };

  const getCost = () => {
    Axios.get('http://localhost:5000/costs').then((response) => {
      setCost(response.data);
    });
  };

  const submitreport = () => {
    if (id !== 0) {
      add_report();
    }
  };
  const add_report = () => {
    console.log(id);
    console.log(totalMoney);
    console.log(cost_date);

    Axios.post('http://localhost:5000/create_report', {
        id: id,
        totalMoney: totalMoney,
        cost_date: cost_date
    })
    .then(response => {
        console.log('Report added successfully:', response.data);

        Axios.put('http://localhost:5000/changstatus',{
          id:id
        })
        .then(response =>{
          console.log("2000" , response);

          window.location.reload();
        })
        .catch(err =>{
          console.log('Error changstatus', err)
        });
    })
    .catch(error => {
        console.error('Error adding report:', error);
    });
};


  const filteredData = cost.filter(item => {
    const statusMatch = (orderStatus === "total") ||
      (orderStatus === "successful" && item.status === 1) ||
      (orderStatus === "unsuccessful" && item.status === 0);

    const itemDate = item.date.slice(0, 7);
    const dateMatch = !date || itemDate === date;

    return statusMatch && dateMatch;
  });

  // ------------------------------------------------
  // create report
  // ------------------------------------------------
  const [tt, settt] = useState(0);
  const [time_now, setTimeNow] = useState(new Date().toLocaleTimeString('en-GB', { hour12: false, minute: '2-digit', hour: '2-digit' })); // เวลาปัจจุบัน (HH:MM)
  
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();
      setTimeNow(currentTime.toLocaleTimeString('en-GB', { hour12: false, minute: '2-digit', hour: '2-digit' })); // อัปเดตเวลาทุกวินาทีในรูปแบบ HH:MM
    }, 1000);
  
    return () => {
      clearInterval(interval); 
    };
  }, []); // ทำงานเพียงครั้งเดียวเมื่อคอมโพเนนต์ติดตั้ง
  
  useEffect(() => {
    update_auto();
  }, [time_now]); // เรียก update_auto ทุกครั้งที่ time_now เปลี่ยนแปลง
  
  const update_auto = () => {
    cost.map(item => {
      const itemDate = new Date(item.date).toISOString().split('T')[0];
      const date_now = new Date().toISOString().split('T')[0]; // คำนวณวันที่ปัจจุบัน
      console.log(itemDate + " " + item.time_end);
      console.log(date_now + " " + time_now);
  
      if (itemDate >= date_now) {
        if (item.time_end > time_now) {
          if (tt !== item.id) {
            console.log("กำลังตั้งค่า tt เป็น: ", item.id); // แสดงว่ากำลังเปลี่ยนค่า
            settt(item.id);
          }
        }
      }
    });
  };
  
  // ติดตามการเปลี่ยนแปลงของ tt
  useEffect(() => {
    console.log("tt เปลี่ยนแปลง: ", tt);
  }, [tt]);
  // ------------------------------------------------


  return (
    <div>
      <Navbar />
      <div ref={backdropRef} className="backdrop" onClick={handleCloseCostClick}></div>

      <main>
        <div className="control">
          <div className="control-group">
            <label htmlFor="orderStatus">Orders</label>
            <select name="orderStatus" id="orderStatus" onChange={selectOrder}>
              <option value="total">Total</option>
              <option value="unsuccessful">Not successful</option>
              <option value="successful">Successful</option>
            </select>
          </div>

          <div className="control-group">
            <label htmlFor="orderDate">Month</label>
            <input type="month" id="orderDate" name="orderDate" value={date} onChange={handleDateChange} />
          </div>
        </div>

        <div className="show-cost">
          {filteredData.map((item) => (
            <div className="box-cost" key={item.id} onClick={() => handleOpenCostClick(item.id)}>
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
              >
              </div>
              <div className="right">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <p>Time: {item.time_start} - {item.time_end}</p>
                <p>Date : {new Date(item.date).toISOString().split('T')[0]}</p>
                <p id="status">
                  <span
                    style={{
                      display: "inline-block",
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: item.status ? "green" : "red",
                    }}
                  ></span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <div ref={popupRef} className="total-box-orders">
        <button id='out'
          onClick={() => {
            handleCloseCostClick();
            handleCloserepostClick();
          }}
          className="close-button">
          X
        </button>

        {filteredData.map((item) => (
          item.id === number && (
            <div className="createrepost" key={item.id}>
              <h1>Create Report</h1>
              <p>หัวข้ออบรม : {item.title}</p>
              <p>ผู้เข้าอบรม แผนก: {item.department}</p>
              <p>วันที่ : {new Date(item.date).toISOString().split('T')[0]}</p>
              
              <h3>รายการ</h3>
            
              <div className="section">
                <div className="insec">
                  <label>จ้างวิทยากร</label>
                  <input
                    type="number"
                    placeholder='ระบุจำนวนเงิน'
                    onChange={(e) => setSpeakerCost(e.target.value)}
                  />
                </div>
                <div className="insec">
                  <label>สถานที่</label>
                  <input
                    type="number"
                    placeholder='ระบุจำนวนเงิน'
                    onChange={(e) => setVenueCost(e.target.value)}
                  />
                </div>
                <div className="insec">
                  <label>อาหารพนักงาน / ขนมพักเบรค</label>
                  <input
                    type="number"
                    placeholder='ระบุจำนวนเงิน'
                    onChange={(e) => setFoodCost(e.target.value)}
                  />
                </div>
                <p id='total'>ยอดรวม : {totalMoney} บาท</p>
                <button onClick={() => {
                  setId(item.id); 
                  setCostDate(new Date(item.date).toISOString().split('T')[0]); // Set the cost date
                  submitreport();
                }}>
                  Submit
                </button>
              </div>
            </div>
          )
        ))}

        {filteredData.map((item) => (
          item.id === number && (
            <div className='title-box' key={item.id}>
              <h1>{item.title}</h1>
              <p>รายละเอียด : {item.description}</p>
              <p>เวลา : {item.time_start} - {item.time_end}</p>
              <p>วันที่ : {new Date(item.date).toISOString().split('T')[0]}</p>
              <p>สถานที่ : {item.location}</p>
              <p>ผู้เข้าอบรม แผนก : {item.department}</p>

              {item.status ? (
                <div className='checkstatus'>
                  <p>สถานะ : อบรมแล้ว</p>
                  {item.status_report === 0 ? (
                    <div className="box-repost">
                      <button onClick={handleOpenrepostClick}>Create repost</button>
                    </div>
                  ) : (
                    <div className="box-repost">
                      <button id='green'>Create succeed</button>
                    </div>
                  )}
                </div>
              ) : (
                <p>สถานะ : ยังไม่อบรม</p>
              )}
            </div>
          )
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
