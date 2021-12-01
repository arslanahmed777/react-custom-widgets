import React, { useState, useEffect } from 'react'
import TimePicker from "../components/TimePicker/TimePicker"

const TimePickerPage = () => {
    const [time, setTime] = useState("10:00 AM")
    const changeTime = (time) => {
        console.log("i run", time);
        setTime(time)
    }
    return (
        <div className="container mt-5">
            <div className="row">
                <div>
                    <button className="btn btn-success" onClick={() => setTime("01:00 AM")}>change to 01:00 AM</button>
                    <button className="btn btn-success" onClick={() => setTime("12:26")}>change to 12:26"</button>
                    <button className="btn btn-primary btn-block btn-lg">{time}</button>
                </div>
                <div className="col-md-2 border ">
                    <TimePicker size="S" time={time} changeTime={changeTime} timeFormat={12} />
                </div>

            </div>

        </div>
    )
}

export default TimePickerPage
