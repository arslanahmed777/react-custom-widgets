import React from 'react'
import "./TimePicker.css"

const TimePicker = () => {
    return (
        <div className="form-outline" >
            <input type="text" className="timepicker-input" />
            <button id="timepicker-toggle-371513" tabindex="0" type="button" className="timepicker-toggle-button">😄</button>
            <div className="timepicker-wrapper">
                <div className="row g-0 justify-content-center align-items-center">
                    <div className="col-6">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <div className="row g-0">
                                    <div className="col-12 d-flex justify-content-center align-items-end">
                                        <span className="arrow">^</span>
                                    </div>
                                    <div className="col-12">
                                        <button type="button" className="timepicker-current">02</button>
                                    </div>
                                    <div className="col-12 d-flex justify-content-center align-items-end">
                                        <span className="arrow">^</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 d-flex justify-content-center align-items-center ">
                                <span className="timepicker_dots"> :</span>
                            </div>
                            <div className="col-md-4">
                                <div className="row g-0">
                                    <div className="col-12 d-flex justify-content-center align-items-end">
                                        <span className="arrow">^</span>
                                    </div>
                                    <div className="col-12">
                                        <button type="button" className="timepicker-current">02</button>
                                    </div>
                                    <div className="col-12 d-flex justify-content-center align-items-end">
                                        <span className="arrow">‹</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        asfsdf
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimePicker
