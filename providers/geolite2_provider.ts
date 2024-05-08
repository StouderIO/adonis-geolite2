import { ApplicationService } from '@adonisjs/core/types'
import { GeoLite2Config, GeoLite2Service, ResolvedGeoLite2Config } from '../src/types.js'
import GeoLite2Manager from '../src/manager.js'
import { HttpContext } from '@adonisjs/core/http'
import { GeoLite2 } from '../src/geolite2.js'
import { configProvider } from '@adonisjs/core'
import { RuntimeException } from '@poppinss/utils'

declare module '@adonisjs/core/types' {
  export interface ContainerBindings {
    'geolite2.manager': GeoLite2Service
  }
}

export default class GeoLite2Provider {
  constructor(protected app: ApplicationService) {}

  register() {
    this.app.container.singleton('geolite2.manager', async () => {
      const geolite2Config = this.app.config.get<GeoLite2Config>('geolite2')
      const config = await configProvider.resolve<ResolvedGeoLite2Config>(this.app, geolite2Config)

      if (!config) {
        throw new RuntimeException(
          'Invalid config exported from "config/geolite2.ts" file. Make sure to use the defineConfig method'
        )
      }

      return new GeoLite2Manager(config)
    })
  }

  async boot() {
    const manager = await this.app.container.make('geolite2.manager')
    await manager.init()

    HttpContext.getter(
      'geolite2',
      function (this: HttpContext) {
        return new GeoLite2(this, manager.getReaders())
      },
      true
    )
  }

  async shutdown() {
    const manager = await this.app.container.make('geolite2.manager')
    manager.close()
  }
}
