import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Filler,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { WEEKS } from '../data';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Filler
);

interface Props {
  temperature: {
    current: number[],
    history: number[],
  };
}

interface Item {
    dataIndex: number;
}

export const Chartjs = ({ temperature }: Props) => {
  const data = {
    labels: WEEKS,
    datasets: [
      {
        type: 'line' as const,
        label: '2020 temperature',
        borderColor: '#6c757d',
        backgroundColor: 'rgba(108, 117, 125, 0.5)',
        pointBackgroundColor: '#6c757d',
        pointBorderColor: '#6c757d',
        borderWidth: 2,
        data: temperature.history,
        fill: {
          target: 'origin',
        },
        tension: 0.4,
      },
      {
        type: 'bar' as const,
        label: '2021 temperature',
        backgroundColor: ({ dataIndex }: Item) => {
          const value = temperature.current[dataIndex];
          return value >= 0 ? '#f28482' : '#98c1d9';
      },
        data: temperature.current,
        borderColor: 'white',
        borderWidth: 1,
      }
    ],  
  };

  const options = {
    scales: {
        x: {
            title: {
                display: true,
                text: 'Week',
            }
        },
        y: {
            title: {
                display: true,
                text: 'Temperature °C',
            }
        },
    },
    responsive: true,
    maintainAspectRatio: false,
};

  return <Chart type='bar' data={data} options={options} />;
}
