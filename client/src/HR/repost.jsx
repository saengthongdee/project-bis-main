import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Navbar from './components/navbar';
import LineChart from './Linerepost';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function Repost() {

    const [report, setReport] = useState([]);
    const [date, setDate] = useState('');

    const thaiMonths = [
        'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
        'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];

    const monthIndex = date.split('-')[1];
    const thaiMonth = thaiMonths[parseInt(monthIndex, 10) - 1]; 

    useEffect(() => {
        getReport();
        const currentDate = new Date();
        const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // บวก 1 เพื่อให้เดือนเริ่มที่ 1
        const currentYear = currentDate.getFullYear();
        
        setDate(`${currentYear}-${currentMonth}`);
    }, []);

    
    const getReport = () => {
        Axios.get('http://localhost:5000/report').then((response) => {
            setReport(response.data);
        });
    }

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const filteredData = report.filter(item => {
        const itemDate = new Date(item.datetime);
        const selectedDate = new Date(date);
        return itemDate.getMonth() === selectedDate.getMonth() && itemDate.getFullYear() === selectedDate.getFullYear();
    });

    const totalMoneyData = filteredData.map(item => item.total_money);
    const totalName = filteredData.map(item => item.title);

    const data = {
        labels: totalName,
        datasets: [
            {
                label: 'รายจ่ายของคอส',
                data: totalMoneyData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'ค่าใช้จ่ายของคอสในเดือน '+ thaiMonth,
                font: {
                    size: 18,
                },
            },
        },
    };

    return (
        <div>
            <Navbar />
            <main>
                <div className="container-show-report">
                    <div className="left" style={{ width: "900px", height: "400px" }}>
                        <LineChart />
                    </div>
                    <div className="right" style={{ width: "400px", height: "400px" }}>
                        <Doughnut data={data} options={options} />
                    </div>
                </div>
                <div className="contol-orders">
                    <div className="main-contol">
                        <form>
                            <label htmlFor="">Cost for month</label>
                            <input type="month" id='orderdata' name='orderdate'  value={date} onChange={handleDateChange} />
                            <button>download</button>
                        </form>
                    </div>
                    <div className="show-report-cost">
                        <table>
                            <thead>
                                <tr>
                                    <td>ID</td>
                                    <td>Name</td>
                                    <td>Location</td>
                                    <td>Department</td>
                                    <td>Money</td>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map(item => (
                                    <tr key={item.id_report}>
                                        <td> {item.id_report} </td>
                                        <td> {item.title} </td>
                                        <td> {item.location}</td>
                                        <td> {item.department}</td>
                                        <td> {item.total_money} </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Repost;
