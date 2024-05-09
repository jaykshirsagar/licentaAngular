// esbuild.config.js
const { build } = require('esbuild');

build({
    loader: {
        ".node": "file"
    },
    // ... other build options
});