import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettierConfig from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'

export default [
  { ignores: ['dist', 'node_modules', 'build'] }, //Игнор директорий ESLint
  {
    files: ['**/*.{js,jsx}'], //Файлы, к которым применяются эти настройки
    languageOptions: {
      ecmaVersion: 2021,
      globals: {
        //Добавляем переменные
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true }, //Включает поддержку JSX
        sourceType: 'module',
      },
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          moduleDirectory: ['node_modules', 'src/'], //Список директорий, где нужно искать модули
        },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...prettierConfig.rules,
      'react/jsx-no-target-blank': 'off',
      'react/react-in-jsx-scope': 'off', //Отключает правило, которое требует импортировать React в каждом файле с JSX
      'react/prop-types': 0, //Отключает правило, требующее задавать propTypes для компонентов React
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'prettier/prettier': 'error', //Ошибка, если код не соответствует правилам Prettier
      'import/no-unresolved': [2, { caseSensitive: false }],
      'import/order': [
        //Включает правило, требующее упорядочивания импортов
        2,
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],
    },
  },
]