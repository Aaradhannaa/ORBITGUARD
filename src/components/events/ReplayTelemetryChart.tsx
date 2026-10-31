import React from 'react';
import { Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { ImpactEvent } from '../../types/events';

interface ReplayTelemetryChartProps {
  event: ImpactEvent;
  replayIndex: number;
}

export const ReplayTelemetryChart: React.FC<ReplayTelemetryChartProps> = ({ event, replayIndex }) => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart
      data={event.telemetryWindow.map((point, index) => ({
        idx: index,
        time: point.timeString.substring(6, 12),
        wMag: point.imu.wMagnitude,
        solar: point.solarCurrent.current,
        bMag: point.magnetometer.bMagnitude
      }))}
      margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
    >
      <XAxis dataKey="time" stroke="#525d6d" fontSize={9} />
      <YAxis stroke="#525d6d" fontSize={9} />
      <Tooltip />
      <ReferenceLine
        x={event.telemetryWindow[replayIndex]?.timeString.substring(6, 12)}
        stroke="#d97742"
        strokeWidth={2}
        label={{ value: 'PLAYHEAD', fill: '#d97742', fontSize: 9, position: 'top' }}
      />
      <Line type="monotone" dataKey="wMag" name="IMU (deg/s)" stroke="#d97742" strokeWidth={2} dot={false} isAnimationActive={false} />
      <Line type="monotone" dataKey="solar" name="Solar (A)" stroke="#fbbf24" strokeWidth={1.6} dot={false} isAnimationActive={false} />
    </LineChart>
  </ResponsiveContainer>
);
