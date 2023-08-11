module.exports = {
  extends: [
    '@boxine/eslint-config-base',
    '@boxine/eslint-config-jest',
    '@boxine/eslint-config-react',
  ],
  overrides: [
    {
      files: ['*.jsx', '*.tsx'],
      rules: {
        'react/react-in-jsx-scope': 'off',
        'react/require-default-props': 'off',
      },
    },
  ],
}
