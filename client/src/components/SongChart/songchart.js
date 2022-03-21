import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";
import css from "./songchart.module.css";
import FadeIn from "react-fade-in";

export const SimpleBarChart = ({ songdata, artist }) => {
  if (songdata) {
    return (
      <FadeIn>
        <ResponsiveContainer
          width={"100%"}
          height={60 * songdata.length}
          debounce={50}
          className={css.graphlabels}
        >
          <BarChart
            width={600}
            height={600}
            data={songdata}
            margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
            layout="vertical"
          >
            <Bar
              dataKey="count"
              fill="#011627"
              label={{ fill: "#2ec4be", fontSize: 30 }}
            ></Bar>
            <YAxis
              type="category"
              width={150}
              padding={{ left: 20 }}
              dataKey="name"
              style={{
                fontSize: "1rem",
                fontFamily: "Poppins, serif",
                color: "rgb(0, 0, 0)",
              }}
            />
            <XAxis type="number" hide></XAxis>
          </BarChart>
        </ResponsiveContainer>
      </FadeIn>
    );
  } else {
    return null;
  }
};
