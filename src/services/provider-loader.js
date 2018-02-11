import {getProvider} from './provider-registry'
import injectScript from '../util/inject-script'
import monitorUntil from '../util/monitor-until'

const providerAPIs = {}

function isProviderAPILoaded(providerId) {
  return !!providerAPIs[providerId]
}

export default function loader(providerId) {
  if (!isProviderAPILoaded(providerId)) {
    const provider = getProvider(providerId)

    if (!provider) throw new Error('Unknown provider')

    injectScript(provider.config.scriptUrl)

    return monitorUntil(100, provider.verifyLoaded)
      .then(() => providerAPIs[providerId] = true)
  }

  return Promise.resolve(true)
}
