export default function injectScript(scriptSrc) {
  const refElement = document.getElementsByTagName('title')[0]
  const newScript = document.createElement('script')
  newScript.src = scriptSrc
  refElement.parentNode.insertBefore(newScript, refElement)

  return newScript
}
