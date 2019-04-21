## jest-runner-es-check

This is a Jest runner for [`es-check`](https://github.com/dollarshaveclub/es-check).

## Usage

### Install

Install `jest`_(it needs Jest 21+)_ and `jest-runner-es-check`

```bash
yarn add --dev jest jest-runner-es-check

# or with NPM

npm install --save-dev jest jest-runner-es-check
```

### Add it to your Jest config

#### Standalone

In your `package.json`

```json
{
  "jest": {
    "runner": "jest-runner-es-check",
    "displayName": "es-check",
    "testMatch": ["<rootDir>/dist/**/*.js"]
  }
}
```

Or in `jest.config.js`

```js
module.exports = {
  runner: 'jest-runner-es-check',
  displayName: 'es-check',
  testMatch: ['<rootDir>/dist/**/*.js'],
};
```

#### Alongside other runners

It is recommended to use the [`projects`](https://facebook.github.io/jest/docs/en/configuration.html#projects-array-string-projectconfig) configuration option to run multiple Jest runners simultaneously.

If you are using Jest <22.0.5, you can use multiple Jest configuration files and supply the paths to those files in the `projects` option. For example:

```js
// jest-test.config.js
module.exports = {
  // your Jest test options
  displayName: 'test',
};

// jest-es-check.config.js
module.exports = {
  // your jest-runner-es-check options
  runner: 'jest-runner-es-check',
  displayName: 'es-check',
  testMatch: ['<rootDir>/dist/**/*.js'],
};
```

In your `package.json`:

```json
{
  "jest": {
    "projects": [
      "<rootDir>/jest-test.config.js",
      "<rootDir>/jest-es-check.config.js"
    ]
  }
}
```

Or in `jest.config.js`:

```js
module.exports = {
  projects: [
    '<rootDir>/jest-test.config.js',
    '<rootDir>/jest-es-check.config.js',
  ],
};
```

If you are using Jest >=22.0.5, you can supply an array of project configuration objects instead. In your `package.json`:

```json
{
  "jest": {
    "projects": [
      {
        "displayName": "test"
      },
      {
        "runner": "jest-runner-es-check",
        "displayName": "es-check",
        "testMatch": ["<rootDir>/dist/**/*.js"]
      }
    ]
  }
}
```

Or in `jest.config.js`:

```js
module.exports = {
  projects: [
    {
      displayName: 'test',
    },
    {
      runner: 'jest-runner-es-check',
      displayName: 'es-check',
      testMatch: ['<rootDir>/dist/**/*.js'],
    },
  ],
};
```

## Options

This project uses same options as the original package, and will read `.escheckrc` in the root directory, if present. However, it's also easily configurable via jest's options:

```js
// package.json
"jest": {
  "runner": "jest-runner-es-check",
  "displayName": "es-check",
  "testEnvironmentOptions": {
    "ecmaVersion": "es5"
  },
  "testMatch": [
    "<rootDir>/dist/**/*.js"
  ]
}
```

All available options:

- `ecmaVersion`: The ECMA version to check against. One of:
  - `es3`
  - `es4`
  - `es5`
  - `es6`
  - `es2015`
  - `es7`
  - `es2016`
  - `es8`
  - `es2017`
  - `es9`
  - `es2018`
  - `es10`
  - `es2019`
- `module` Set to `true` if files are using module syntax.
- `allowHashBang` Set to true if hashbangs should be allowed.

## Example

Check out the [example](/example) to see it in action.
