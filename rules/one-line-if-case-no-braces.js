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
                                fix(fixer) {
                                    const sourceCode = context.getSourceCode();

                                    const openingBrace = sourceCode.getFirstToken(node.consequent);
                                    const closingBrace = sourceCode.getLastToken(node.consequent);
                                    const firstValueToken = sourceCode.getFirstToken(node.consequent.body[0]);
                                    const lastValueToken = sourceCode.getLastToken(node.consequent.body[0]);

                                    return [
                                        fixer.removeRange([openingBrace.range[0], firstValueToken.range[0]]),
                                        fixer.removeRange([lastValueToken.range[1], closingBrace.range[1]])
                                    ];
                                }
                            })
                        }
                    }
                } else if(node.alternate || node.parent.type === "IfStatement") {
                    if(node.consequent.type !== "BlockStatement") {
                        context.report({
                            node: node,
                            messageId: "useBlocksWithElseCases",
                            fix(fixer) {
                                // assumes that other eslint rules will fix brace styling
                                const sourceCode = context.getSourceCode();

                                const firstValueToken = sourceCode.getFirstToken(node.consequent);
                                const lastValueToken = sourceCode.getLastToken(node.consequent);

                                return [
                                    fixer.insertTextBefore(firstValueToken, "{"),
                                    fixer.insertTextAfter(lastValueToken, "}")
                                ];
                            }
                        })
                    }

                    if(node.alternate && node.alternate.type !== "IfStatement" && node.alternate.type !== "BlockStatement") {
                        context.report({
                            node: node,
                            messageId: "useBlocksWithElseCases",
                            fix(fixer) {
                                // assumes that other eslint rules will fix brace styling
                                const sourceCode = context.getSourceCode();

                                const firstValueToken = sourceCode.getFirstToken(node.alternate);
                                const lastValueToken = sourceCode.getLastToken(node.alternate);

                                return [
                                    fixer.insertTextBefore(firstValueToken, "{"),
                                    fixer.insertTextAfter(lastValueToken, "}")
                                ];
                            }
                        })    
                    }
                }
            }
        };
    }
};