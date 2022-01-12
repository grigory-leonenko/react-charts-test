import React from 'react';
import Chart from 'react-apexcharts';
import { WEEKS } from '../data';

interface Props {
    temperature: {
      current: number[],
      history: number[],
    };
}

interface Item {
    value: number;
}

export const Apexcharts = ({ temperature }: Props) => {
    const series = [
        {
            name: '2020',
            type: 'area',
            data: temperature.history,
        },
        {
            name: '2021',
            type: 'column',
            data: temperature.current,
        },
    ];
    
    const options = {
        chart: {
            id: 'temperature',
        },
        stroke: {
            width: [2, 0],
            curve: 'smooth' as 'smooth',
        },
        colors: [
            '#6c757d',
            ({ value }: Item) => {
                return value >= 0 ? '#f28482' : '#98c1d9';
            },
        ],
        fill: {
            type: 'solid',
            opacity: [0.5, 1],
        },
        dataLabels: {
            enabled: false,
        },
        markers: {
            size: 2,
            strokeColors: '#6c757d',
            hover: {
                size: 3,
            }
        },
        xaxis: {
            title: {
                text: 'Week',
            },
            categories: WEEKS,
        },
        yaxis: {
            title: {
                text: 'Temperature °C',
            },
        },
    };

    return (
        <Chart
            series={series}
            options={options}
            type="area"
            width="100%"
            height="100%"
        />
    );
};
