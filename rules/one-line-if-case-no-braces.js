module.exports = {
    meta: {
        type: "layout",

        fixable: "whitespace",

        messages: {
            noSingleLineIfsAsBlock: "Don't use braces with one line if statements",
            useBlocksWithElseCases: "Use braces when there are else ifs and/or elses"
        }
    },
    create(context) {
        return {
            IfStatement(node) {
                if(node.alternate === null && node.parent.type !== "IfStatement") {
                    if(node.consequent.type === "BlockStatement" && node.consequent.body.length > 0) {
                        // assumes that blank lines are removed by other eslint rules, so at most three lines for a if block with one line inside
                        if(node.consequent.loc.end.line - node.consequent.loc.start.line + 1 <= 3) {
                            context.report({
                                node: node,
                                messageId: "noSingleLineIfsAsBlock",
                            })
                        }
                    }
                }
            }
        };
    }
};