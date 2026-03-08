import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  {
      rules: {
      curly: ['error', 'all'],
      quotes: ['error', 'single'],
      'no-alert': 'error',
      'no-console': 'error',
      'no-redeclare': 'off',
      'no-var': 'error',
      'no-template-curly-in-string': 'error',
      'prefer-destructuring': 'warn',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'semi': 'error',
      'no-undef': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/camelcase': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
      ],
    },
    },
]);

export default eslintConfig;
