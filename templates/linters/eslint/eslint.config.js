import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

export default [
  // Global settings
  {
    ignores: [
      '**/node_modules',
      '**/dist',
      '**/.astro',
      '**/public',
      '**/build',
      '**/*.d.ts',
      '**/coverage',
      '**/.github',
      '**/*.astro', // Ignorar archivos Astro ya que no tenemos un parser compatible
    ],
  },
  // Base configs
  js.configs.recommended,
  ...tseslint.configs.recommended,
  
  // TypeScript configuration
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      // Desactiva reglas TypeScript que pueden ser problemáticas con componentes shadcn
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
  
  // React configuration específica para componentes shadcn
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      'react/prop-types': 'off', // shadcn utiliza TypeScript para tipos, no prop-types
      'react/react-in-jsx-scope': 'off', // No es necesario con React 17+
      'react/jsx-uses-react': 'off', // No es necesario con React 17+
      'react/display-name': 'off', // Los componentes de shadcn a menudo usan forwardRef
    },
    settings: {
      react: {
        version: 'detect',
      },
      jsx: true,
    },
  },
  
  // Reglas globales para todos los archivos
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  }
]; 