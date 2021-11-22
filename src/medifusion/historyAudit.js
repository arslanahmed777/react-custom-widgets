import React, { Component } from 'react'
import { Table } from '../shared/LatestTable/Table'
import { callApi } from '../../../src/utils/call-api'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import validator from '../../../src/utils/validator'
import { enumUtil } from '../shared/enum'
import isNull from '../../utils/null-checking'
import Format from '../../utils/formatDate'
import TimeFormatter from '../../utils/timeformatter'
//import GetCurrentTime from '../../utils/GetCurrentTime'
import ConvertTime12to24 from '../../utils/TimeZoneConverter'
import TimePicker from "../shared/TimePicker/TimePicker"

class historyAudit extends Component {
    constructor(props) {
        super(props)
        this.validationModel = {
            datefromS: '',
            datefromF: '',
            fromDate: '',
            toDate: '',
            from_to_less_equal: '',
            toTime: '',
            DateFromLessAndEqualToDateTo: '',
        }
        this.searchModel = {
            addedBy: '',
            datefrom: Format(new Date(), 'yyyy-mm-dd'),
            dateto: Format(new Date(), 'yyyy-mm-dd'),
        }
        this.state = {
            searchModel: this.searchModel,
            AuditData: [],
            clients: [],
            validationModel: this.validationModel,
            saveClicked: false,
            currentPage: 1,
            rowPerPage: 10,
            totalPages: 0,

            fromTime: TimeFormatter('00:00'),
            toTime: '',
            fromTimeError: false,

            toTimeError: false,
            moduleid: this.props.moduleid,
            moduleName: '',
            isDeleted: this.props.isDeleted,
            time: "02:00 PM"
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.moduleName) {
            return {
                moduleName: props.moduleName,
            }
        } else {
            return null
        }
    }

    SetValidattion = () => {
        this.setState({
            validationModel: {
                datefromS: validator(
                    [this.state.searchModel.datefrom, this.state.searchModel.dateto],
                    enumUtil.enumValidationType.DateFromLessAndEqualToDateTo,
                ),
                from_to_less_equal: validator(
                    [this.state.searchModel.datefrom, this.state.searchModel.dateto],
                    enumUtil.enumValidationType.SelectDate,
                ),
                datefromF: validator(
                    this.state.searchModel.datefrom,
                    enumUtil.enumValidationType.FutureData,
                ),
                fromDate: validator(
                    this.state.searchModel.datefrom,
                    enumUtil.enumValidationType.Required,
                ),
                toDate: validator(
                    this.state.searchModel.dateto,
                    enumUtil.enumValidationType.Required,
                ),
                fromTime: validator(
                    this.state.fromTime,
                    enumUtil.enumValidationType.Required,
                ),
                toTime: validator(
                    this.state.toTime,
                    enumUtil.enumValidationType.Required,
                ),
            },
        })
    }
    async componentDidMount() {
        let time = this.props.serverTime.split(':')
        await this.setState({
            toTime: `${time[0]}:${time[1]} ${time[2].split(' ')[1]}`,
        })
        if (this.state.isDeleted) {
            this.getDeletedRecords()
        } else {
            this.getAuditLog()
        }
    }

    getAuditLog = async () => {
        let dummtClients = [...this.props.practiceUsers]
        dummtClients.unshift({
            userName: 'Please Select',
            id: 0,
        })
        this.setState({
            clients: dummtClients,
        })

        let id = this.state.moduleid
        let Module_NAME = 'moduleId'
        if (this.props.modalname === 'Patient Log') {
            Module_NAME = 'patientId'
        } else {
            Module_NAME = 'moduleId'
        }

        if (!isNull(this.props.callingFrom)) {
            let body = {
                param_list: [
                    {
                        key: 'modulename',
                        value: this.state.moduleName,
                    },
                    {
                        key: this.props.idKeyName,
                        value: id,
                    },
                    {
                        key: 'fromdate',
                        value: this.state.searchModel.datefrom + ' ' + this.state.fromTime,
                    },
                    {
                        key: 'todate',
                        value: this.state.searchModel.dateto + ' ' + this.state.toTime,
                    },
                ],
                pageNo: this.state.currentPage,
                PerPage: this.state.rowPerPage,
            }

            callApi(`/Audit/${this.props.callingFrom}`, 'post', body)
                .then(async (res) => {
                    this.setState({
                        AuditData: res,
                        totalPages: !isNull(res) ? res[0].totalRecords : 0,
                    })
                })
                .catch((error) => { })
        } else {
            if (this.state.isDeleted) {
                await this.setState({
                    fromTime: this.state.isDeleted ? '' : this.state.fromTime,
                    toTime: this.state.isDeleted ? '' : this.state.toTime,
                    searchModel: {
                        ...this.state.searchModel,
                        datefrom: this.state.isDeleted
                            ? ''
                            : this.state.searchModel.datefrom,
                        dateto: this.state.isDeleted ? '' : this.state.searchModel.dateto,
                    },
                })
            }
            let body = {
                param_list: [
                    {
                        key: 'moduleName',
                        value: this.state.moduleName,
                    },
                    {
                        key: Module_NAME,
                        value: id,
                    },
                    {
                        key: 'user',
                        value: this.state.searchModel.addedBy,
                    },
                    {
                        key: 'datefrom',
                        value: this.state.searchModel.datefrom + ' ' + this.state.fromTime,
                    },
                    {
                        key: 'dateto',
                        value: this.state.searchModel.dateto + ' ' + this.state.toTime,
                    },
                ],
                pageNo: this.state.currentPage,
                PerPage: this.state.rowPerPage,
            }
            callApi('/Audit/GetAudit', 'post', body)
                .then(async (res) => {
                    this.setState({
                        AuditData: res,
                        totalPages: !isNull(res) ? res[0].totalRecords : 0,
                        isDeleted: false,
                    })
                })
                .catch((error) => { })
        }
    }
    handleSearch = async () => {
        await this.SetValidattion()
        let validation = validator(
            [this.state.validationModel],
            enumUtil.enumValidationType.NullCheck,
        )

        if (validation) {
            this.setState({ saveClicked: true })
            return
        } else {
            this.setState({ saveClicked: false })
        }

        let id = this.state.moduleid

        if (!isNull(this.props.callingFrom)) {
            let body = {
                param_list: [
                    {
                        key: 'modulename',
                        value: this.state.moduleName,
                    },
                    {
                        key: this.props.idKeyName,
                        value: id,
                    },
                    {
                        key: 'fromdate',
                        value: this.state.searchModel.datefrom + ' ' + this.state.fromTime,
                    },
                    {
                        key: 'todate',
                        value: this.state.searchModel.dateto + ' ' + this.state.toTime,
                    },
                ],
                pageNo: this.state.currentPage,
                PerPage: this.state.rowPerPage,
            }

            callApi(`/Audit/${this.props.callingFrom}`, 'post', body)
                .then(async (res) => {
                    this.setState({
                        AuditData: res,
                        totalPages: !isNull(res) ? res[0].totalRecords : 0,
                    })
                })
                .catch((error) => { })
        } else {
            let body = {
                param_list: [
                    {
                        key: 'moduleName',
                        value: this.state.moduleName,
                    },
                    {
                        key: 'moduleId',
                        value: id,
                    },
                    {
                        key: 'user',
                        value: this.state.searchModel.addedBy,
                    },
                    {
                        key: 'datefrom',
                        value: this.state.searchModel.datefrom + ' ' + this.state.fromTime,
                    },
                    {
                        key: 'dateto',
                        value: this.state.searchModel.dateto + ' ' + this.state.toTime,
                    },
                ],
                pageNo: this.state.currentPage,
                PerPage: this.state.rowPerPage,
            }
            callApi('/Audit/GetAudit', 'post', body)
                .then(async (res) => {
                    this.setState({
                        AuditData: res,
                    })
                })
                .catch((error) => { })
        }
    }

    handleRowClicked = async (event) => { }
    handler = (e) => {
        this.setState(
            {
                searchModel: {
                    ...this.state.searchModel,
                    [e.target.name]:
                        e.target.value === 'Please Select' ? '' : e.target.value,
                },
            },
            async () => {
                await this.SetValidattion()
            },
        )
    }
    getDeletedRecords = async () => {
        let body = {
            param_list: [
                { key: 'modulename', value: this.props.moduleName },
                { key: 'patientid', value: this.props.patientId },
                { key: 'patientnotesid', value: this.props.patientnotesid },
            ],
            pageNo: this.state.currentPage,
            PerPage: this.state.rowPerPage,
        }
        callApi('/Audit/GetDeletedRecords', 'post', body)
            .then(async (res) => {
                this.setState({
                    AuditData: res,
                })
            })
            .catch((error) => { })
    }

    handlePerRowsChange = (rowPerPage, pageno) => {
        this.setState(
            {
                currentPage: pageno,
                rowPerPage: rowPerPage,
            },
            () => this.getAuditLog(),
        )
    }
    handlePageChange = (pageno) => {
        this.setState(
            {
                currentPage: pageno,
            },
            () => this.getAuditLog(),
        )
    }

    // to changeFromTimeHandler
    changeFromTimeHandler = (e) => {
        let value = TimeFormatter(e.target.value)
        this.setState(
            {
                fromTime: value,
            },
            async () => {
                await this.SetValidattion()
            },
        )
    }

    changeToTimeHandler = (e) => {
        let value = TimeFormatter(e.target.value)
        this.setState(
            {
                toTime: value,
            },
            async () => {
                await this.SetValidattion()
            },
        )
    }
    showDetails = async (id) => {
        await this.setState({
            moduleid: id,
        })
        this.getAuditLog()
    }
    changeTime = (time) => {
        this.setState({
            fromTime: time
        })
    }
    render() {
        const coloumn = this.state.isDeleted
            ? [
                {
                    Header: 'NAME',
                    // width:'10%',

                    Cell: ({ row }) => (
                        <span
                            style={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                //width:'20%'
                            }}
                            data-toggle="tooltip"
                            data-placement="top"
                            title={row.original.name}
                        >
                            {row.original.name}
                        </span>
                    ),
                },
                {
                    Header: 'UPDATED BY',
                    accessor: 'updatedby',
                    Footer: '',
                    // width:'30%'
                },
                {
                    Header: 'UPDATED DATE',
                    accessor: 'updatedDate',
                    Footer: '',
                    //width:'30%'
                },

                {
                    Header: 'DETAILS',
                    //width:'30%',
                    Cell: ({ row }) => (
                        <span
                            className="anchor-tag"
                            onClick={() => this.showDetails(row.original.id)}
                        >
                            Details
                        </span>
                    ),
                },
            ]
            : [
                {
                    Header: 'COLUMN NAME',
                    accessor: 'columnName',
                    Footer: '',
                },
                {
                    Header: 'CURRENT VALUE',
                    accessor: 'currentValue',
                    Footer: '',
                },
                {
                    Header: 'NEW VALUE',
                    accessor: 'newValue',
                    Footer: '',
                },

                {
                    Header: 'ADDED BY',
                    accessor: 'addedBy',
                    Footer: '',
                },
                {
                    Header: 'ADDED DATE',
                    accessor: 'addedDate',
                    Footer: '',
                },
                {
                    Header: 'EVENT TYPE',
                    accessor: 'eventType',
                    Footer: '',
                },
            ]

        const { totalPages } = this.state

        return (
            <>
                <div
                    className="modal  displayblock"
                    id="myModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalCenterTitle"
                    aria-hidden="true"
                    style={{ background: '#121212ad' }}
                >
                    <div
                        className="modal-dialog modal-dialog-centered  modal-xl"
                        role="document"
                    >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">
                                    {this.props.modalname
                                        ? this.props.modalname + ' Audit'
                                        : '---'}
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={this.props.closePopup}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body HistoryModalBody">
                                <div
                                    className="panel-group"
                                    id="accordion"
                                    role="tablist"
                                    aria-multiselectable="true"
                                >
                                    <div className="panel panel-default  light-bg">
                                        <div className="panel-heading" role="tab" id="headingOne">
                                            <h4 className="panel-title" id="historyAudit">
                                                <a
                                                    className="accordion-toggle"
                                                    role="button"
                                                    data-toggle="collapse"
                                                    data-parent="#accordion"
                                                    href="#collapseHistoryAudit"
                                                    aria-expanded="true"
                                                    aria-controls="collapseHistoryAudit"
                                                >
                                                    Search Logs
                                                </a>
                                            </h4>
                                        </div>
                                        <div
                                            id="collapseHistoryAudit"
                                            className="panel-collapse collapse in show"
                                            role="tabpanel"
                                            aria-labelledby="headingOne"
                                        >
                                            <div className="panel-body pl-3 pr-3">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="row">
                                                            <div className="col  ">
                                                                <div className="form-group">
                                                                    <label htmlFor>Start Date:</label>
                                                                    <div className="displayflex date-container">
                                                                        <input
                                                                            type="date"
                                                                            className="form-control"
                                                                            name="datefrom"
                                                                            min="1900-01-01"
                                                                            max={Format(new Date(), 'yyyy-mm-dd')}
                                                                            value={this.state.searchModel.datefrom}
                                                                            onChange={this.handler}
                                                                        />

                                                                        <span className="open-button">
                                                                            <button className="btn btn-primary btn-sm">
                                                                                <i className="fa fa-calendar" />
                                                                            </button>
                                                                        </span>
                                                                    </div>
                                                                    {this.state.saveClicked === true
                                                                        ? this.state.validationModel.datefromS
                                                                        : ''}
                                                                    {this.state.saveClicked === true
                                                                        ? this.state.validationModel.fromDate
                                                                        : ''}

                                                                    {this.state.saveClicked === true
                                                                        ? this.state.validationModel
                                                                            .DateFromLessAndEqualToDateTo
                                                                        : ''}
                                                                    {this.state.saveClicked === true
                                                                        ? this.state.validationModel.datefromF
                                                                        : ''}
                                                                </div>
                                                            </div>

                                                            {/* <div className="col ">
                                <div className="form-group">
                                  <label
                                    htmlFor
                                    className={
                                      this.state.fromTimeError
                                        ? 'text-danger'
                                        : ''
                                    }
                                  >
                                    Start Time:
                                  </label>
                                  <div className="displayflex date-container">
                                    <input
                                      className="w-100 min-height-30"
                                      disabled=""
                                      type="time"
                                      // mask="--:--:--"
                                      name="fromTime"
                                      id=""
                                      value={ConvertTime12to24(
                                        this.state.fromTime,
                                      )}
                                      onChange={this.changeFromTimeHandler}
                                    />
                                    <span className="open-button">
                                      <button className="btn btn-primary btn-sm">
                                        <i className="fa fa-clock-o" />
                                      </button>
                                    </span>
                                  </div>
                                </div>
                              </div> */}
                                                            <div className="col">
                                                                <TimePicker size="XS" changeTime={this.changeTime} timeFormat={12} time={this.state.fromTime} />
                                                            </div>

                                                            <div className="col ">
                                                                <div className="form-group">
                                                                    <label htmlFor>End Date:</label>
                                                                    <div className="displayflex date-container">
                                                                        <input
                                                                            type="date"
                                                                            className="form-control"
                                                                            name="dateto"
                                                                            value={this.state.searchModel.dateto}
                                                                            onChange={this.handler}
                                                                        />

                                                                        <span className="open-button">
                                                                            <button className="btn btn-primary btn-sm">
                                                                                <i className="fa fa-calendar" />
                                                                            </button>
                                                                        </span>
                                                                    </div>
                                                                    {this.state.saveClicked === true
                                                                        ? this.state.validationModel.toDate
                                                                        : ''}
                                                                </div>
                                                            </div>

                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <label htmlFor>End Time:</label>
                                                                    <div className="displayflex date-container">
                                                                        <input
                                                                            className="w-100 min-height-30"
                                                                            disabled=""
                                                                            type="time"
                                                                            mask="--:--:--"
                                                                            name="toTime"
                                                                            id=""
                                                                            value={ConvertTime12to24(
                                                                                this.state.toTime,
                                                                            )}
                                                                            onChange={this.changeToTimeHandler}
                                                                        />
                                                                        <span className="open-button">
                                                                            <button className="btn btn-primary btn-sm">
                                                                                <i className="fa fa-clock-o" />
                                                                            </button>
                                                                        </span>
                                                                    </div>
                                                                    {this.state.saveClicked === true
                                                                        ? this.state.validationModel.toTime
                                                                        : ''}
                                                                </div>
                                                            </div>

                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <label htmlFor>Added By:</label>
                                                                    <div className="displayflex date-container">
                                                                        <select
                                                                            className="form-control "
                                                                            name="addedBy"
                                                                            id="addedBy"
                                                                            value={this.state.searchModel.addedBy}
                                                                            onChange={this.handler}
                                                                        >
                                                                            {this.state.clients &&
                                                                                this.state.clients.map((s) => (
                                                                                    <option
                                                                                        key={s.userName}
                                                                                        value={s.userName}
                                                                                    >
                                                                                        {s.userName}
                                                                                    </option>
                                                                                ))}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {this.state.isDeleted ? (
                                                                <div className="col mt-4 pt-1">
                                                                    <div className="form-group">
                                                                        <label className="fancy-checkbox">
                                                                            <input
                                                                                type="checkbox"
                                                                                name="isDeleted"
                                                                                checked={this.state.isDeleted}
                                                                            //onChange={()=>this.handleCheckbox()}
                                                                            />
                                                                            <span>Deleted</span>{' '}
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            ) : null}

                                                            <div className="col" style={{ textAlign: 'end' }}>
                                                                <div className="form-group">
                                                                    <label htmlFor=""></label>
                                                                    <div className="displayflex date-container">
                                                                        <button
                                                                            type="submit"
                                                                            className="btn btn-orange mt-1 float-left buttonslim accordion-toggle"
                                                                            onClick={
                                                                                this.state.isDeleted
                                                                                    ? this.getDeletedRecords
                                                                                    : this.handleSearch
                                                                            }
                                                                        >
                                                                            Search
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="encounterpanelheight width100">
                                    <div className="col-12">
                                        <div className="height100vh">
                                            <Table
                                                columns={coloumn}
                                                currentPage={1}
                                                data={this.state.AuditData}
                                                totalPages={totalPages}
                                                totalCount={totalPages}
                                                handlePerRowsChange={this.handlePerRowsChange}
                                                handlePageChange={this.handlePageChange}
                                                handleRowClicked={this.handleRowClicked}
                                                pagination={totalPages > 1 ? true : false}
                                                fixedHeaderFooter={true}
                                                rowSelection={false}
                                                footer={false}
                                                minWidth={'100%'}
                                                dynamicClass="historyTableScroll"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-outline-danger"
                                    data-dismiss="modal"
                                    onClick={this.props.closePopup}
                                >
                                    Close
                                </button>
                                {/* <button type="button" className="btn btn-primary">
                  Save changes
                </button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
function mapStateToProps(state) {
    return {
        practiceUsers: state.userInfo.practiceUsers
            ? state.userInfo.practiceUsers
            : [],
        PracticeID: state.userInfo.practiceID,
        token: state.userInfo.token,
        serverTime: state.serverTime ? state.serverTime.currentTime : '',
    }
}

export default withRouter(connect(mapStateToProps, null)(historyAudit))
