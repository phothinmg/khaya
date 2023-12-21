import * as esbuild from 'esbuild';

await esbuild.build({
    entryPoints: ['opt/index.ts'],
    splitting: true,
    bundle: true,
    outdir: 'src',
    format: 'esm',
    sourcemap: true,
   
   
})