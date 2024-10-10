import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Colors } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Linerepost() {
const [chartdata,setchartdata] = useState([]);

  useEffect(() => {
    getReport();
  }, []);

const getReport = () => {
    Axios.get('http://localhost:5000/reportchart').then((response) => {
        setchartdata(response.data);
    });
}
const totalMoneyData = chartdata.map(item => item.total_money);

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'First dataset',
        data: totalMoneyData,
        fill: true,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        tension: 0.1,
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
        text: 'ค่าใช้จ่ายของคอสในปี 2024',
        font: {
          size: 18, 
        },
      },
    },
    scales: {
        y: {
            ticks: {
                color: '#000',
          },
        },
        x:{
            ticks:{
                color:'#000'
            },
        }
      },
  };
  return <Line data={data} options={options} />;
}

export default Linerepost

