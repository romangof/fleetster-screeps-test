const Constants = require('./lib/Constants');
const util = require('util')

let globals = {};

Object.keys(Constants).map(element => (globals[element]  = true));

module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'airbnb-base',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    globals: {
        _: true,
        Game: true,
        Memory: true,
        ...globals,
    },
    rules: {
        "no-console": "off",
        'no-extra-parens': [
            'warn',
            'all',
            {
                nestedBinaryExpressions: false
            }
        ],
        'no-template-curly-in-string': 'error',
        'block-scoped-var': 'error',
        'complexity': [
            'error',
            15
        ],
        'consistent-return': 'error',
        'curly': 'error',
        'dot-location': [
            'error',
            'property'
        ],
        'dot-notation': [
            'error'
        ],
        'require-atomic-updates': 'error',
        'no-async-promise-executor': 'error',
        'eqeqeq': 'error',
        'guard-for-in': 'off',
        'no-alert': 'error',
        'no-caller': 'error',
        'no-eval': 'error',
        'no-extend-native': 'error',
        'no-extra-bind': 'error',
        'no-extra-label': 'error',
        'no-fallthrough': 'error',
        'no-floating-decimal': 'error',
        'no-invalid-this': 'error',
        'no-iterator': 'error',
        'no-labels': 'error',
        'no-lone-blocks': 'error',
        'no-loop-func': 'error',
        'no-multi-spaces': [
            'error',
            {
                exceptions: {
                    Property: true
                }
            }
        ],
        'no-multi-str': 'error',
        'no-new': 'error',
        'no-proto': 'error',
        'no-return-assign': 'error',
        'no-return-await': 'error',
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-unmodified-loop-condition': 'error',
        'no-useless-call': 'error',
        'no-useless-catch': 'error',
        'no-useless-concat': 'error',
        'no-useless-return': 'error',
        'require-await': 'error',
        'no-shadow-restricted-names': 'error',
        'no-undef-init': 'error',
        'no-unused-vars': 'error',
        'no-sync': 'error',
        'no-process-exit': 'error',
        'array-bracket-spacing': 'error',
        'block-spacing': 'error',
        'brace-style': [
            'error',
            '1tbs',
            {
                allowSingleLine: true
            }
        ],
        'comma-dangle': 'error',
        'comma-spacing': 'error',
        'comma-style': 'error',
        'computed-property-spacing': 'error',
        'consistent-this': 'error',
        'eol-last': 'error',
        'func-call-spacing': 'error',
        'func-name-matching': 'error',
        'func-names': 'off',
        'func-style': [
            'error',
            'declaration',
            {
                allowArrowFunctions: true
            }
        ],
        'function-paren-newline': [
            'error',
            'consistent'
        ],
        'implicit-arrow-linebreak': 'error',
        'indent': [
            'error',
            4,
            {
                SwitchCase: 1,
                MemberExpression: 1,
                FunctionDeclaration: {
                    parameters: 'first'
                },
                FunctionExpression: {
                    parameters: 'first'
                },
                CallExpression: {
                    arguments: 'first'
                },
                ArrayExpression: 1,
                ObjectExpression: 1
            }
        ],
        'key-spacing': [
            'error',
            {
                align: 'value',
                beforeColon: false,
                afterColon: true
            }
        ],
        'keyword-spacing': 'error',
        'linebreak-style': [
            'error',
            'unix'
        ],
        'lines-between-class-members': 'error',
        'max-depth': 'error',
        'max-len': [
            'error',
            160
        ],
        'max-lines': [
            'error',
            {
                max: 1000,
                skipBlankLines: true,
                skipComments: true
            }
        ],
        'max-nested-callbacks': 'error',
        'max-params': [
            'error',
            6
        ],
        'max-statements': [
            'error',
            30
        ],
        'new-parens': 'error',
        'no-array-constructor': 'error',
        'no-bitwise': 'error',
        'no-mixed-operators': [
            'error',
            {
                groups: [
                    [
                        '&',
                        '|',
                        '^',
                        '~',
                        '<<',
                        '>>',
                        '>>>'
                    ],
                    [
                        '==',
                        '!=',
                        '===',
                        '!==',
                        '>',
                        '>=',
                        '<',
                        '<='
                    ],
                    [
                        '&&',
                        '||'
                    ],
                    [
                        'in',
                        'instanceof'
                    ]
                ]
            }
        ],
        'no-multi-assign': 'error',
        'no-multiple-empty-lines': [
            'error',
            {
                max: 1
            }
        ],
        'no-nested-ternary': 'error',
        'no-new-object': 'error',
        'no-trailing-spaces': 'error',
        'no-unneeded-ternary': 'error',
        'no-whitespace-before-property': 'error',
        'nonblock-statement-body-position': 'error',
        'object-curly-spacing': 'error',
        'one-var-declaration-per-line': 'error',
        'operator-assignment': 'error',
        'operator-linebreak': [
            'error',
            'after',
            {
                overrides: {
                    '?': 'before',
                    ':': 'before'
                }
            }
        ],
        'padded-blocks': [
            'error',
            'never'
        ],
        'padding-line-between-statements': [
            'error',
            {
                blankLine: 'always',
                prev: '*',
                next: 'return'
            },
            {
                blankLine: 'always',
                prev: '*',
                next: 'class'
            },
            {
                blankLine: 'always',
                prev: 'class',
                next: '*'
            },
            {
                blankLine: 'always',
                prev: '*',
                next: 'function'
            },
            {
                blankLine: 'always',
                prev: 'function',
                next: '*'
            }
        ],
        'quote-props': [
            'error',
            'as-needed'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'semi-spacing': 'error',
        'semi-style': 'error',
        'space-before-blocks': 'error',
        'space-before-function-paren': [
            'error',
            'never'
        ],
        'space-in-parens': [
            'error',
            'never'
        ],
        'space-infix-ops': [
            'error',
            {
                int32Hint: true
            }
        ],
        'arrow-parens': [
            'error',
            'as-needed'
        ],
        'arrow-spacing': [
            'error',
            {
                before: true,
                after: true
            }
        ],
        'no-confusing-arrow': 'error',
        'no-duplicate-imports': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-constructor': 'error',
        'no-useless-rename': 'error',
        'no-var': 'error',
        'object-shorthand': 'error',
        'prefer-spread': 'error',
        'prefer-rest-params': 'error',
        'prefer-template': 'error',
        'rest-spread-spacing': 'error',
        'yoda': [
            'error',
            'never'
        ],
        'default-case': 'error',
        'no-with': 'error',
        'wrap-iife': [
            'error',
            'outside'
        ]
    }
};
