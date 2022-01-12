import React from 'react';
import { Group } from '@visx/group';
import { Bar, LinePath } from '@visx/shape';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { MarkerCircle } from '@visx/marker';
import { GridRows } from '@visx/grid';
import { scaleLinear, scaleBand } from '@visx/scale';
import { curveNatural } from '@visx/curve';
import { WEEKS } from '../data';

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 500;
const CANVAS_ABOVE_ZERO = 300;
const CANVAS_BELOW_ZERO = 200;

interface Props {
    temperature: {
      current: number[],
      history: number[],
    };
}

export const Visx = ({ temperature }: Props) => {
    const temperatureScale = scaleLinear<number>({
        range: [CANVAS_HEIGHT - 80, 0],
        domain: [-10, 25],
        nice: true,
    });
    const weekScale = scaleBand<number>({
        range: [0, CANVAS_WIDTH - 40],
        domain: WEEKS,
        padding: 0.4,
    });

    return (
        <svg width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
            <Group top={20} left={40}>
                <GridRows
                    scale={temperatureScale}
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                />
                {temperature.current.map((value, index) => {
                    const barWidth = weekScale.bandwidth();
                    const barHeight = CANVAS_HEIGHT - CANVAS_BELOW_ZERO - temperatureScale(Math.abs(value));
                    const barX = weekScale(index);
                    const barY = value >= 0 ? CANVAS_HEIGHT - CANVAS_BELOW_ZERO - barHeight : CANVAS_ABOVE_ZERO;
                    return (
                        <Bar
                            key={`bar-${index}`}
                            x={barX}
                            y={barY}
                            width={barWidth}
                            height={barHeight}
                            fill={value >= 0 ? '#f28482' : '#98c1d9'}
                        />
                    );
                })}
                <MarkerCircle id="marker-circle" fill="#6c757d" size={2} refX={2} />
                <LinePath
                    curve={curveNatural}
                    data={temperature.history}
                    x={(value, index) => (weekScale(index) ?? 0) + 5}
                    y={(value) => temperatureScale(value) ?? 0}
                    fill="rgba(141, 153, 174, 0.5)"
                    stroke="#6c757d"
                    strokeWidth={2}
                    strokeOpacity={1}
                    shapeRendering="geometricPrecision"
                    markerMid="url(#marker-circle)"
                />
                <AxisLeft 
                    label="Temperature °C"
                    labelOffset={16}
                    scale={temperatureScale}
                    numTicks={6}
                    stroke="#373d3f"
                />
                <AxisBottom
                    label="Week"
                    scale={weekScale}
                    numTicks={WEEKS.length}
                    top={CANVAS_HEIGHT - 80}
                    stroke="#373d3f"
                />
            </Group>
        </svg>
    )
}
