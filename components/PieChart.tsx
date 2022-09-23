import React from "react";
import { VictoryPie } from "victory";
import { DayType } from "../Interfaces";
interface PiechartProps {
  holiday: DayType;
  sick: DayType;
  misc: DayType;
}
const Piechart = ({ holiday, sick, misc }: PiechartProps) => {
  const data = [
    {
      x: holiday.name,
      y: holiday.value,
      label: holiday.value > 0 ? "holiday" + "(" + holiday.value + ")" : " ",
    },
    {
      x: sick.name,
      y: sick.value,
      label: sick.value > 0 ? "sick" + "(" + sick.value + ")" : " ",
    },
    {
      x: misc.name,
      y: misc.value,
      label: misc.value > 0 ? "misc" + "(" + misc.value + ")" : " ",
    },
  ];
  return (
    <div
      className="pie"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        width: "fit-content",
        padding: "10px 5px",
      }}
    >
      <VictoryPie
        data={data}
        colorScale={[
          "rgb(139, 179, 121)",
          "rgb(230, 194, 53)",
          "rgb(141, 116, 173)",
        ]}
        radius={100}
      />
    </div>
  );
};

export default Piechart;
