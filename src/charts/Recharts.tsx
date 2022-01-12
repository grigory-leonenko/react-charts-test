import React from 'react';
import {
  ComposedChart,
  Cell,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface Props {
    temperature: {
      current: number[],
      history: number[],
    };
}

export const Recharts = ({ temperature }: Props) => {
    const data = temperature.current.map((value, index) => ({
        current: value,
        history: temperature.history[index],
        week: index,
    }));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
                width={1000}
                height={460}
                margin={{ left: 0, bottom: 40 }}
                data={data}
            >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis label={{ value: 'Week', dy: 20, position: 'insideCenter' }} dataKey="week" scale="band" />
                <YAxis label={{ value: 'Temperature °C', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend wrapperStyle={{ bottom: 0 }} />
                <Bar label="2021" dataKey="current" barSize={12}>
                    {data.map(entry => (
                        <Cell key={`cell-${entry.week}`} fill={entry.current >= 0 ? '#f28482' : '#98c1d9' }/>
                    ))}
                </Bar>
                <Area type="monotone" label="2020" dataKey="history" fill="#6c757d" stroke="#6c757d" dot={{ stroke: '#6c757d', strokeWidth: 2 }} />
            </ComposedChart>
        </ResponsiveContainer>
    );
}
