import React, { Component } from 'react'
import NoData from './noData'

class TableLoader extends Component {
    render() {
        return (
            <>
                {this.props.isLoading ? (
                    <div className="d-flex justify-content-center table-loader">
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : this.props.dataLength === 0 ? (
                    <NoData
                        moduleName={this.props.moduleName}
                        customMessage={this.props.customMessage}
                    />
                ) : (
                    ''
                )}
            </>
        )
    }
}

export default TableLoader
