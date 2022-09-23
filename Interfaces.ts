import { FormikErrors, FormikTouched } from "formik";
import { Interface } from "readline";
export interface MyFormValues {
  reasonDes: string;
  selectedType: string;
  selectedDate: string;
}

export interface Sz {
  w1: String;
  h1: String;
  w2: String;
  h2: String;
  w3: String;
  h3: String;
  w4: String;
  h4: String;
}
export interface ButtonProps {
  size: Sz;
  setTempColor: React.Dispatch<React.SetStateAction<number>>;
  setSize: React.Dispatch<React.SetStateAction<Object>>;
  isSubmitting: boolean;
  errors: FormikErrors<MyFormValues>;
  touched: FormikTouched<MyFormValues>;
  setFieldValue: (
    field: string,
    value: string,
    shouldValidate?: boolean
  ) => void;
  values: { [field: string]: any };
}

export interface DateRangePickerProps {
  func: (range: any) => any;
  dates: DateInterface;
  dateFormat: string;
  errors: FormikErrors<MyFormValues>;
  touched: FormikTouched<MyFormValues>;
  setFieldValue: (
    field: string,
    value: string,
    shouldValidate?: boolean
  ) => void;
}
export interface DateInterface {
  date1: Date;
  date2: Date;
}
export interface TextFiledProps {
  errors: FormikErrors<MyFormValues>;
  touched: FormikTouched<MyFormValues>;
  setReason: (s: string) => void;
  values: { [field: string]: any };
}
export interface Item {
  date: string;
  type: number;
  reason: string;
}
export interface Record {
  PersonId: number;
  PersonName: string;
  Items: Array<Item>;
}
export interface IData {
  records: Array<Record>;
}
export interface DataInterface {
  data: { records: Array<Record> };
}
export interface DayType {
  name: string;
  value: number;
}
