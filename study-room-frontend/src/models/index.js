
// Use require.context to require reducers automatically
// Ref: https://webpack.js.org/guides/dependency-management/#require-context
const context = require.context('./', false, /\.[t|j]s?$/)
export default context
	.keys()
	.filter(item => item !== './index.js' && item !== './type.ts' && !/.d.ts$/.test(item))
	.map(key => context(key))
