to avoid collision with Pablos packages with the same names:

- I created a branch `publish` to publish the packages 
- I set a remote `pl2425` to `https://github.com/ULL-ESIT-PL-2425/parser-left-side-crguezl`
- We used the workspaces option `npm publish -ws` to publish the packages

The `prepublishOnly` script in the `package.json` file of the packages runs `npm run build`:

```
➜  parser-left-side-crguezl git:(publish) npm publish -ws
> @ull-esit-pl-2425/parser-left-side@1.0.0 prepublishOnly
> npm run build
...
```

The publishing starts issuing a warning:
```
npm warn publish npm auto-corrected some errors in your package.json when publishing.  Please run "npm pkg fix" to address these errors.
```
And then proceeds to corrrect them:

```
npm warn publish errors corrected:
npm warn publish "bin[parser]" script name was cleaned
npm warn publish "repository.url" was normalized to "git+https://github.com/ULL-ESIT-PL-2425/parser-left-side-crguezl.git"
```
When I later checked the package.json files I saw that the `repository.url` field was normalized to the correct value.

```
npm notice
npm notice 📦  @ull-esit-pl-2425/parser-left-side@1.0.0
npm notice Tarball Contents
npm notice 1.1kB LICENSE
npm notice 8.6kB README.md
npm notice 328B bin/babel-parser.js
npm notice 391.3kB lib/index.js
npm notice 1.3kB package.json
npm notice 4.4kB typings/babel-parser.d.ts
npm notice Tarball Details
npm notice name: @ull-esit-pl-2425/parser-left-side
npm notice version: 1.0.0
npm notice filename: ull-esit-pl-2425-parser-left-side-1.0.0.tgz
npm notice package size: 82.5 kB
npm notice unpacked size: 407.1 kB
npm notice shasum: f46508f3dec882220f6b6e791b60ffea74cec7f2
npm notice integrity: sha512-FcgoD2zFNxe9T[...]bPnYAcg4y4yVw==
npm notice total files: 6
npm notice
npm notice Publishing to https://npm.pkg.github.com with tag latest and public access
+ @ull-esit-pl-2425/parser-left-side@1.0.0
npm warn publish npm auto-corrected some errors in your package.json when publishing.  Please run "npm pkg fix" to address these errors.
npm warn publish errors corrected:
npm warn publish "repository.url" was normalized to "git+https://github.com/ULL-ESIT-PL-2425/parser-left-side-crguezl.git"
npm notice
```

```
npm notice 📦  @ull-esit-pl-2425/babel-plugin-left-side@1.0.1
npm notice Tarball Contents
npm notice 8.6kB README.md
npm notice 625B package.json
npm notice 2.6kB src/plugin.js
npm notice Tarball Details
npm notice name: @ull-esit-pl-2425/babel-plugin-left-side
npm notice version: 1.0.1
npm notice filename: ull-esit-pl-2425-babel-plugin-left-side-1.0.1.tgz
npm notice package size: 4.3 kB
npm notice unpacked size: 11.8 kB
npm notice shasum: f1b18b4de0a1a87a7e0898296650c4f91a5f9da8
npm notice integrity: sha512-baBKILwcSPP7P[...]KQ3N56wRMljCg==
npm notice total files: 3
npm notice
npm notice Publishing to https://npm.pkg.github.com with tag latest and public access
+ @ull-esit-pl-2425/babel-plugin-left-side@1.0.1
npm warn publish npm auto-corrected some errors in your package.json when publishing.  Please run "npm pkg fix" to address these errors.
npm warn publish errors corrected:
npm warn publish "repository.url" was normalized to "git+https://github.com/ULL-ESIT-PL-2425/babel-tanhauhau.git#pablo-tfg"
npm notice
npm notice 📦  @ull-esit-pl-2425/babel-plugin-left-side-support@1.0.1
npm notice Tarball Contents
npm notice 5.4kB README.md
npm notice 814B lib/assign.js
npm notice 1.8kB lib/function-object.js
npm notice 151B lib/index.js
npm notice 725B package.json
npm notice 1.6kB src/assign.js
npm notice 2.5kB src/function-object.js
npm notice 148B src/index.js
npm notice Tarball Details
npm notice name: @ull-esit-pl-2425/babel-plugin-left-side-support
npm notice version: 1.0.1
npm notice filename: ull-esit-pl-2425-babel-plugin-left-side-support-1.0.1.tgz
npm notice package size: 3.9 kB
npm notice unpacked size: 13.1 kB
npm notice shasum: 367e72a2544de70d5fc915c57ac48c772acb926f
npm notice integrity: sha512-x7/TjFL2zI0bb[...]JVBI9oYZDjSww==
npm notice total files: 8
npm notice
npm notice Publishing to https://npm.pkg.github.com with tag latest and public access
+ @ull-esit-pl-2425/babel-plugin-left-side-support@1.0.1
```
