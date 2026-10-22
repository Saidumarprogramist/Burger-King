export async function load(url, context, nextLoad) {
  if (/\.(png|svg)(\?.*)?$/.test(url)) {
    return { format: 'module', shortCircuit: true, source: 'export default "mock-image";' }
  }
  return nextLoad(url, context)
}
