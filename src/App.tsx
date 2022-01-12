import React, { useState } from 'react';
import { getTemperature } from './data';
import { Chartjs } from './charts/Chartjs';
import { Apexcharts } from './charts/Apexcharts';
import { Visx } from './charts/Visx';
import { Nivo } from './charts/Nivo';
import { Recharts } from './charts/Recharts';
import { Plotlyjs } from './charts/Plotlyjs';
import { Highcharts } from './charts/Highcharts';
import './App.css';

enum engines {
  empty = 'empty',
  chartjs = 'chartjs',
  apexcharts = 'apexcharts',
  visx = 'visx',
  nivo = 'nivo',
  recharts = 'recharts',
  plotlyjs = 'plotlyjs',
  highcharts = 'highcharts',
}

function App() {
  const [temperature, setTemperature] = useState(getTemperature());
  const [engine, setEngine] = useState(engines.empty);

  return (
    <div className="app">
      <div className="container">
        <div className="title">
          Temperature comparison
        </div>
        <div className="control">
          <label className="control__label">Select chart engine</label>
          <select value={engine} className="control__select" onChange={event => setEngine(event.target.value as engines)}>
            <option value={engines.empty}>Empty</option>
            <option value={engines.chartjs}>Chart.js</option>
            <option value={engines.apexcharts}>Apexcharts</option>
            <option value={engines.visx}>Visx</option>
            <option value={engines.nivo}>Nivo</option>
            <option value={engines.recharts}>Recharts</option>
            <option value={engines.plotlyjs}>Plotly.js</option>
            <option value={engines.highcharts}>Highcharts</option>
          </select>
          <button className="control__button" type="button" onClick={() => setTemperature(getTemperature())}>Generate</button>
        </div>
        <div className="chart">
          {(() => {
            switch(engine) {
              case engines.chartjs:
                return <Chartjs temperature={temperature} />;
              case engines.apexcharts:
                return <Apexcharts temperature={temperature} />;
              case engines.visx:
                return <Visx temperature={temperature} />;
              case engines.nivo:
                return <Nivo temperature={temperature} />;
              case engines.recharts:
                return <Recharts temperature={temperature} />;
              case engines.plotlyjs:
                return <Plotlyjs temperature={temperature} />;
              case engines.highcharts:
                return <Highcharts temperature={temperature} />;
              case engines.empty:
              default: 
                return null;
            }
          })()}
        </div>
      </div>
    </div>
  );
}

export default App;
