let valueInput = document.getElementById("value");
let submit = document.getElementById("submit");
findNode = (nodes, v, status) => {
    let nonMatch = [];
    let foundMatch = [];
    let updatedData = [];
    let parentNodes = (nodes) => {
        nodes.forEach((node) => {
            if (node.value !== v) {
                nonMatch.push(node);

                if (node.nodes) parentNodes(node.nodes);
            } else {
                foundMatch.push(node);
            }
        });
    };
    let setStatus = (status, parents, nextNodes) => {
        let totalParents = parents.length;
        if (totalParents > 1) {
            nextNodes.forEach((_) => {
                if (parents.some((v) => v == _.value)) {
                    _.status = status;
                    updatedData.push(_);
                    if (_.nodes) setStatus(status, parents, _.nodes);
                } else {
                    if (_.nodes) setStatus(status, parents, _.nodes);
                }
            });
        }
    };
    findParentAndChild = (value) => {
        let parents = [value];
        findNestedParent = (NextNodes, value) => {
            NextNodes.forEach((_) => {
                if (_.nodes && _.nodes.some((node) => node.value == value)) {
                    parents.push(_.value);
                    findNestedParent(nodes, _.value);
                } else {
                    if (_.nodes) findNestedParent(_.nodes, value);
                }
            });
            return parents;
        };
        findNestedChild = (NextNodes, value) => {
            let nodes = [];
            let childNames = [];
            let findChildNodes = (next, v) => {
                next.forEach((node) => {
                    if (node.value == v && node.nodes) {
                        nodes = node.nodes;
                    } else {
                        if (node.nodes) findChildNodes(node.nodes, v);
                    }
                });
            };
            getchildNames = (nextNodes) => {
                nextNodes.forEach((_) => {
                    childNames.push(_.value);
                    if (_.nodes) getchildNames(_.nodes);
                });
            };
            findChildNodes(NextNodes, value);
            getchildNames(nodes);
            return childNames;
        };
        setStatus(
            status,
            [...findNestedParent(nodes, value), ...findNestedChild(nodes, value)],
            nodes
        );
    };

    parentNodes(nodes);
    findParentAndChild(foundMatch[0]?.value);

    return Array.from(new Set([...nodes, updatedData[0]]));
};
valueInput.addEventListener("change", () => {
    console.log(nodes);
    console.log(findNode(nodes, valueInput.value, valueInput.checked));
});