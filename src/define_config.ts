import { configProvider } from '@adonisjs/core'
import { GeoLite2Config, ResolvedGeoLite2Config } from './types.js'
import { ConfigProvider } from '@adonisjs/core/types'

export function defineConfig(config: GeoLite2Config): ConfigProvider<ResolvedGeoLite2Config> {
  return configProvider.create(async (_app) => {
    return {
      downloadDirectory: config.downloadDirectory,
      cache: config.cache,
    }
  })
}
