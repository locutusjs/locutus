import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Include all vitest tests
    include: ['**/*.vitest.ts', 'test/util/**/*.ts'],
    // Set timezone for consistency with existing tests
    env: {
      TZ: 'UTC',
    },
  },
})
