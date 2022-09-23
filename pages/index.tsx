import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import DateRangePicker from "../components/DateRangePicker";
import Buttons from "../components/Buttons";
import moment from "moment";
import axios from "axios";
import TextField from "../components/TextField";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { DataInterface, MyFormValues } from "../Interfaces";
import Table from "../components/Table";
import { saveData } from "../SaveNewData";
import { useRouter } from "next/router";
import MenuBar from "../components/MenuBar";
import Footer from "../components/Footer";
import { useAppContext } from "../components/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home({ data }: DataInterface) {
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1); //finding first date of current month
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0); //finding last date of current month
  const [start, setStart] = useState<Date>(firstDay);
  const [end, setEnd] = useState<Date>(lastDay);
  const [type, setType] = useState<number>(0); //color marking of a day
  const [curDate, setCurDate] = useState<String>("");
  const [curIndex, setCurIndex] = useState<number>(-1); //finding index of the selected one
  const [tempType, setTempType] = useState<number>(0);
  const [histories, setHistories] = useState<any>({
    records: [],
  }); //saving the marking histories of calender
  const [size, setSize] = useState<any>({
    w1: "",
    h1: "",
    w2: "",
    h2: "",
    w3: "",
    h3: "",
    w4: "",
    h4: "",
  });
  const router = useRouter();
  const [reason, setReason] = useState("");
  const userData = useAppContext();

  useEffect(() => {
    // const userInfo = localStorage.getItem("userDetails");
    if (!userData.userInfo.isValid) {
      router.push("/login");
    } else {
      router.push("/");
    }
    setHistories(data);
  }, []);

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
  const dateFormat = "YYYY/MM/DD";
  const date1 = new Date(start.toLocaleDateString());
  const date2 = new Date(end.toLocaleDateString());
  let days: Array<string> = [];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var allDates = getDates(date1, date2);
  function getDates(startDate: Date, stopDate: Date) {
    //finding all dates/days between the range
    const weekday = ["S", "M", "T", "W", "T", "F", "S"];
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDateMoment = moment(stopDate);
    while (currentDate <= stopDateMoment) {
      dateArray.push(moment(currentDate).format("YYYY-MM-DD"));
      const ndate = new Date(currentDate.toLocaleString());
      let day = weekday[ndate.getDay()];
      days.push(day);
      currentDate = moment(currentDate).add(1, "days");
    }
    return dateArray;
  }

  const months = [];
  for (let i = 0; i < allDates.length; i++) {
    //finding months between the ranges
    months.push(
      monthNames[new Date(allDates[i]).getMonth()] +
        " " +
        new Date(allDates[i]).getFullYear()
    );
  }
  //console.log(months)
  const total: number[] = [];
  var c = 1;
  let mn: Array<String> = [];
  for (var i = 0; i < months.length - 1; i++) {
    if (months[i].toString() === months[i + 1].toString()) c++;
    else {
      total.push(c);
      mn.push(months[i]);
      c = 1;
    }
  }
  total.push(c); //finding total days/dates for per month
  mn.push(months[i]); //storing the month name(with year)

  let newPeopleArray = new Array();
  console.log(data.records);
  {
    for (let x = 0; x < data.records.length; x++) {
      newPeopleArray[data.records[x].PersonId] = data.records[x].PersonName;
    }
  }

  //console.log(newPeopleArray)
  const people = [...newPeopleArray];
  console.log("people");
  ///console.log(people);

  const Color = ["#ffffff", "#8bb379", "#e6c235", "#8d74ad"];

  const initialValues: MyFormValues = {
    reasonDes: "",
    selectedType: "",
    selectedDate: "",
  };

  const ValidationSchem = Yup.object().shape({
    reasonDes: Yup.string()
      .min(10, "Too Short description!")
      .max(50, "Too Long description!")
      .required("Description is Required!"),
    selectedType: Yup.string().required("Select any Type!"),
    selectedDate: Yup.string().required("Mark the day in the table!"),
  });

  return (
    <>
      <MenuBar />
      <div className={styles.container} style={{ overflow: "auto" }}>
        <Formik
          initialValues={initialValues}
          validationSchema={ValidationSchem}
          onSubmit={(values, actions) => {
            console.log({ values, actions });
            saveData(data, curDate, values, tempType, curIndex, setHistories);
            toast("Saved Successfully!");
            //alert(JSON.stringify(values, null, 2));
            /*window.location.reload();*/
            actions.setSubmitting(false);
          }}
        >
          {({
            errors,
            values,
            touched,
            handleSubmit,
            setFieldValue,
            setFieldTouched,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <div>
                <DateRangePicker
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  func={handleSelect}
                  dates={{ date1: date1, date2: date2 }}
                  dateFormat={dateFormat}
                />
                <div>
                  <Buttons
                    errors={errors}
                    values={values}
                    touched={touched}
                    size={size}
                    setTempColor={setTempType}
                    setSize={setSize}
                    isSubmitting={isSubmitting}
                    setFieldValue={setFieldValue}
                  />
                  <TextField
                    setReason={setReason}
                    errors={errors}
                    touched={touched}
                    values={values}
                  />
                </div>
              </div>
              <Table
                setCurDate={setCurDate}
                setCurIndex={setCurIndex}
                setType={setType}
                tempType={tempType}
                total={total}
                mn={mn}
                days={days}
                allDates={allDates}
                people={people}
                histories={histories}
                curDate={curDate}
                curIndex={curIndex}
                Color={Color}
                type={type}
                setFieldValue={setFieldValue}
              />
              {errors.selectedDate && touched.selectedDate ? (
                <div className="error">{errors.selectedDate}</div>
              ) : null}
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer/>
      <Footer />
    </>
  );
}

export const getServerSideProps = async () => {
  const result = await axios.get("http://localhost:3000/api/hello");
  const resData = result.data;
  return {
    props: {
      data: resData,
    },
  };
};
