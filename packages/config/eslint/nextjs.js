import { FlatCompat } from '@eslint/eslintrc'
import reactConfig from './react.js'

const compat = new FlatCompat()

/** @type {import("eslint").Linter.Config[]} */
export default [...reactConfig, ...compat.extends('next/core-web-vitals')]
