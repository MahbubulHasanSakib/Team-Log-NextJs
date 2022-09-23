import { useState, useEffect, useRef } from "react";
import React from "react";
import DateRangePicker from "../components/DateRangePicker";
import DropDown from "../components/DropDown";
import JSONData from "../data.json";
import { Item, Record } from "../Interfaces";
import Chart from "../components/Chart";
import { useRouter } from "next/router";
import MenuBar from "../components/MenuBar";
import moment from "moment";
import Footer from "../components/Footer";
import { useReactToPrint } from "react-to-print";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Piechart from "../components/PieChart";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useAppContext } from "../components/UserContext";

const Statistics = () => {
  const router = useRouter();
  const [chart, setChart] = useState("bar");
  const userData = useAppContext();
  const handleChange = (event: any, newAlignment: any) => {
    setChart(newAlignment);
  };
  const componentRef = useRef<any>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: "print",
    documentTitle: "Statistics Page",
    onAfterPrint: () => console.log("printed"),
  });

  useEffect(() => {
    //const userInfo = localStorage.getItem("userDetails");
    if (!userData.userInfo.isValid) {
      router.push("/login");
    }
  }, []);

  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1); //finding first date of current month
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0); //finding last date of current month
  const [start, setStart] = useState<Date>(firstDay);
  const [end, setEnd] = useState<Date>(lastDay);
  const [searchName, setSearchName] = useState<string>(
    JSONData.records[0].PersonName
  );
  const [info, setInfo] = useState<Record>(JSONData.records[0]);
  const date1 = new Date(start.toLocaleDateString());
  const date2 = new Date(end.toLocaleDateString());
  const handleSelect = (range: Array<Date>) => {
    if (range != null) {
      var valueOfInput1 = new Date(range[0]); //first selected date from rangepicker
      var valueOfInput2 = new Date(range[1]); //last selected date from rangepicker
    } else {
      valueOfInput1 = firstDay;
      valueOfInput2 = lastDay;
    }
    setStart(valueOfInput1);
    setEnd(valueOfInput2);
  };

  useEffect(() => {
    const findInfo = JSONData.records.find((p) => p.PersonName === searchName);
    if (findInfo) setInfo(findInfo);
  }, [searchName]);
  console.log(info);
  const numOfHoliday = info.Items.filter((i: Item) => {
    return (
      i.type === 1 &&
      moment(new Date(new Date(i.date).toLocaleDateString())) >=
        moment(start) &&
      moment(new Date(new Date(i.date).toLocaleDateString())) <= moment(end)
    );
  });
  const numOfSick = info.Items.filter((i: Item) => {
    return (
      i.type === 2 &&
      moment(new Date(new Date(i.date).toLocaleDateString())) >=
        moment(start) &&
      moment(new Date(new Date(i.date).toLocaleDateString())) <= moment(end)
    );
  });
  const numOfMisc = info.Items.filter((i: Item) => {
    return (
      i.type === 3 &&
      moment(new Date(new Date(i.date).toLocaleDateString())) >=
        moment(start) &&
      moment(new Date(new Date(i.date).toLocaleDateString())) <= moment(end)
    );
  });
  console.log(
    numOfHoliday.length + " " + numOfSick.length + " " + numOfMisc.length
  );
  const types = ["Holiday", "Sick", "Misc"];
  const handleClick = () => {
    router.push("/");
  };
  return (
    <>
      <MenuBar />
      <button
        className="btn btn-secondary"
        style={{ float: "right", marginRight: "10px" }}
        onClick={handlePrint}
      >
        Print Statistics
        <span style={{ marginLeft: "5px" }}>
          <FontAwesomeIcon icon={faPrint} />
        </span>
      </button>
      <div className="container statistics" ref={componentRef}>
        <div className="left_statistics">
          <h1>Statistics</h1>
          <DateRangePicker
            errors={{}}
            touched={{}}
            setFieldValue={() => ({})}
            func={handleSelect}
            dates={{ date1: date1, date2: date2 }}
            dateFormat={"dd/mm/yyyy"}
          />
          <DropDown setSearchName={setSearchName} />
          <div className="toggleButtons" style={{ marginBottom: "10px" }}>
            <ToggleButtonGroup
              color="primary"
              value={chart}
              exclusive
              onChange={handleChange}
            >
              <ToggleButton value="bar">BarChart</ToggleButton>
              <ToggleButton value="pie">PieChart</ToggleButton>
            </ToggleButtonGroup>
          </div>
          {chart === "bar" && (
            <Chart
              holiday={{ name: "Holiday", value: numOfHoliday.length }}
              sick={{ name: "Sick", value: numOfSick.length }}
              misc={{ name: "Misc", value: numOfMisc.length }}
            />
          )}
          {chart === "pie" && (
            <Piechart
              holiday={{ name: "Holiday", value: numOfHoliday.length }}
              sick={{ name: "Sick", value: numOfSick.length }}
              misc={{ name: "Misc", value: numOfMisc.length }}
            />
          )}
          <h5 className="my-3">
            Total missed:
            {numOfHoliday.length + numOfSick.length + numOfMisc.length} days
            {`(holiday-${numOfHoliday.length},sick-${numOfSick.length},misc-${numOfMisc.length})`}
          </h5>
        </div>
        <div className="right_statistics">
          <table className="table" style={{ border: "1px solid #000000" }}>
            <thead>
              <tr>
                <td style={{ textAlign: "center" }} colSpan={2}>
                  <h4 className="text-center">Statistics Summary</h4>
                </td>
              </tr>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Type</th>
              </tr>
            </thead>
            <tbody>
              {numOfHoliday.map((d, idx) => {
                return (
                  <tr key={idx}>
                    <th scope="row">{d.date}</th>
                    <td>{types[d.type - 1]}</td>
                  </tr>
                );
              })}
              {numOfSick.map((d, idx) => {
                return (
                  <tr key={idx}>
                    <th scope="row">{d.date}</th>
                    <td>{types[d.type - 1]}</td>
                  </tr>
                );
              })}
              {numOfMisc.map((d, idx) => {
                return (
                  <tr key={idx}>
                    <th scope="row">{d.date}</th>
                    <td>{types[d.type - 1]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Statistics;
