import React from "react";
import { DayType } from "../Interfaces";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";
interface chartProps {
  holiday: DayType;
  sick: DayType;
  misc: DayType;
}
const Chart = ({ holiday, sick, misc }: chartProps) => {
  const data = [
    { name: holiday.name, value: holiday.value },
    { name: sick.name, value: sick.value },
    { name: misc.name, value: misc.value },
  ];
  return (
    <div
      className="barchart"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        width: "fit-content",
        padding: "10px 5px",
      }}
    >
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={20}
      >
        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="value" fill="#8884d8" background={{ fill: "#eee" }} />
      </BarChart>
    </div>
  );
};

export default Chart;
