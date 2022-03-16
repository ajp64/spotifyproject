import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  Tooltip,
  CartesianGrid,
  Line,
  YAxis,
  Text,
  Cell,
  Bar,
} from "recharts";
import { useMemo, useState, useEffect } from "react";

import "./styles.css";

const blues = [
  ["#457AA6"],
  ["#457AA6", "#E3EBF2"],
  ["#264F73", "#457AA6", "#E3EBF2"],
  ["#264F73", "#457AA6", "#A2BBD2", "#E3EBF2"],
  ["#1A334A", "#264F73", "#457AA6", "#A2BBD2", "#E3EBF2"],
];

const getColor = (length, index) => {
  if (length <= blues.length) {
    return blues[length - 1][index];
  }

  return blues[blues.length - 1][index % blues.length];
};

const YAxisLeftTick = ({ y, payload: { value } }) => {
  return (
    <Text x={0} y={y} textAnchor="start" verticalAnchor="middle" scaleToFit>
      {value}
    </Text>
  );
};

let ctx;

const measureText14HelveticaNeue = (text) => {
  if (!ctx) {
    ctx = document.createElement("canvas").getContext("2d");
    ctx.font = "14px 'Helvetica Neue";
  }

  return ctx.measureText(text).width;
};

const BAR_AXIS_SPACE = 10;

export const SimpleBarChart = ({ songdata, yKey, xKey }) => {
  const maxTextWidth = useMemo(
    () =>
      songdata.reduce((acc, cur) => {
        const value = cur[yKey];
        const width = measureText14HelveticaNeue(value.toLocaleString());
        if (width > acc) {
          return width;
        }
        return acc;
      }, 0),
    [songdata, yKey]
  );

  if (songdata) {
    return (
      <ResponsiveContainer
        width={"100%"}
        height={50 * songdata.length}
        debounce={50}
      >
        <BarChart
          songdata={songdata}
          layout="vertical"
          margin={{ left: 10, right: maxTextWidth + (BAR_AXIS_SPACE - 8) }}
        >
          <XAxis hide axisLine={false} type="number" />
          <YAxis
            yAxisId={0}
            songdataKey={xKey}
            type="category"
            axisLine={false}
            tickLine={false}
            tick={YAxisLeftTick}
          />
          <YAxis
            orientation="right"
            yAxisId={1}
            songdataKey={yKey}
            type="category"
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => value.toLocaleString()}
            mirror
            tick={{
              transform: `translate(${maxTextWidth + BAR_AXIS_SPACE}, 0)`,
            }}
          />
          <Bar songdataKey={yKey} minPointSize={2} barSize={32}>
            {songdata.map((d, idx) => {
              return (
                <Cell key={d[xKey]} fill={getColor(songdata.length, idx)} />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  } else {
    return null;
  }
};
