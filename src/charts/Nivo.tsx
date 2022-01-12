import { ResponsiveBar, BarCustomLayerProps, ComputedBarDatum } from '@nivo/bar';
import { line, curveNatural } from 'd3-shape';

interface Props {
    temperature: {
      current: number[],
      history: number[],
    };
}

interface BarData {
    temperature: number;
    week: number;
    history: number;
}

const LineLayer = ({ bars, xScale, yScale }: BarCustomLayerProps<BarData>) => {
    const generator = line<ComputedBarDatum<BarData>>()
        .x(path => xScale(path.data.data.week ?? 0))
        .y(path => yScale(path.data.data.history ?? 0))
        .curve(curveNatural)

    const d = generator(bars) as string;

    return (
        <>
            <defs>
                <marker id="marker-circle" markerWidth="5" markerHeight="5" markerUnits="strokeWidth" refX="2" refY="2.5" orient="auto-start-reverse" strokeWidth="1" fill="#6c757d">
                    <circle r="2" cx="2.5" cy="2.5"></circle>
                </marker>
            </defs>
            <path d={d} fill="rgba(141, 153, 174, 0.5)" stroke="#6c757d" strokeWidth="2" markerMid="url(#marker-circle)" />
        </>
    ) 
}

export const Nivo = ({ temperature }: Props) => {
    const data = temperature.current.map((value, index) => ({ temperature: value, week: index, history: temperature.history[index] }));

    return (
        <ResponsiveBar
            data={data}
            keys={['temperature']}
            indexBy="week"
            margin={{ top: 20, right: 20, bottom: 40, left: 60 }}
            padding={0.5}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={(bar) => bar.data.temperature >= 0 ? '#f28482' : '#98c1d9'}
            borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Week',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Temperature °C',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            markers = {[
                {
                    axis: 'y',
                    value: 0,
                    lineStyle: { strokeOpacity: 0 },
                    textStyle: { fill: '#f28482' },
                    legend: 'hot',
                    legendPosition: 'top-right',
                    legendOrientation: 'vertical',
                },
                {
                    axis: 'y',
                    value: 0,
                    lineStyle: { stroke: '#f28482', strokeWidth: 1 },
                    textStyle: { fill: '#98c1d9' },
                    legend: 'cold',
                    legendPosition: 'bottom-right',
                    legendOrientation: 'vertical',
                }
            ]}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            layers={[
                'grid',
                'axes',
                'bars',
                'markers',
                'legends',
                'annotations',
                LineLayer,
            ]}
        />
    )
}