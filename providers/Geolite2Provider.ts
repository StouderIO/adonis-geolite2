import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { GeoLite2 } from '../src/GeoLite2'
import GeoLite2Manager from '../src/GeoLite2Manager'

export default class GeoLite2Provider {
  constructor(protected app: ApplicationContract) {}

  public async register() {
    this.app.container.singleton('StouderIO/GeoLite2', () => {
      return new GeoLite2Manager(this.app)
    })
  }

  public async boot() {
    const manager = this.app.container.resolveBinding('StouderIO/GeoLite2')
    await manager.init()

    const HttpContext = this.app.container.resolveBinding('Adonis/Core/HttpContext')
    HttpContext.getter(
      'geolite2',
      function () {
        return new GeoLite2(
          this,
          manager.getCountryReader(),
          manager.getCityReader(),
          manager.getAsnReader()
        )
      },
      true
    )
  }

  public async ready() {}

  public async shutdown() {
    const manager = this.app.container.resolveBinding('StouderIO/GeoLite2')
    manager.close()
  }
}
