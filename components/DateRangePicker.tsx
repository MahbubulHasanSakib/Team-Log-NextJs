import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;
import moment from "moment";
import { DateRangePickerProps } from "../Interfaces";
const DateRangePicker = ({
  func,
  dates,
  dateFormat,
  setFieldValue,
  errors,
  touched,
}: DateRangePickerProps) => {
  return (
    <>
      <Space direction="vertical" size={12}>
        <RangePicker
          style={{
            margin: "20px 10px",
            boxShadow:
              "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;",
          }}
          onChange={func}
          name="dates"
          defaultValue={[
            moment(dates.date1, dateFormat),
            moment(dates.date2, dateFormat),
          ]}
        />
      </Space>
    </>
  );
};

export default DateRangePicker;
