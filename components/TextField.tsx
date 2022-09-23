import { Field } from "formik";
import { TextFiledProps } from "../Interfaces";

const TextField = ({ errors, touched, setReason, values }: TextFiledProps) => {
  return (
    <>
      <Field id="resonDes" name="reasonDes" placeholder="Type reason" />

      {errors.reasonDes && touched.reasonDes ? (
        <div className="error">{errors.reasonDes}</div>
      ) : null}
    </>
  );
};

export default TextField;
