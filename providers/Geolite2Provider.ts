import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { Geolite2 } from '../src/Geolite2'
import Geolite2Manager from '../src/Geolite2Manager'

export default class Geolite2Provider {
  constructor(protected app: ApplicationContract) {}

  public async register() {
    this.app.container.singleton('StouderIO/Geolite2', () => {
      return new Geolite2Manager(this.app)
    })
  }

  public async boot() {
    const manager = this.app.container.resolveBinding('StouderIO/Geolite2')
    await manager.init()

    const HttpContext = this.app.container.resolveBinding('Adonis/Core/HttpContext')
    HttpContext.getter(
      'geolite2',
      function () {
        return new Geolite2(
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
    const manager = this.app.container.resolveBinding('StouderIO/Geolite2')
    manager.close()
  }
}
