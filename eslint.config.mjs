import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { 
    languageOptions: { 
      globals: { 
        ...globals.browser, 
        ...globals.node 
      } 
    } 
  },
  {
    files: ['**/__tests__/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.jest
      }
    }
  },
  pluginJs.configs.recommended,
];
