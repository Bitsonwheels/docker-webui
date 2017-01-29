{
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "modules": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "settings": {
      "react": {
        "pragma": "React"
      }
    },
    "rules": {
        "indent": [
            0
        ]
    },
    "globals": {
      "jQuery": true,
      "$": true,
      "React": true,
      "ReactDOM": true,
      "app": true
    },
    "envs": [
      "browser"
    ]
}
