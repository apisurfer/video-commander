const registry = {}

export function registerProvider(providerId, provider) {
  registry[providerId] = provider
}

export function unregisterProvider(providerId) {
  delete registry[providerId]
}

export function getAvailableProviders() {
  return Object.keys(registry)
}

export function getProvider(providerId) {
  return registry[providerId]
}
