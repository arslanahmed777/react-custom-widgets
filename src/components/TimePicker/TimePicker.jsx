import React, { useEffect, useRef, useMemo } from 'react'
import "./TimePicker.css"
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

import { useNamedState } from "../../hooks/useNamedState"
import useOutsideClick from "../../hooks/useOutsideClick"

const TimePicker = (props) => {
    const timePickerRef = useRef();

    const [showTimePicker, setShowTimePicker] = useNamedState("showTimePicker", false);
    const [hours, setHours] = useNamedState("hours", "12");
    const [minutes, setMinutes] = useNamedState("minutes", "00");
    const [period, setPeriod] = useNamedState("period", "AM");
    const [time, setTime] = useNamedState("time", "12:00 AM");



    // **************************  CUSTOM HELPER FUNCTION START *************************
    function toggleString(something, string1, string2) {
        return something === string1 ? string2 : string1;
    }

    function formatTime() {
        if (timeFormat === 12) return `${hours}:${minutes} ${period}`
        return `${hours}:${minutes}`
    }

    function parsedTime(time, unit, timeFormat) {
        if (unit === "h") {
            if (timeFormat === 12) {
                let format12hr = { 1: "01", 2: "02", 3: "03", 4: "04", 5: "05", 6: "06", 7: "07", 8: "08", 9: "09", 10: "10", 11: "11", 12: "12", }
                if (time === 13) return format12hr[1]
                if (time === 0) return format12hr[12]
                return format12hr[time]
            }
            else {

                let format24hr = { 1: "01", 2: "02", 3: "03", 4: "04", 5: "05", 6: "06", 7: "07", 8: "08", 9: "09", 10: "10", 11: "11", 12: "12", 13: "13", 14: "14", 15: "15", 16: "16", 17: "17", 18: "18", 19: "19", 20: "20", 21: "21", 22: "22", 23: "23", 24: "00", }
                if (time === 0) return format24hr[24]
                if (time === -1) return format24hr[23]
                return format24hr[time]
            }
        }
        else {
            let minutesObj = { 1: "01", 2: "02", 3: "03", 4: "04", 5: "05", 6: "06", 7: "07", 8: "08", 9: "09", 10: "10", 11: "11", 12: "12", 13: "13", 14: "14", 15: "15", 16: "16", 17: "17", 18: "18", 19: "19", 20: "20", 21: "21", 22: "22", 23: "23", 24: "25", 26: "26", 27: "27", 28: "28", 29: "29", 30: "31", 32: "32", 33: "33", 34: "34", 35: "35", 36: "36", 37: "37", 38: "39", 40: "40", 41: "41", 42: "42", 43: "43", 44: "45", 46: "46", 47: "47", 48: "48", 49: "49", 50: "50", 51: "51", 52: "52", 53: "53", 54: "54", 55: "55", 56: "56", 57: "57", 58: "58", 59: "59", 60: "00", }
            if (time === 0) return minutesObj[60]
            if (time === -1) return minutesObj[59]
            return minutesObj[time]
        }

    }


    // **************************  CUSTOM HELPER FUNCTION END *************************





    // ************************** CHANGE HOURS FUNCTON *****************
    const changeHours = (action) => {
        let parsedhours = Number(hours)
        if (action === "ADD") {
            parsedhours += 1
            setHours(parsedTime(parsedhours, "h", timeFormat))
        }
        else {
            parsedhours -= 1
            setHours(parsedTime(parsedhours, "h", timeFormat))
        }
    }




    // ************************** CHANGE MINUTES FUNCTON *****************
    const changeMinutes = (action) => {
        let parsedminutes = Number(minutes)
        if (action === "ADD") {
            parsedminutes += 1
            setMinutes(parsedTime(parsedminutes, "m", timeFormat))
        }
        else {
            parsedminutes -= 1
            setMinutes(parsedTime(parsedminutes, "m", timeFormat))
        }

    }




    // ************************** CHANGE PERIOD FUNCTON *****************
    const changePeriod = () => {
        setPeriod(toggleString(period, "AM", "PM"))
    }


    // ************************** UPDATE TIME FUNCTON *****************
    const updateTime = () => {
        setTime(() => {
            return formatTime()
        })
        setShowTimePicker(false);
    }

    // ************************** USEOUTSIDECLICK HOOK ******************
    useOutsideClick(timePickerRef, () => {
        if (showTimePicker) {
            setShowTimePicker(false);
        }
    });


    // ************************** USEMEMO HOOK ************************
    const timeFormat = useMemo(() => props.timeFormat ? props.timeFormat : 12, [props.timeFormat]);





    // ************************** USE EFFECT FUNCTION ********************
    useEffect(() => {
        props.changeTime(time)
    }, [time, timeFormat])


    console.log("timePicker Render");

    return (
        <div className="form-outline"  >
            <input type="text" value={time} className="timepicker-input" />
            <button onClick={() => setShowTimePicker(!showTimePicker)} id="timepicker-toggle-371513" type="button" className="timepicker-toggle-button">😄</button>
            {showTimePicker && (
                <div className="timepicker-wrapper" ref={timePickerRef}>
                    <div className="row h-100 w-100  g-0 justify-content-center align-items-center">
                        <div className="col-6">
                            <div className="row g-0">
                                <div className="col-5 d-flex justify-content-center align-items-center position-relative  ">
                                    <div className="timepicker_wrapper_icon timepicker_wrapper_icon_up">
                                        <FaAngleUp className="timepicker_icon" onClick={() => changeHours("ADD")} />
                                    </div>
                                    <button className="timepicker-current">{hours}</button>
                                    <div className="timepicker_wrapper_icon timepicker_wrapper_icon_down" >
                                        <FaAngleDown className="timepicker_icon" onClick={() => changeHours("MINUS")} />
                                    </div>
                                </div>
                                <div className="col-2 d-flex  justify-content-center align-items-center">
                                    <p className="timepicker-dots">:</p>
                                </div>
                                <div className="col-5 d-flex justify-content-center align-items-center position-relative  " >
                                    <div className="timepicker_wrapper_icon timepicker_wrapper_icon_up">
                                        <FaAngleUp className="timepicker_icon" onClick={() => changeMinutes("ADD")} />
                                    </div>
                                    <button className="timepicker-current">{minutes}</button>
                                    <div className="timepicker_wrapper_icon timepicker_wrapper_icon_down" >
                                        <FaAngleDown className="timepicker_icon" onClick={() => changeMinutes("MINUS")} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row justify-content-end g-0">
                                {timeFormat === 12 && (
                                    <div className="col-5  d-flex justify-content-center align-items-center position-relative  ">
                                        <div className="timepicker_wrapper_icon timepicker_wrapper_icon_up">
                                            <FaAngleUp className="timepicker_icon" onClick={changePeriod} />
                                        </div>
                                        <button className="timepicker-current">{period}</button>
                                        <div className="timepicker_wrapper_icon timepicker_wrapper_icon_down" >
                                            <FaAngleDown className="timepicker_icon" onClick={changePeriod} />
                                        </div>
                                    </div>
                                )}

                                <div className="col-3 d-flex justify-content-center align-items-center  ">
                                    <button className="ok_btn" onClick={updateTime} >OK</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}

        </div>
    )
}

export default TimePicker
