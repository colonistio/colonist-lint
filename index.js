const fs = require("fs")
const path = require("path")

const ruleFiles = fs.readdirSync("rules")

const configs = {
    all: {
        plugins: ["@colonist/colonist"],
        rules: Object.fromEntries(ruleFiles.map(file => [
            `@colonist/colonist/${path.basename(file, ".js")}`,
            "warn",
        ])),
    },
}

const rules = Object.fromEntries(ruleFiles.map(file => [path.basename(file, ".js"), require("./rules/" + file)]))

module.exports = {
    configs,
    rules
}