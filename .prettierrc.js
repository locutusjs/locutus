/**
 * @type {import('prettier').Config}
 * @see https://prettier.io/docs/en/options.html
 */
const prettierOptions = {
  printWidth: 120,
  proseWrap: 'always',
  semi: false,
  singleQuote: true,
  useTabs: false,
  jsxSingleQuote: false,
  plugins: ['prettier-plugin-packagejson'],
  overrides: [
    {
      files: '*.html',
      options: {
        plugins: ['@shopify/prettier-plugin-liquid'],
        parser: 'liquid-html',
        singleQuote: false,
        liquidSingleQuote: false,
      },
    },
    {
      files: ['*.scss', '*.css'],
      options: {
        singleQuote: false,
        printWidth: 80,
      },
    },
    {
      files: ['.github/workflows/**/*.yml'],
      options: {
        proseWrap: 'preserve',
      },
    },
  ],
}

module.exports = prettierOptions
