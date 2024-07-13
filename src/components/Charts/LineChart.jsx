import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,

 
  
};


function LineChart() {


    const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio']

    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: '',
                data:[65, 59, 80, 81, 56, 55, 40],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                borderWidth:1
            }
        ]
    }

    return (
        <Line data={data} />
    )
}

export default LineChart