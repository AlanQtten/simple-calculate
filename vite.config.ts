import { defineConfig } from 'vite';
import { defineConfig as defineVitestConfig, mergeConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default mergeConfig(
  defineConfig({
    build: {
      lib: {
        entry: './src/main.ts',
        name: 'simple-calculate',
        fileName: 'simple-calculate',
      },
    },
  }),
  defineVitestConfig({
    test: {
      include: ['src/**/__test__/*'],
    },
  })
);
