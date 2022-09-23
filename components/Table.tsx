import React from "react";
import { Item, Record } from "../Interfaces";
import styles from "../styles/Home.module.css";

const Table = ({
  setCurDate,
  setCurIndex,
  setType,
  tempType,
  total,
  mn,
  days,
  allDates,
  people,
  histories,
  curDate,
  curIndex,
  Color,
  type,
  setFieldValue,
}: any) => {
  const handleClick = (dt: String, index: number) => {
    setCurDate(dt);
    setCurIndex(index);
    setType(tempType);
  };
  return (
    <>
      <table style={{ marginTop: "20px" }} className="table table-bordered">
        <thead>
          <tr>
            <th className={styles.thBorder} scope="col"></th>
            {total.map((t: number, index: number) => {
              return (
                <th key={index} colSpan={t} className="text-center" scope="col">
                  {mn[index]}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            {days &&
              days.length > 1 &&
              days.map((d: string, index: number) => {
                return <td key={index}>{d}</td>;
              })}
          </tr>
          <tr>
            <td></td>
            {allDates.map((dt: string, index: number) => {
              return <td key={index}>{new Date(dt).getDate()}</td>;
            })}
          </tr>
          {people.map((p: string, index: number) => {
            return (
              <tr key={index}>
                <td>{p}</td>
                {allDates.length > 0 &&
                  allDates.map((dt: string, idx: number) => {
                    const f =
                      histories.records &&
                      histories.records.length > 0 &&
                      histories.records.find(
                        (h: Record) =>
                          h.Items.find((i: Item) => i.date === dt) &&
                          h.PersonId == index
                      );

                    var resType;
                    if (f) {
                      let resObj = f.Items.find(
                        (i: Item) => i.date.toString() === dt.toString()
                      );
                      resType = resObj.type;
                    }
                    return (
                      <td
                        key={idx}
                        style={{
                          backgroundColor:
                            dt.toString() === curDate.toString() &&
                            index === curIndex
                              ? Color[type]
                              : histories.records &&
                                histories.records.length > 0 &&
                                histories.records.find(
                                  (h: Record) =>
                                    h.Items.find((i: Item) => i.date === dt) &&
                                    h.PersonId == index
                                )
                              ? Color[resType]
                              : "",
                        }}
                        onClick={() => {
                          {
                            tempType > 0 && setFieldValue("selectedDate", dt);
                          }
                          handleClick(dt, index);
                        }}
                      ></td>
                    );
                  })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
