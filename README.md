## Tree  hierarchy

```
➜  babel-left-side-crguezl git:(main) tree -I node_modules 
.
├── README.md
├── examples
│   ├── README.md
│   ├── babel.config.json
│   ├── hello.cjs
│   ├── hello.js
│   ├── package-lock.json
│   └── package.json
├── package-lock.json
├── package.json
└── packages
    ├── babel-parser
    │   ├── README.md
    │   ├── babel.config.json
    │   ├── bin
    │   │   └── babel-parser.js
    │   ├── index.js
    │   ├── package-lock.json
    │   └── package.json
    └── babel-plugin-left-side
        ├── README.md
        ├── lib
        │   └── plugin.js
        ├── package.json
        └── src
            └── plugin.js

7 directories, 19 files
```

The final user installs the package `babel-plugin-left-side-support` and uses it in his/her project. See [examples/package.json](examples/package.json).. 