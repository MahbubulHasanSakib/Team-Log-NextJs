import { Item, Record, DataInterface, IData, MyFormValues } from "./Interfaces";
import axios from "axios";

export const saveData = (
  data: IData,
  curDate: String,
  values: MyFormValues,
  tempType: number,
  curIndex: number,
  setHistories: React.Dispatch<React.SetStateAction<Object>>
) => {
  let findPerson = data.records.find((h: Record) => h.PersonId == curIndex);
  var tempData = new Array();
  if (findPerson) {
    const ifSelected = findPerson.Items.find(
      (i: Item) => i.date.toString() === curDate.toString()
    );
    if (ifSelected) {
      const tempItems = findPerson.Items.map((i: Item) => {
        if (i.date.toString() === curDate.toString())
          return {
            date: curDate.toString(),
            type: tempType,
            reason: values.reasonDes,
          };
        else return i;
      });
      findPerson.Items = tempItems;
    } else {
      findPerson.Items = [
        ...findPerson.Items,
        { date: curDate.toString(), type: tempType, reason: values.reasonDes },
      ];
    }
    tempData = data.records.map((h: Record) => {
      if (findPerson && h.PersonId === findPerson.PersonId) return findPerson;
      else return h;
    });
  }

  data.records = [...tempData];
  setHistories(data);
  axios.post("/api/hello", { data }).then((res) => {
    console.log("res");
    console.log(res.data);
  });
};
