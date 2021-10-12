import { data } from "jquery";
import React from "react";
import { connect } from "react-redux";
import { callApi } from "../../../../../utils/call-api";
import { Table } from "../../../../shared/LatestTable/Table";
import PatientSearchComponent from "../../../../shared/SearchTable/PatientSearchComponent";
import ButtonLoader from "../../../../shared/Loaders/ButtonLoader";
import Format from "../../../../../utils/Format";
import { format } from "crypto-js";

class EncounterReport extends React.Component {
  constructor(props) {
    super(props);
    this.styling = {
      component: {
        width: "100%",
      },
      table: {
        width: "100%",
        maxHeight: "400px",
        position: "absolute",
        zIndex: "9999",
      },
    };

    this.state = {
      patientSearchData: [],
      patientname: "dem",
      fromDate: this.getTodayDate(),
      toDate: this.getTodayDate(),
      providerid: "",
      patientid: "",
      locationid: "",
      error: false,
      loading: false,
    };
  }

  async componentDidMount() {
    try {
      const { fromDate, toDate, patientid, providerid, locationid } =
        this.state;

      const fff = {
        param_list: [
          { key: "fromdate", value: fromDate },
          { key: "todate", value: toDate },
          { key: "patientid", value: patientid },
          { key: "providerid", value: providerid },
          { key: "locationid", value: locationid },
        ],
      };
      const data = await callApi(
        "/Reports/PatientEncounterReport",
        "post",
        fff
      );
      const formateddata = data.map((d) => ({
        ...d,
        encounterDate: Format(d.encounterDate, "mm/dd/yyyy"),
      }));
      this.setState({
        patientSearchData: formateddata,
        loading: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  getTodayDate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    today = yyyy + "-" + mm + "-" + dd;
    return today;
  };
  handleSearchChange = async (e) => {
    e.preventDefault();
    const { fromDate, toDate, patientid, providerid, locationid } = this.state;
    const patientModal = {
      param_list: [
        { key: "fromdate", value: fromDate },
        { key: "todate", value: toDate },
        { key: "patientid", value: patientid },
        { key: "providerid", value: providerid },
        { key: "locationid", value: locationid },
      ],
    };
    this.setState({
      loading: true,
    });
    const data = await callApi(
      "/Reports/PatientEncounterReport",
      "post",
      patientModal
    );
    const formateddata = data.map((d) => ({
      ...d,
      encounterDate: Format(d.encounterDate, "mm/dd/yyyy"),
    }));
    this.setState({
      patientSearchData: formateddata,
      loading: false,
    });
  };
  handleRowClicked = async (event) => {};

  GetAutoCompleteData = (selectedObj, messagesTab) => {
    if (selectedObj) {
      this.setState({
        patientid: selectedObj.id,
        patientname: selectedObj.lastName + " " + selectedObj.firstName,
      });
    }
  };
  handleChangeProvider = (e) => {
    this.setState({
      providerid:
        e.target.value === "Please Select" ? "" : parseInt(e.target.value),
      loading: false,
    });
  };

  handleChangeLocation = (e) => {
    this.setState({
      locationid:
        e.target.value === "Please Select" ? "" : parseInt(e.target.value),
      loading: false,
    });
  };

  handleChangeFromDate = (e) => {
    this.setState({
      fromDate: e.target.value,
    });
  };

  handleChangeToDate = (e) => {
    this.setState({
      toDate: e.target.value,
    });
  };

  render() {
    let tableColumns = ["Name", "Account Num", "Dob"];

    const coloumn = [
      {
        Header: "ENCOUNTER DATE",
        accessor: "encounterDate",
        Footer: "",
      },
      {
        Header: "PATIENT",
        accessor: "patientName",
        Footer: "",
        // Cell: ({ row }) => (
        //   <>
        //     <a
        //       href="#/"
        //       onClick={(event) =>
        //         this.props.openSetupTabFunction({ key: 1000, index: 0 }, [
        //           {
        //             tab: 1000,
        //             data: {
        //               redirect: 'Locations',
        //               name: row.original.name,
        //             },
        //           },
        //         ])
        //       }
        //       className="text-primary pointer-cursor"
        //     >
        //       {row.original.name}
        //     </a>
        //   </>
        // ),
      },
      {
        Header: "PROVIDER",
        accessor: "providerName",
        Footer: "",
      },

      {
        Header: "LOCATION",
        accessor: "locationName",
        Footer: "",
      },
      {
        Header: "VISIT REASON",
        accessor: "visitReason",
        Footer: "",
      },
    ];

    return (
      <>
        <div className="card">
          <div
            className="panel-group"
            id="accordion"
            role="tablist"
            aria-multiselectable="true"
          >
            <div className="panel panel-default">
              <div className="panel-heading" role="tab" id="headingOne">
                <div className="panel-title light-bg">
                  <a
                    className="accordion-toggle"
                    role="button"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseUnitReport"
                    aria-expanded="true"
                    aria-controls="collapseUnitReport"
                  >
                    Search Encounter Report
                  </a>
                </div>
              </div>
              <div
                id="collapseUnitReport"
                className="panel-collapse collapse in"
                role="tabpanel"
                aria-labelledby="headingOne"
              >
                <div className="panel-body px-2 py-2 ">
                  <div className="row">
                    <div className="col-sm-12 col-md-2">
                      <div className="form-group">
                        <label
                          htmlFor="patientsearch"
                          className="font-weight-bold"
                        >
                          Patient:
                        </label>
                        <div className="displayflex">
                          <PatientSearchComponent
                            styling={this.styling}
                            tableColumns={tableColumns}
                            getSelectedObject={this.GetAutoCompleteData}
                          />
                        </div>
                      </div>
                      {/* {
                        this.state.error && <h4>Fields are empty</h4>
                      } */}
                    </div>
                    <div className="col-sm-12 col-md-2">
                      <div className="form-group">
                        <label htmlFor="provider" className="font-weight-bold">
                          {" "}
                          Provider:
                        </label>
                        <div className="displayflex">
                          <select
                            name="provider"
                            id="provider"
                            className="form-control"
                            onChange={(e) => this.handleChangeProvider(e)}
                          >
                            {this.props.providers.map((provider) => (
                              <option value={provider.id}>
                                {provider.label}
                              </option>
                            ))}
                          </select>
                          {/* <input className="form-control p-3" id="provider" /> */}
                          {/* <button className="btn btn-primary btn-sm">
                            <i className="fa fa-calendar" />
                            <i class="fas fa-chevron-circle-down"></i>
                          </button> */}
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-2">
                      <div className="form-group">
                        <label htmlFor="location" className="font-weight-bold">
                          {" "}
                          Locations:
                        </label>
                        <div className="displayflex">
                          <select
                            name="location"
                            id="location"
                            className="form-control"
                            onChange={(e) => this.handleChangeLocation(e)}
                          >
                            {this.props.locations.map((location) => (
                              <option value={location.id}>
                                {location.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-2">
                      <div className="form-group">
                        <label htmlFor="fromdate" className="font-weight-bold">
                          From Date:
                        </label>
                        <div className="displayflex">
                          <input
                            type="date"
                            className="form-control p-3"
                            id="fromdate"
                            max={this.state.toDate}
                            value={this.state.fromDate}
                            onChange={(e) => this.handleChangeFromDate(e)}
                          />
                          {/* <button className="btn btn-primary btn-sm">
                            <i className="fa fa-calendar" />
                          </button> */}
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-2">
                      <div className="form-group">
                        <label htmlFor="todate" className="font-weight-bold">
                          To Date:
                        </label>
                        <div className="displayflex">
                          <input
                            type="date"
                            className="form-control p-3"
                            id="todate"
                            min={this.state.fromDate}
                            value={this.state.toDate}
                            onChange={(e) => this.handleChangeToDate(e)}
                          />
                          {/* <button className="btn btn-primary btn-sm">
                            <i className="fa fa-calendar" />
                          </button> */}
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-2 d-flex justify-content-end align-items-center">
                      <div>
                        <button
                          type="button"
                          className="btn btn-orange float-right buttonslim"
                          onClick={(e) => this.handleSearchChange(e)}
                          disabled={this.state.loading}
                        >
                          Search
                          {this.state.loading && <ButtonLoader small={true} />}
                        </button>
                      </div>
                    </div>
                    {/* <div className="col-sm-12 col-md-3">
                      <div className="form-group">
                        <label htmlFor className="font-weight-bold">
                          Entry Date From:
                        </label>
                        <div className="displayflex">
                          <input className="form-control p-3" id="email" />
                          <button className="btn btn-primary btn-sm">
                            <i className="fa fa-calendar" />
                          </button>
                        </div>
                      </div>
                    </div> */}
                    {/* <div className="col-sm-12 col-md-3">
                      <div className="form-group">
                        <label htmlFor className="font-weight-bold">
                          Entry Date To:
                        </label>
                        <div className="displayflex">
                          <input className="form-control p-3" id="email" />
                          <button className="btn btn-primary btn-sm">
                            <i className="fa fa-calendar" />
                          </button>
                        </div>
                      </div>
                    </div> */}
                    {/* <div className="col-sm-12 col-md-3">
                      <div className="form-group">
                        <label htmlFor className="font-weight-bold">
                          Submitted Date From:
                        </label>
                        <div className="displayflex">
                          <input className="form-control p-3" id="email" />
                          <button className="btn btn-primary btn-sm">
                            <i className="fa fa-calendar" />
                          </button>
                        </div>
                      </div>
                    </div> */}
                    {/* <div className="col-sm-12 col-md-3">
                      <div className="form-group">
                        <label htmlFor className="font-weight-bold">
                          Submitted Date To:
                        </label>
                        <div className="displayflex">
                          <input className="form-control p-3" id="email" />
                          <button className="btn btn-primary btn-sm">
                            <i className="fa fa-calendar" />
                          </button>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {/* <div className="col-sm-12 col-md-3">
              <ul className="list-group">
                <li className="list-group-item">Text One</li>
                <li className="list-group-item">Text One</li>
                <li className="list-group-item">Text One</li>
              </ul>
            </div> */}
            <div
              className="col-sm-12 col-md-12"
              style={{ maxHeight: 380, overflowX: "scroll" }}
            >
              <div className="mt-2">
                <Table
                  columns={coloumn}
                  // currentPage={currentPage}
                  data={this.state.patientSearchData}
                  // totalPages={totalRows}
                  // totalCount={totalcount}
                  // handlePerRowsChange={this.handlePerRowsChange}
                  // handlePageChange={this.handlePageChange}
                  handleRowClicked={this.handleRowClicked}
                  // listOfpages={listOfpages}
                  // pagination={totalRows > 1 ? true : false}
                  fixedHeaderFooter={true}
                  rowSelection={false}
                  footer={false}
                  minWidth={"100%"}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    providers: state.userInfo.userProviders,
    locations: state.userInfo.userLocations,
  };
}
export default connect(mapStateToProps, null)(EncounterReport);
