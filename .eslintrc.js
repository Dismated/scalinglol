module.exports = {
    extends: [
        'airbnb',
        'airbnb-typescript',
        'prettier',
        'next/core-web-vitals',
    ],
    parserOptions: {
        project: ['./tsconfig.json', './eslintrc.js'],
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    parser: '@typescript-eslint/parser',
    plugins: ['prettier', 'sort-imports-es6-autofix'],
    rules: {
        'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
        'react/react-in-jsx-scope': 'off',
        'react/jsx-props-no-spreading': 0,
        'react/prop-types': 'off',
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        eqeqeq: 'error',
        'object-curly-spacing': ['error', 'always'],
        'arrow-spacing': ['error', { before: true, after: true }],
        'no-console': 1,
        'react/function-component-definition': [
            2,
            {
                namedComponents: 'arrow-function',
                unnamedComponents: 'arrow-function',
            },
        ],
        '@typescript-eslint/no-explicit-any': 'warn',
        'object-shorthand': ['error', 'always'],
        'sort-imports-es6-autofix/sort-imports-es6': [
            2,
            {
                ignoreCase: false,
                ignoreMemberSort: false,
                memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
            },
        ],
        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                components: ['Link'],
                specialLink: ['hrefLeft', 'hrefRight'],
                aspects: ['invalidHref', 'preferButton'],
            },
        ],
    },
};
