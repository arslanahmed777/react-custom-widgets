
import React from "react";
import PropTypes from 'prop-types';
import folderClose from "./folderClose.svg"
import folderOpen from "./folderOpen.svg"
import "./Tree.css";

// ******************************** CUSTOM HELPER FUNCTIONS *********************
let findNode = (nodes, value, status) => {
    let foundObj = null;
    nodes.forEach((__) => {
        if (__.value === value) {
            foundObj = __;
        } else {
            let searchRecursive = (node) => {
                if (node.nodes) {
                    node.nodes.forEach((_) => {
                        if (_.value === value) {
                            foundObj = __;
                        } else {
                            searchRecursive(_);
                        }
                    });
                }
            };
            searchRecursive(__);
        }
    });
    let findValue = (nextNodes, value, status) => {
        let foundNodes = [];

        let recursiveFind = (nextNodes, value) => {
            if (nextNodes.value === value) {
                foundNodes.push(nextNodes);
            } else {
                if (nextNodes.nodes) {
                    nextNodes.nodes.forEach((_) => {
                        if (_.value === value) {
                            foundNodes.push(_);
                        } else {
                            if (_.nodes) {
                                recursiveFind(_, value);
                            }
                        }
                    });
                }
            }
        };
        let setStatus = (nextNodes, { value }, status) => {
            let recursiveTrue = (nextNodes, value) => {
                let parentNode = nextNodes;
                let setRecursiveChild = (node, b) => {
                    node.status = b;
                    if (node.nodes) {
                        node.nodes.forEach((_) => {
                            setRecursiveChild(_, b);
                        });
                    }
                };
                let setRecursiveTrue = (node) => {
                    if (node.value === value) {
                        let setRecursiveParent = (node, value) => {
                            if (node.nodes) {
                                if (node.nodes.some((v) => v.value === value)) {
                                    node.status = true;
                                    setRecursiveParent(parentNode, node.value);
                                } else {
                                    if (node.nodes) {
                                        node.nodes.forEach((_) => {
                                            setRecursiveParent(_, value);
                                        });
                                    }
                                }
                            }
                        };
                        setRecursiveChild(node, true);
                        setRecursiveParent(parentNode, value);
                    } else {
                        if (node.nodes) {
                            node.nodes.forEach((_) => {
                                setRecursiveTrue(_);
                            });
                        }
                    }
                };
                let setRecursiveFalse = (node) => {
                    if (node.value === value) {
                        node.status = false;
                        setRecursiveChild(node, false);
                    } else {
                        if (node.nodes) {
                            node.nodes.forEach((_) => {
                                setRecursiveFalse(_);
                            });
                        }
                    }
                };

                if (parentNode.value === value) {
                    parentNode.status = status;
                    setRecursiveTrue(parentNode);
                }
                if (status === true) {
                    setRecursiveTrue(parentNode);
                } else {
                    setRecursiveFalse(parentNode);
                }
                return parentNode;
            };

            recursiveTrue(nextNodes, value, status);
        };

        recursiveFind(nextNodes, value);
        setStatus(nextNodes, foundNodes[0], status);
        if (status && nextNodes.value === value) {
            nextNodes.status = status;
        } else if (nextNodes.value === value && !status) {
            nextNodes.status = status;
        } else {
            nextNodes.status = true;
        }
        return nextNodes;
    };
    if (foundObj) {
        findValue(foundObj, value, status);
        return nodes;
    }
};



const Tree = ({ filternodes = [], column, expandIcon, compressIcon, expanded, handleExpand, changeState, fontSize, backgroundColor, color, horizontalSpacing, verticalSpacing, borderLeft, allowCheck, saveTree, savebtnClass }) => {
    //column = 12 / column
    return (
        <div className="rtc-row" style={{ fontSize: fontSize, backgroundColor: backgroundColor, color: color }}>
            {filternodes.map((items, i) => {
                return (
                    <div key={i} className={`rtc-scroll rtc-col-${column}`} style={{ overflowX: "auto" }}>
                        <TreeNode filternodes={filternodes} nodes={items} expandIcon={expandIcon} compressIcon={compressIcon} expanded={expanded} handleExpand={handleExpand} changeState={changeState} fontSize={fontSize} horizontalSpacing={horizontalSpacing} verticalSpacing={verticalSpacing} borderLeft={borderLeft} allowCheck={allowCheck} />
                    </div>
                )
            })}
            {typeof saveTree === "function" && (
                <div className="rtc-col-12">
                    <button onClick={() => { saveTree(filternodes) }} className={savebtnClass}>Save</button>
                </div>
            )}

        </div>
    );
};

const Tree1 = (props) => {
    return (
        <>
            {props.data.map((items, i) => (
                <TreeNode filternodes={props.filternodes} key={i} nodes={items} expandIcon={props.expandIcon} compressIcon={props.compressIcon} expanded={props.expanded} handleExpand={props.handleExpand} changeState={props.changeState} fontSize={props.fontSize} horizontalSpacing={props.horizontalSpacing} verticalSpacing={props.verticalSpacing} borderLeft={props.borderLeft} allowCheck={props.allowCheck} />
            ))}

        </>
    );
};

const TreeNode = ({ filternodes, nodes, expandIcon, compressIcon, expanded, handleExpand, changeState, fontSize, horizontalSpacing, verticalSpacing, borderLeft, allowCheck }) => {
    const hasChild = nodes.nodes ? true : false;
    const handleVisibility = (e) => {
        let newArray = expanded
        if (expanded.includes(e)) {
            newArray = expanded.filter((value) => { return value !== e })
        } else {
            newArray.push(e)
        }
        handleExpand(newArray)
    }

    const handleCheck = (e) => {
        changeState(findNode(filternodes, e.target.value, e.target.checked))
    }
    return (
        <>
            <div className="rtc-d-flex" style={{ alignItems: "center", marginBottom: verticalSpacing }} >
                {hasChild && (
                    <button name={nodes.value} onClick={(e) => handleVisibility(nodes.value)} style={{ fontSize: "inherit", height: "fit-content" }} className="rtc-btn">
                        {expanded.includes(nodes.value) ? expandIcon : compressIcon}
                    </button>
                )}
                <div>
                    <span style={{ display: "flex", alignItems: "end" }}>
                        <span className="rtc-mx-1">
                            {allowCheck && <input value={nodes.value} name={nodes.value} onChange={(e) => handleCheck(e)} type="checkbox" checked={nodes.status} className="rtc-mx-1" style={{ width: `calc(${fontSize} - 8px)`, height: `calc(${fontSize} - 8px)` }} />}
                        </span>
                        <span>{nodes.text}</span>
                    </span>
                </div>
            </div>
            {expanded.includes(nodes.value) && (
                <div style={{ marginLeft: borderLeft === "none" ? horizontalSpacing : `calc(${horizontalSpacing} - 12px )`, borderLeft: borderLeft, paddingLeft: borderLeft === "none" ? "0px" : "12px" }}>
                    <Tree1 filternodes={filternodes} data={nodes.nodes} expandIcon={expandIcon} compressIcon={compressIcon} expanded={expanded} handleExpand={handleExpand} changeState={changeState} fontSize={fontSize} horizontalSpacing={horizontalSpacing} verticalSpacing={verticalSpacing} borderLeft={borderLeft} allowCheck={allowCheck} />
                </div>
            )}
        </>
    );
};

// Specifies the default values for props:
Tree.defaultProps = {
    borderLeft: 'none',
    color: 'black',
    backgroundColor: 'white',
    fontSize: '18px',
    compressIcon: <img src={folderClose} alt="compressicon" />,
    expandIcon: <img src={folderOpen} alt="expandicon" />,
    column: 6,
    allowCheck: true,
    horizontalSpacing: "14px",
    verticalSpacing: "5px",
    saveTree: false,
    savebtnClass: "rtc-save-button"
};

Tree.propTypes = {
    borderLeft: PropTypes.string,
    allowCheck: PropTypes.bool,
    verticalSpacing: PropTypes.string,
    horizontalSpacing: PropTypes.string,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    fontSize: PropTypes.string,
    compressIcon: PropTypes.element,
    expandIcon: PropTypes.element,
    column: PropTypes.number,
    filternodes: PropTypes.array.isRequired,
    expanded: PropTypes.array.isRequired,
    handleExpand: PropTypes.func.isRequired,
    changeState: PropTypes.func,
    saveTree: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.bool,
    ]),
    savebtnClass: PropTypes.string
};


export default Tree;