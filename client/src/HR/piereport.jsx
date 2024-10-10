import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart() {

  const [chartdata, setchartdata] = useState([]);

  useEffect(() => {
    getReport();
  }, []);

  const getReport = () => {
    Axios.get('http://localhost:5000/report').then((response) => {
      setchartdata(response.data);
    });
  }
  const totalMoneyData = chartdata.map(item => item.total_money);
  const totalName = chartdata.map(item => item.title);
  
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
        text: 'ค่าใช้จ่ายของคอสในเดือน ...',
        font: {
          size: 18,
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
}

export default DoughnutChart;
