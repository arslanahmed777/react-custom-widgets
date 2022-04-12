const noData = (props) => {
    //console.log(props)
    return (
        <div className=" headinginnerlink">
            <div className="d-flex align-items-center pt-2">
                {props.customMessage ? (
                    <p className="pl-2 text-danger">{props.customMessage}</p>
                ) : (
                    <p className="pl-2 ml-n3 text-danger">
                        Not {props.moduleName} Recorded Yet
                    </p>
                )}
            </div>
        </div>
    )
}
export default noData
