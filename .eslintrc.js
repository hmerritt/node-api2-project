module.exports = {
    "plugins": ["prettier"],
    "extends": ["eslint:recommended", "plugin:prettier/recommended"],
    "env": {
        "node": true,
        "es6": true
    },
    "rules": {
        "prettier/prettier": ["error", { "singleQuote": false, "tabWidth": 4 }],
        // enable additional rules
        "indent": ["warn", 4]
    }
}
