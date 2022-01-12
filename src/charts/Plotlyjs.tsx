import React, { useRef, useEffect } from 'react';
import Plotly from 'plotly.js-dist-min';
import { WEEKS } from '../data';

interface Props {
    temperature: {
      current: number[],
      history: number[],
    };
  }

export const Plotlyjs = ({ temperature }: Props) => {
    const graphRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (graphRef.current) {
            Plotly.newPlot(graphRef.current, [
                {
                    name: '2021',
                    x: WEEKS,
                    y: temperature.current,
                    type: 'bar',
                    marker: {
                        color: temperature.current.map(value => value >= 0 ? '#f28482' : '#98c1d9'),
                    }
                },
                {
                    name: '2020',
                    x: WEEKS,
                    y: temperature.history,
                    fill: 'tozeroy',
                    mode: 'lines+markers',
                    line: {
                        shape: 'spline',
                    },
                    marker: {
                        color: '#6c757d',
                        symbol: 'cicrle',
                    },
                },
            ], {
                xaxis: {
                    title: {
                        text: 'Week',
                    },
                }, 
                yaxis: {
                    title: {
                        text: 'Temperature °C',
                    },
                },
                margin: {
                    t: 0,
                    l: 40,
                    b: 40,
                },
                width: 1000,
                height: 500,
            })
        }
    }, [temperature]);

    return (
        <div ref={graphRef} />
    )
}