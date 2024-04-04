module.exports = {
  extends: ['standard', 'prettier'],
  rules: {
    camelcase: 'off',
    'multiline-ternary': 'off',
    'no-labels': 'warn',
    'n/no-deprecated-api': 'warn',
    'no-cond-assign': 'warn',
    'no-control-regex': 'warn',
    'no-empty': 'warn',
    'no-misleading-character-class': 'warn',
    'no-mixed-operators': 'warn',
    'no-new-func': 'warn',
    'no-prototype-builtins': 'off',
    'no-unmodified-loop-condition': 'warn',
    'no-unreachable-loop': 'warn',
    'no-use-before-define': 'warn',
    'prefer-const': 'warn',
    'valid-typeof': 'warn',
    'max-len': [
      'warn',
      {
        code: 120,
        ignoreUrls: true,
        ignorePattern: '(^module\\.exports|.+\\.\\./info/ini_get.+|^  //\\s+_?(returns|example))',
      },
    ],
  },
  env: {
    mocha: true,
    browser: true,
    node: true,
  },
}
