
import React, { useState } from "react";
import "./Tree.css";

const Tree = ({ filternodes = [], column, openIcon, closeIcon, expanded, handleExpand, changeState }) => {
    column = 12 / column
    console.log("Tree render");
    return (
        <div className="row">
            {filternodes.map((items, i) => {
                return (
                    <div key={i} className={'col-lg-' + column + ' form-check'}>
                        <TreeNode filternodes={filternodes} nodes={items} openIcon={openIcon} closeIcon={closeIcon} expanded={expanded} handleExpand={handleExpand} changeState={changeState} />
                    </div>
                )
            })}
        </div>
    );
};



const Tree1 = (props) => {
    console.log("Tree1 render");
    return (
        <div className="d-tree">
            <ul className="d-flex d-tree-container flex-column">
                {props.data.map((items, i) => (
                    <TreeNode filternodes={props.filternodes} key={i} nodes={items} openIcon={props.openIcon} closeIcon={props.closeIcon} expanded={props.expanded} handleExpand={props.handleExpand} />
                ))}
            </ul>
        </div>
    );
};

const TreeNode = ({ filternodes, nodes, openIcon, closeIcon, expanded, handleExpand, changeState }) => {

    const [childVisible, setChildVisiblity] = useState(false);

    const hasChild = nodes.nodes ? true : false;

    const handleVisibility = (e) => {
        console.log("e", e);
        let newArray = expanded
        if (expanded.includes(e)) {
            newArray = expanded.filter((value) => { return value !== e })
        } else {
            newArray.push(e)
        }
        handleExpand(newArray)
        setChildVisiblity((visible) => !visible)
    }

    const handleCheck = (e) => {
        let updatedNodes = [];
        console.log("echeck", filternodes);
        console.log("echeck2", e.target.value);
        filternodes.forEach((node) => {
            if (node.value === e.target.value) {

            } else {
                updatedNodes.push(node);
            }
        });
        console.log("updatedNodes", updatedNodes);
    }
    console.log("TreeNode render");
    return (
        <li className="d-tree-node border-0">
            <div className="d-flex" >
                {hasChild && (
                    <button name={nodes.value} onClick={(e) => handleVisibility(nodes.value)} className="btn text-white p-0">
                        {childVisible ? closeIcon : openIcon}
                    </button>
                )}

                <div className="col d-tree-head">
                    <span>
                        <input
                            id="flexCheckDefault"
                            value={nodes.value}
                            name={nodes.value}
                            onChange={(e) => handleCheck(e)}
                            type="checkbox"
                            className="m-2"
                            checked={nodes.status}
                        ></input>


                        {nodes.text}

                    </span>

                </div>

            </div>


            {hasChild && childVisible && (
                <div className="d-tree-content">
                    <ul className="d-flex d-tree-container flex-column">
                        <Tree1 filternodes={filternodes} data={nodes.nodes} openIcon={openIcon} closeIcon={closeIcon} expanded={expanded} handleExpand={handleExpand} />
                    </ul>
                </div>
            )}
        </li>
    );
};


export default Tree;