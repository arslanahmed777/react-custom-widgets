import React from 'react'
import TimePicker from "../components/TimePicker/TimePicker"

const TimePickerPage = () => {
    const changeTime = (time) => {
        console.log("i run", time);
    }
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-5 border p-5">
                    <TimePicker changeTime={changeTime} timeFormat={12} />
                </div>

            </div>

        </div>
    )
}

export default TimePickerPage
