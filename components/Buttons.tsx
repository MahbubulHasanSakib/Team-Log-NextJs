import React from "react";
import ButtonStyles from "../styles/Button.module.css";
import { ButtonProps } from "../Interfaces";

const Buttons = ({
  size,
  values,
  setTempColor,
  setSize,
  isSubmitting,
  setFieldValue,
  errors,
  touched,
}: ButtonProps) => {
  return (
    <div className={`all-btns ${ButtonStyles.allButtons}`}>
      <button
        disabled={
          !errors.reasonDes &&
          !errors.selectedDate &&
          !errors.selectedType &&
          values.reasonDes !== "" &&
          values.selectedDate !== "" &&
          values.selectedType !== ""
            ? false
            : true
        }
        style={{
          width: size.w1?.toString(),
          height: size.h1?.toString(),
        }}
        type="submit"
        className={`btn btn-secondary ${ButtonStyles.btnMargin}`}
      >
        Save &#38; request approval
      </button>
      <button
        type="button"
        disabled={isSubmitting}
        style={{
          width: size.w2?.toString(),
          height: size.h2?.toString(),
        }}
        onClick={() => {
          setTempColor(1);
          setSize({ size: {}, w2: "100px", h2: "50px" });
          setFieldValue("selectedType", "1");
        }}
        className={`btn ${ButtonStyles.btn_h} ${ButtonStyles.btnMargin}`}
      >
        Holiday
      </button>
      <button
        disabled={isSubmitting}
        style={{
          width: size.w3?.toString(),
          height: size.h3?.toString(),
        }}
        onClick={() => {
          setTempColor(2);
          setSize({ size: {}, w3: "100px", h3: "50px" });
          setFieldValue("selectedType", "2");
        }}
        type="button"
        className={`btn ${ButtonStyles.btn_s} ${ButtonStyles.btnMargin}`}
      >
        Sick
      </button>
      <button
        disabled={isSubmitting}
        style={{
          width: size.w4?.toString(),
          height: size.h4?.toString(),
        }}
        onClick={() => {
          setTempColor(3);
          setSize({ size: {}, w4: "100px", h4: "50px" });
          setFieldValue("selectedType", "3");
        }}
        type="button"
        className={`btn ${ButtonStyles.btn_m}`}
      >
        Misc
      </button>
      {errors.selectedType && touched.selectedType ? (
        <div className="error">{errors.selectedType}</div>
      ) : null}
    </div>
  );
};

export default Buttons;
