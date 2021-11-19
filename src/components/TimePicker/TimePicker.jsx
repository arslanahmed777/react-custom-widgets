import React, { useEffect, useRef, useMemo } from "react";
import "./TimePicker.css";
import { FaRegClock } from "react-icons/fa";

import { useNamedState } from "../../hooks/useNamedState";
import useOutsideClick from "../../hooks/useOutsideClick";
import Arrow_down from "./Arrow_down.svg";
import Arrow_up from "./Arrow_up.svg";

const TimePicker = (props) => {
  const timePickerRef = useRef();
  const inputRef = useRef();

  const [showTimePicker, setShowTimePicker] = useNamedState(
    "showTimePicker",
    false
  );
  const [hours, setHours] = useNamedState("hours", "12");
  const [minutes, setMinutes] = useNamedState("minutes", "00");
  const [period, setPeriod] = useNamedState("period", "AM");
  const [showError, setShowError] = useNamedState("showError", false);
  const [styling, setStyling] = useNamedState("styling", {});

  // **************************  CUSTOM HELPER FUNCTION START *************************
  function toggleString(something, string1, string2) {
    return something === string1 ? string2 : string1;
  }

  function formatTime() {
    if (timeFormat === 12) return `${hours}:${minutes} ${period}`;
    return `${hours}:${minutes}`;
  }

  function parsedTime(time, unit, timeFormat) {
    if (unit === "h") {
      if (timeFormat === 12) {
        let format12hr = {};
        for (let i = 1; i <= 12; i++) {
          switch (true) {
            case i <= 9:
              format12hr[i] = "0" + i;
              break;
            default:
              format12hr[i] = i.toString();
          }
        }

        if (time === 13) return format12hr[1];
        if (time === 0) return format12hr[12];
        return format12hr[time];
      } else {
        let format24hr = {};
        for (let i = 1; i <= 24; i++) {
          switch (true) {
            case i <= 9:
              format24hr[i] = "0" + i;
              break;
            case i === 24:
              format24hr[i] = "00";
              break;
            default:
              format24hr[i] = i.toString();
          }
        }
        if (time === 0) return format24hr[24];
        if (time === -1) return format24hr[23];
        return format24hr[time];
      }
    } else {
      let minutesObj = {};
      for (let i = 1; i <= 60; i++) {
        switch (true) {
          case i <= 9:
            minutesObj[i] = "0" + i;
            break;
          case i === 60:
            minutesObj[i] = "00";
            break;
          default:
            minutesObj[i] = i.toString();
        }
      }
      if (time === 0) return minutesObj[60];
      if (time === -1) return minutesObj[59];
      return minutesObj[time];
    }
  }

  const validateHhMm = (inputField, timeformat) => {
    let isValid = null;
    if (timeformat === 24) {
      isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(
        inputField
      );
    } else {
      isValid = /^([0]\d|[1][0-2]):([0-5]\d)\s?(?: AM|PM)$/i.test(inputField);
    }

    return isValid;
  };

  // **************************  CUSTOM HELPER FUNCTION END *************************

  // ************************** CHANGE HOURS FUNCTON *****************
  const changeHours = (action) => {
    let parsedhours = Number(hours);
    if (action === "ADD") {
      parsedhours += 1;
      setHours(parsedTime(parsedhours, "h", timeFormat));
    } else {
      parsedhours -= 1;
      setHours(parsedTime(parsedhours, "h", timeFormat));
    }
  };

  // ************************** CHANGE MINUTES FUNCTON *****************
  const changeMinutes = (action) => {
    let parsedminutes = Number(minutes);
    if (action === "ADD") {
      parsedminutes += 1;
      setMinutes(parsedTime(parsedminutes, "m", timeFormat));
    } else {
      parsedminutes -= 1;
      setMinutes(parsedTime(parsedminutes, "m", timeFormat));
    }
  };

  // ************************** CHANGE PERIOD FUNCTON *****************
  const changePeriod = () => {
    setPeriod(toggleString(period, "AM", "PM"));
  };

  // ************************** UPDATE TIME FUNCTON *****************
  const updateTime = () => {

    const isValid = validateHhMm(formatTime(), timeFormat);
    if (isValid) {
      inputRef.current.style.border = '1px solid #4f4f4f';
      props.changeTime(formatTime())
      setShowError(false)
    } else {
      inputRef.current.style.border = '1px solid #f93154';
      setShowError(true)
    }
    setShowTimePicker(false);
  };



  // ************************** HANDLE BLUR FUNCTION *****************
  const handleBlur = (e) => {
    const isValid = validateHhMm(e.target.value, timeFormat);
    if (isValid) {
      props.changeTime(e.target.value)
      setShowError(false);
      inputRef.current.style.border = "1px solid #4f4f4f";
    } else {
      inputRef.current.style.border = "1px solid #f93154";
      setShowError(true);
    }

  };

  // ************************** USEOUTSIDECLICK HOOK ******************
  useOutsideClick(timePickerRef, () => {
    if (showTimePicker) {
      setShowTimePicker(false);
    }
  });

  // ************************** USEMEMO HOOK ************************
  const timeFormat = useMemo(() => (props.timeFormat ? props.timeFormat : 12), [props.timeFormat]);
  const size = useMemo(() => (props.size ? props.size : "XS"), [props.size]);
  const time = useMemo(() => (props.time ? props.time : "12:00 AM"), [props.time]);

  const updateStyling = () => {
    let styleObject = {};
    if (size === "XS") {
      styleObject["okbtn_fontSize"] = "0.8rem";
      styleObject["timepickerCurrent_fontSize"] = "1rem";
      styleObject["iconup_top"] = "-3px";
      styleObject["icondown_bottom"] = "-3px";
    } else if (size === "S") {
      styleObject["okbtn_fontSize"] = "1.5rem";
      styleObject["timepickerCurrent_fontSize"] = "1rem";
      styleObject["iconup_top"] = "-3px";
      styleObject["icondown_bottom"] = "-3px";
    } else {
      styleObject["okbtn_fontSize"] = "0.5rem";
      styleObject["timepickerCurrent_fontSize"] = "1rem";
      styleObject["iconup_top"] = "-3px";
      styleObject["icondown_bottom"] = "-3px";
    }
    setStyling(styleObject);
  };

  // ************************** USE EFFECT HOOK ********************

  useEffect(() => {
    const isValid = validateHhMm(time, timeFormat);
    inputRef.current.value = time
    if (isValid) {
      const hours = time.substring(0, 2)
      const minutes = time.substring(3, 5)
      setHours(hours)
      setMinutes(minutes)
      if (timeFormat === 12) {
        const period = time.substring(6, 8)
        setPeriod(period)
      }
    }
    else {
      inputRef.current.style.border = '1px solid #f93154';
      setShowError(true)
    }

  }, [time])
  useEffect(() => {
    updateStyling();
  }, []);
  console.log("timePicker Render");

  return (
    <div className="form-outline">
      <input type="text" ref={inputRef} onBlur={(e) => handleBlur(e)} className="timepicker-input" />
      <button onClick={() => setShowTimePicker(!showTimePicker)} id="timepicker-toggle-371513" type="button" className="timepicker-toggle-button">
        <FaRegClock />
      </button>
      {showError && <div className="errordiv">Invalid Time Format</div>}
      {showTimePicker && (
        <div className="timepicker-wrapper" ref={timePickerRef}>
          <div className="row h-100 w-100  g-0 justify-content-center align-items-center">
            <div className="col-6">
              <div className="row g-0">
                <div className="col-5  d-flex justify-content-center align-items-center position-relative  ">
                  <div className="timepicker_wrapper_icon" style={{ top: styling.iconup_top }}>
                    <img src={Arrow_up} style={{ width: "12px" }} className="timepicker_icon" alt="arrow_up" onClick={() => changeHours("ADD")} />
                  </div>
                  <button className="timepicker-current" style={{ fontSize: styling.timepickerCurrent_fontSize }}>{hours}</button>
                  <div className="timepicker_wrapper_icon" style={{ bottom: styling.icondown_bottom }}>
                    <img src={Arrow_down} style={{ width: "12px" }} alt="arrow_down" onClick={() => changeHours("MINUS")} className="timepicker_icon" />
                  </div>
                </div>
                <div className="col-2  d-flex  justify-content-center align-items-center">
                  <p className="timepicker-dots">:</p>
                </div>
                <div className="col-5  d-flex justify-content-center align-items-center position-relative  ">
                  <div className="timepicker_wrapper_icon" style={{ top: styling.iconup_top }}>
                    <img src={Arrow_up} style={{ width: "12px" }} className="timepicker_icon" alt="arrow_up" onClick={() => changeMinutes("ADD")} />
                  </div>
                  <button className="timepicker-current">{minutes}</button>
                  <div className="timepicker_wrapper_icon" style={{ bottom: styling.icondown_bottom }} >
                    <img src={Arrow_down} style={{ width: "12px" }} alt="arrow_down" onClick={() => changeMinutes("MINUS")} className="timepicker_icon" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row justify-content-end g-0">
                {timeFormat === 12 && (
                  <div className="col-5   d-flex justify-content-center align-items-center position-relative  ">
                    <div className="timepicker_wrapper_icon" style={{ top: styling.iconup_top }}>
                      <img src={Arrow_up} style={{ width: "12px" }} className="timepicker_icon" alt="arrow_up" onClick={changePeriod} />
                    </div>
                    <button className="timepicker-current" style={{ fontSize: styling.timepickerCurrent_fontSize }}>
                      {period}
                    </button>
                    <div className="timepicker_wrapper_icon " style={{ bottom: styling.icondown_bottom }} >
                      <img src={Arrow_down} style={{ width: "12px" }} alt="arrow_down" onClick={changePeriod} className="timepicker_icon" />
                    </div>
                  </div>
                )}
                <div className="col-3  d-flex justify-content-center align-items-center  ">
                  <button className="ok_btn" style={{ fontSize: styling.okbtn_fontSize }} onClick={updateTime}>OK</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(TimePicker);
