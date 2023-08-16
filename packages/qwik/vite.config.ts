import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import dts from "vite-plugin-dts"
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: {
    target: "es2020",
    lib: {
      entry: "./src/index.ts",
      formats: ["es", "cjs"],
      fileName: (format) => `index.qwik.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
  },
  plugins: [
    qwikVite(),
    tsconfigPaths(),
    dts({
      cleanVueFileName: true,
      copyDtsFiles: true,
      outDir: './lib-types',
      include: [
        './src'
      ],
    }),
  ],
});
