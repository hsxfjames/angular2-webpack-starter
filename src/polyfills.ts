import 'core-js/es6';
import 'core-js/es7/reflect';
// Load zone.js early within polyfills.ts, immediately after the other ES6 and metadata shims.
require('zone.js/dist/zone');

if (process.env.ENV === 'production') {
    // Production
} else {
    // Development and test
    Error['stackTraceLimit'] = Infinity;
    require('zone.js/dist/long-stack-trace-zone');
}
