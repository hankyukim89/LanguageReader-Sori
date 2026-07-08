import { defineConfig } from 'vite'

export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : '/LanguageReader-Sori/',
}))
