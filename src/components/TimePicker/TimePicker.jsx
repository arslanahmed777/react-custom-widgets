import React, { useEffect, useState, useRef, useMemo } from 'react';
import './TimePicker.css';
import useOutsideClick from '../../hooks/useOutsideClick';
import Arrow_down from './Arrow_down.svg';
import Arrow_up from './Arrow_up.svg';
import Clock from './clock.svg';

const TimePicker = (props) => {
    const timePickerRef = useRef();
    const inputRef = useRef();

    const [showTimePicker, setShowTimePicker] = useState(false);
    const [hours, setHours] = useState('12');
    const [minutes, setMinutes] = useState('00');
    const [period, setPeriod] = useState('AM');
    const [showError, setShowError] = useState(false);
    const [styling, setStyling] = useState({});
    const [allowMinuteInput, setAllowMinuteInput] = useState(false);
    const [hrMinInputValue, setHrMinInputValue] = useState({ hour: '12', minute: '00' });
    const [allowHourInput, setAllowHourInput] = useState(false);


    // **************************  CUSTOM HELPER FUNCTION START *************************
    function toggleString(something, string1, string2) {
        return something === string1 ? string2 : string1;
    }

    function formatTime() {
        if (timeFormat === 12) return `${hours}:${minutes} ${period}`;
        return `${hours}:${minutes}`;
    }

    function parsedTime(time, unit, timeFormat) {
        if (unit === 'h') {
            if (timeFormat === 12) {
                let format12hr = {};
                for (let i = 1; i <= 12; i++) {
                    switch (true) {
                        case i <= 9:
                            format12hr[i] = '0' + i;
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
                            format24hr[i] = '0' + i;
                            break;
                        case i === 24:
                            format24hr[i] = '00';
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
                        minutesObj[i] = '0' + i;
                        break;
                    case i === 60:
                        minutesObj[i] = '00';
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

    const validateMm = (value) => {
        let isValid = null;
        isValid = /^([0-5][0-9])?$/.test(value);
        return isValid
    }

    const validateHr = (value, timeFormat) => {
        let isValid = null;
        if (timeFormat === 24) {
            isValid = /^([0-1]?[0-9]|2[0-4])?$/.test(value);
        } else {
            isValid = /^([0]\d|[1][0-2])$/i.test(value);
        }
        return isValid;
    }


    const convert24hrTo12hr = (time) => {
        // Check correct time format and split into components
        time = time
            .toString()
            .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) {
            // If time format correct
            time = time.slice(1); // Remove full string match value
            time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
    };

    const ValidateInput = (event, command = 'Numeric', allowInput = '') => {
        let allowedInputs = null;

        if (allowInput.length > 0) allowedInputs = allowInput;
        if (command === 'Numeric') allowedInputs = `0-9${allowedInputs}`;
        if (command === 'Alpha') allowedInputs = `A-za-z${allowedInputs}`;
        if (command === 'AlphaNumeric') allowedInputs = `A-za-z0-9${allowedInputs}`;
        if (command === 'AlphaNumericSpecial')
            allowedInputs = `!@#$%^&*.<>,?/{};:|'"()_+A-za-z0-9${allowedInputs}`;
        if (command === 'SpecialChar') allowedInputs = `!@#$%^&*()_+${allowedInputs}`;
        var regex = new RegExp(`^[${allowedInputs}]+$`);
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        } else {
            return true;
        }
    };

    // **************************  CUSTOM HELPER FUNCTION END *************************

    // ************************** CHANGE HOURS FUNCTON *****************
    const changeHours = (action) => {
        let parsedhours = Number(hours);
        if (action === 'ADD') {
            parsedhours += 1;
            setHours(parsedTime(parsedhours, 'h', timeFormat));
            setHrMinInputValue((prevhrmint) => ({ ...prevhrmint, hour: parsedTime(parsedhours, 'h', timeFormat) }))
        } else {
            parsedhours -= 1;
            setHours(parsedTime(parsedhours, 'h', timeFormat));
            setHrMinInputValue((prevhrmint) => ({ ...prevhrmint, hour: parsedTime(parsedhours, 'h', timeFormat) }))
        }
    };

    // ************************** CHANGE MINUTES FUNCTON *****************
    const changeMinutes = (action) => {
        let parsedminutes = Number(minutes);
        if (action === 'ADD') {
            parsedminutes += 1;
            setMinutes(parsedTime(parsedminutes, 'm', timeFormat));
            setHrMinInputValue((prevhrmint) => ({ ...prevhrmint, minute: parsedTime(parsedminutes, 'm', timeFormat) }))
        } else {
            parsedminutes -= 1;
            setMinutes(parsedTime(parsedminutes, 'm', timeFormat));
            setHrMinInputValue((prevhrmint) => ({ ...prevhrmint, minute: parsedTime(parsedminutes, 'm', timeFormat) }))
        }
    };

    // ************************** CHANGE PERIOD FUNCTON *****************
    const changePeriod = () => {
        setPeriod(toggleString(period, 'AM', 'PM'));
    };

    // ************************** UPDATE TIME FUNCTON *****************
    const updateTime = () => {
        const isValid = validateHhMm(formatTime(), timeFormat);
        const isValidMint = validateMm(hrMinInputValue.minute);
        const isValidHor = validateHr(hrMinInputValue.hour, timeFormat);
        if (isValidMint && isValidHor) {
            if (isValid) {
                inputRef.current.style.border = '1px solid #4f4f4f';
                props.changeTime(formatTime());
                setShowError(false);
            } else {
                inputRef.current.style.border = '1px solid #f93154';
                setShowError(true);
            }
            setShowTimePicker(false);
        }
    };

    // ************************** HANDLE BLUR FUNCTION *****************
    const handleBlur = (e) => {
        const isValid = validateHhMm(e.target.value, timeFormat);
        if (isValid) {
            props.changeTime(e.target.value);
            setShowError(false);
            inputRef.current.style.border = '1px solid #4f4f4f';
        } else {
            inputRef.current.style.border = '1px solid #f93154';
            setShowError(true);
        }
    };
    // ************************************************************* MINUTE INPUT SECTION *******************************************************
    // ************************** HANDLE MINUTE DOUBLE CLICK FUNCTION *************
    const handleMinDbblClk = () => {
        const isInputAllow = allowMinuteInput
        if (isInputAllow === false) {
            setAllowMinuteInput(() => true)
        }
    }

    // ************************** HANDLE MINUTE INPUT CHANGE FUNCTION *************
    const handleMinInputChange = (e) => {
        setHrMinInputValue((prevhrmint) => ({ ...prevhrmint, minute: e.target.value }))
    }

    // **************************  MINUTE INPUT BLUR FUNCTION *************
    const handleMinInputBlur = (e) => {
        console.log(validateMm(e.target.value));
        if (validateMm(e.target.value)) {
            setMinutes(e.target.value)
            setAllowMinuteInput(() => false)
            e.target.style.border = "none";
        }
        else {
            e.target.style.border = "1px solid red";
            e.target.focus()
        }
    }



    // ************************************************************ HOUR INPUT SECTION *************************************
    // ************************** HANDLE HOUR DOUBLE CLICK FUNCTION *************
    const handleHorDbblClk = () => {
        const isInputAllow = allowHourInput
        if (isInputAllow === false) {
            setAllowHourInput(() => true)
        }
    }

    // ************************** HANDLE HOUR INPUT CHANGE FUNCTION *************
    const handleHorInputChange = (e) => {
        setHrMinInputValue((prevhrmint) => ({ ...prevhrmint, hour: e.target.value }))
    }

    // ************************** HOUR INPUT BLUR FUNCTION *************
    const handleHorInputBlur = (e) => {
        // console.log(validateHr(e.target.value, timeFormat));
        if (validateHr(e.target.value, timeFormat)) {
            setHours(e.target.value)
            setAllowHourInput(() => false)
            e.target.style.border = "none";
        }
        else {
            e.target.style.border = "1px solid red";
            e.target.focus()
        }
    }

    // ************************** USEOUTSIDECLICK HOOK ******************
    useOutsideClick(timePickerRef, () => {
        const isValidMint = validateMm(hrMinInputValue.minute);
        const isValidHor = validateHr(hrMinInputValue.hour, timeFormat);
        if (isValidMint && isValidHor) {
            if (showTimePicker) {
                setShowTimePicker(false);
            }
        }

    });

    // ************************** USEMEMO HOOK ************************
    const timeFormat = useMemo(
        () => (props.timeFormat ? props.timeFormat : 12),
        [props.timeFormat]
    );
    const size = useMemo(() => (props.size ? props.size : 'XS'), [props.size]);
    const time = useMemo(
        () => (props.time ? props.time : '12:00 AM'),
        [props.time]
    );

    const updateStyling = () => {
        let styleObject = {};
        if (size === 'XS') {
            styleObject['timepickerwrapper_height'] = '50px';

            styleObject['okbtn_fontSize'] = '0.7rem';
            styleObject['okbtn_padding'] = '1px';
            styleObject['timepickerdots_fontSize'] = '0.9rem';

            styleObject['timepickerCurrent_fontSize'] = '0.8rem';
            styleObject['timepickericon_width'] = '10px';
            styleObject['iconup_top'] = '-12px';
            styleObject['icondown_bottom'] = '-12px';
        } else if (size === 'S') {
            styleObject['timepickerwrapper_height'] = '60px';

            styleObject['okbtn_fontSize'] = '0.9rem';
            styleObject['okbtn_padding'] = '4px';
            styleObject['timepickerdots_fontSize'] = '1.2rem';

            styleObject['timepickerCurrent_fontSize'] = '1rem';
            styleObject['timepickericon_width'] = '10px';
            styleObject['iconup_top'] = '-12px';
            styleObject['icondown_bottom'] = '-12px';
        } else if (size === 'M') {
            styleObject['timepickerwrapper_height'] = '70px';

            styleObject['okbtn_fontSize'] = '1rem';
            styleObject['okbtn_padding'] = '6px';
            styleObject['timepickerdots_fontSize'] = '1.4rem';

            styleObject['timepickerCurrent_fontSize'] = '1.5rem';
            styleObject['timepickericon_width'] = '12px';
            styleObject['iconup_top'] = '-15px';
            styleObject['icondown_bottom'] = '-15px';
        } else if (size === 'L') {
            styleObject['timepickerwrapper_height'] = '80px';

            styleObject['okbtn_fontSize'] = '1.2rem';
            styleObject['okbtn_padding'] = '3px';
            styleObject['timepickerdots_fontSize'] = '1.4rem';

            styleObject['timepickerCurrent_fontSize'] = '1.5rem';
            styleObject['timepickericon_width'] = '15px';
            styleObject['iconup_top'] = '-18px';
            styleObject['icondown_bottom'] = '-18px';
        } else {
            styleObject['timepickerwrapper_height'] = '60px';

            styleObject['okbtn_fontSize'] = '0.7rem';
            styleObject['okbtn_padding'] = '1px';
            styleObject['timepickerdots_fontSize'] = '0.9rem';

            styleObject['timepickerCurrent_fontSize'] = '1rem';
            styleObject['timepickericon_width'] = '10px';
            styleObject['iconup_top'] = '-12px';
            styleObject['icondown_bottom'] = '-12px';
        }
        setStyling(styleObject);
    };

    // ************************** USE EFFECT HOOK ********************

    useEffect(() => {
        const isValid = validateHhMm(time, timeFormat);
        inputRef.current.value = time;
        if (isValid) {
            const hours = time.substring(0, 2);
            const minutes = time.substring(3, 5);
            setHours(hours);
            setMinutes(minutes);
            setHrMinInputValue((prevhrmint) => ({ ...prevhrmint, minute: minutes, hour: hours }))
            if (timeFormat === 12) {
                const period = time.substring(6, 8);
                setPeriod(period);
            }
        } else {
            inputRef.current.style.border = '1px solid #f93154';
            setShowError(true);
        }
    }, [time]);
    useEffect(() => {
        updateStyling();
    }, []);

    // const changeWheel = (event) => {
    //     if (event.deltaY < 0) {
    //         console.log('scrolling up');
    //         changeHours('ADD');
    //     } else if (event.deltaY > 0) {
    //         console.log('scrolling down');
    //         changeHours('MINUS');
    //     }
    //     window.removeEventListener('scroll', () => { });
    // };

    // function disableScrolling() {
    //     var x = window.scrollX;
    //     var y = window.scrollY;
    //     window.onscroll = function () {
    //         window.scrollTo(x, y);
    //     };
    //     console.log('disable');
    // }
    // function enableScrolling() {
    //     window.onscroll = function () { };
    //     console.log('ENABLED');
    // }
    // const changeMouseEnter = () => {
    //     disableScrolling();
    // };

    // const changeMouseLeave = () => {
    //     enableScrolling();
    // };

    return (
        <div className="form-outline">
            <input type="text" ref={inputRef} onBlur={(e) => handleBlur(e)} className="timepicker-input" />
            <button onClick={() => setShowTimePicker(!showTimePicker)} id="timepicker-toggle-371513" type="button" className="timepicker-toggle-button" >
                <img src={Clock} alt="clock_icon" />
            </button>
            {showError && <div className="errordiv">Invalid Time Format</div>}
            {showTimePicker && (
                <div className="timepicker-wrapper" style={{ height: styling.timepickerwrapper_height }} ref={timePickerRef}>
                    <div className="tp_row tp_h-100 tp_w-100  g-0 tp_justify-content-center tp_align-items-center">
                        <div className="tp_col-6">
                            <div className="tp_row g-0">
                                <div className="tp_col-5 tp_d-flex tp_justify-content-center tp_align-items-center tp_position-relative  ">
                                    {allowHourInput === false && (
                                        <div className="timepicker_wrapper_icon" style={{ top: styling.iconup_top }}>
                                            <img src={Arrow_up} className="timepicker_icon" style={{ width: styling.timepickericon_width }} alt="arrow_up" onClick={() => changeHours('ADD')} />
                                        </div>
                                    )}
                                    <div className="tp_text-center">
                                        {/* <button className="timepicker-current" style={{ fontSize: styling.timepickerCurrent_fontSize }}>
                                            {hours}
                                        </button> */}
                                        <input onBlur={handleHorInputBlur} onKeyPress={(e) => ValidateInput(e, 'Numeric')} onChange={handleHorInputChange} onDoubleClick={handleHorDbblClk} readOnly={!allowHourInput} value={hrMinInputValue.hour} className="hours_minute_input" style={{ fontSize: styling.timepickerCurrent_fontSize }} type="text" />
                                    </div>

                                    {allowHourInput === false && (
                                        <div className="timepicker_wrapper_icon" style={{ bottom: styling.icondown_bottom }} >
                                            <img src={Arrow_down} className="timepicker_icon" style={{ width: styling.timepickericon_width }} alt="arrow_down" onClick={() => changeHours('MINUS')} />
                                        </div>
                                    )}
                                </div>
                                <div className="tp_col-2 tp_d-flex  tp_justify-content-center tp_align-items-center">
                                    <p className="timepicker-dots" style={{ fontSize: styling.timepickerdots_fontSize }}>
                                        :
                                    </p>
                                </div>
                                <div className="tp_col-5 tp_d-flex tp_justify-content-center tp_align-items-center tp_position-relative  ">
                                    {allowMinuteInput === false && (
                                        <div className="timepicker_wrapper_icon" style={{ top: styling.iconup_top }} >
                                            <img src={Arrow_up} className="timepicker_icon" style={{ width: styling.timepickericon_width }} alt="arrow_up" onClick={() => changeMinutes('ADD')} />
                                        </div>
                                    )}

                                    <div className="tp_text-center">
                                        {/* <button className="timepicker-current" style={{ fontSize: styling.timepickerCurrent_fontSize }} >
                                            {minutes}
                                        </button> */}
                                        <input onBlur={handleMinInputBlur} onKeyPress={(e) => ValidateInput(e, 'Numeric')} onChange={handleMinInputChange} onDoubleClick={handleMinDbblClk} readOnly={!allowMinuteInput} value={hrMinInputValue.minute} className="hours_minute_input" style={{ fontSize: styling.timepickerCurrent_fontSize }} type="text" />
                                    </div>
                                    {allowMinuteInput === false && (
                                        <div className="timepicker_wrapper_icon" style={{ bottom: styling.icondown_bottom }} >
                                            <img src={Arrow_down} alt="arrow_down" className="timepicker_icon" style={{ width: styling.timepickericon_width }} onClick={() => changeMinutes('MINUS')} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="tp_col-6">
                            <div className="tp_row tp_justify-content-evenly">
                                {timeFormat === 12 && (
                                    <div className="tp_col-5  tp_d-flex tp_justify-content-center tp_align-items-center tp_position-relative  ">
                                        <div className="timepicker_wrapper_icon" style={{ top: styling.iconup_top }}>
                                            <img src={Arrow_up} className="timepicker_icon" style={{ width: styling.timepickericon_width }} alt="arrow_up" onClick={changePeriod} />
                                        </div>
                                        <div>
                                            <button className="timepicker-current" style={{ fontSize: styling.timepickerCurrent_fontSize }} >
                                                {period}
                                            </button>
                                        </div>

                                        <div className="timepicker_wrapper_icon " style={{ bottom: styling.icondown_bottom }} >
                                            <img src={Arrow_down} alt="arrow_down" className="timepicker_icon" style={{ width: styling.timepickericon_width }} onClick={changePeriod} />
                                        </div>
                                    </div>
                                )}
                                <div className="tp_col-3 tp_d-flex tp_justify-content-center tp_align-items-center  ">
                                    <div>
                                        <button className="ok_btn" style={{ fontSize: styling.okbtn_fontSize, padding: styling.okbtn_padding, }} onClick={updateTime}>
                                            OK
                                        </button>
                                    </div>

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
