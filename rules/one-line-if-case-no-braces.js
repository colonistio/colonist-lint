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
        };
    }
};