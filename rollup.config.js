import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

const input = "./lib/index.ts";
const sourcemap = true;

export default [
  {
    input,
    output: {
      file: "dist/geojson-random.es.mjs",
      format: "es",
      sourcemap,
    },
    plugins: [typescript()],
  },
  {
    input,
    output: {
      file: "dist/index.d.ts",
      format: "es",
    },
    plugins: [dts()],
  },
  {
    input,
    output: {
      file: "dist/geojson-random.cjs",
      format: "cjs",
      sourcemap,
    },
    plugins: [typescript()],
  },
  {
    input,
    output: {
      file: "dist/geojson-random.umd.js",
      format: "umd",
      name: "toGeoJSON",
      sourcemap,
    },
    plugins: [typescript()],
  },
];
