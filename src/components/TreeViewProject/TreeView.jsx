import React from 'react'
import { useNamedState } from "../../hooks/useNamedState"
import nodes from "./nodes"
import Tree from "./Tree"
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
const TreeView = () => {
    const [userRights, setUserRights] = useNamedState("userRights", nodes)
    const [filterRights, setFilterRights] = useNamedState("filterRights", nodes)
    const [expanded, setExpanded] = useNamedState("expanded", [])
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
        <div className="container">
            <div className="row mt-3 d-flex justify-content-center">
                <div className="col-lg-12 text-left text-white bg-dark ">
                    <Tree
                        nodes={userRights} // filter the value from array
                        filternodes={filterRights}
                        expanded={expanded}
                        handleExpand={handleExpand}
                        changeState={handleCheck}
                        handleChange={handleRightChange}
                        checknodes={checkedNodesList}
                        saveUserRights={handeleSave}
                        addEditRights={true}
                        column={2}
                        openIcon={<FaChevronRight />}
                        closeIcon={<FaChevronDown />}

                    />
                </div>
            </div>
        </div>
    )
}

export default TreeView
