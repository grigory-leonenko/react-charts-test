import React from 'react';
import HighchartsCore from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { WEEKS } from '../data';

interface Props {
    temperature: {
      current: number[],
      history: number[],
    };
}

export const Highcharts = ({ temperature }: Props) => {
    const options = {
        chart: {
            width: 1000,
            height: 600,
        },
        title: {
          text: ''
        },
        yAxis: {
            title: {
                text: 'Temperature °C',
            }
        },
        xAxis: {
            title: {
                text: 'Week',
            },
            categories: WEEKS,
        },
        series: [
            {
                data: temperature.history,
                type: 'column',
                name: '2020',
            }, 
            {
                data: temperature.current,
                type: 'areaspline',
                name: '2021',
            },
        ],
        plotOptions: {
            column: {
                zones: [{
                    value: 0,
                    color: '#98c1d9',
                },{
                    color: '#f28482',
                }]
            },
            areaspline: {
                zones: [{
                    value: 0,
                    color: '#ced4da',
                },{
                    color: '#6c757d',
                }]
            }
        }
      }
      
    return (
        <HighchartsReact
            highcharts={HighchartsCore}
            options={options}
        />
    )
}