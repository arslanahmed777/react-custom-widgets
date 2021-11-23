import React, { useState } from 'react'
import { CheckboxTree } from "./CheckboxTree/CheckboxTree"
import { useNamedState } from '../../hooks/useNamedState'
import nodes from "./nodes"

const CheckboxTreeView = () => {
    const [userRights, setUserRights] = useNamedState("userRights", nodes)
    const [filterRights, setFilterRights] = useNamedState("filterRights", nodes)
    const [expanded, setExpanded] = useState([])
    const handleExpand = (newArray) => {
        console.log("handleExpand", newArray);
        setExpanded([...newArray])
    }
    const handleCheck = (treeNodes) => {
        console.log("handleCheck", treeNodes);
        setFilterRights([...treeNodes])
    }
    const handleRightChange = (filternodes) => {
        console.log("handleRightChange", filternodes);
        setFilterRights([...filternodes])
    }
    const checkedNodesList = (chklist) => {
        console.log("checkedNodesList", chklist);
    }
    const handeleSave = (chklist) => {
        console.log("handeleSave", chklist);
    }
    return (
        <div className="row">
            <div className="col-lg-8">
                <CheckboxTree
                    nodes={userRights} // filter the value from array
                    filternodes={filterRights}
                    expanded={expanded}
                    handleExpand={handleExpand}
                    changeState={handleCheck}
                    handleChange={handleRightChange}
                    checknodes={checkedNodesList}
                    saveUserRights={handeleSave}
                    addEditRights={true}
                    column={1}
                />
            </div>


        </div>
    )
}

export default CheckboxTreeView
