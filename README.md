# gulp-unify-versions

[![npm version](https://badge.fury.io/js/gulp-unify-versions.svg)](https://badge.fury.io/js/gulp-unify-versions) [![CircleCI](https://circleci.com/gh/naokikimura/gulp-unify-versions.svg?style=svg)](https://circleci.com/gh/naokikimura/gulp-unify-versions) [![Known Vulnerabilities](https://snyk.io/test/github/naokikimura/gulp-unify-versions/badge.svg?targetFile=package.json)](https://snyk.io/test/github/naokikimura/gulp-unify-versions?targetFile=package.json)

Unify the version numbers in manifest files

## Installation

```sh
npm i -D gulp-unify-versions
```

## Usage

This is useful when you want to synchronize  the version of the manifest file in conjunction with the [npm version](https://docs.npmjs.com/cli/version) command.

For example:

Add the following task to `gulpfile.js`.

```js
const gulp = require('gulp');

exports['version:unify'] = async function () {
  const unify = require('gulp-unify-versions');
  return gulp.src('./manifest.json')
    .pipe(unify('./package.json'))
    .pipe(gulp.dest('./'));
}

```

Add a `version` script to `package.json` as follows.

```diff
    "script": {
+     "version": "gulp version:unify && git add  manifest.json"
    }
```

When `npm version patch` is executed, the `version` of `package.json` and the `version` of `manifest.json` are the same.

## Contributing
Bug reports and pull requests are welcome on GitHub at https://github.com/naokikimura/gulp-unify-versions

## License
The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
