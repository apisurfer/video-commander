export default () => 'x'.repeat(32).replace(/x/g, () => (((16 * Math.random()) | 0).toString(16)))
