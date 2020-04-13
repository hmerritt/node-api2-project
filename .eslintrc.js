module.exports = {
    "plugins": ["prettier"],
    "extends": ["eslint:recommended", "plugin:prettier/recommended"],
    "env": {
        "node": true
    },
    "parserOptions": {
        "ecmaVersion": 9,
    },
    "rules": {
        "prettier/prettier": ["error", { "singleQuote": false, "tabWidth": 4 }]
    }
}
