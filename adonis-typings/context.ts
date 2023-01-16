declare module '@ioc:Adonis/Core/HttpContext' {
  import { GeoLite2Contract } from '@ioc:StouderIO/GeoLite2'

  interface HttpContextContract {
    geolite2: GeoLite2Contract
  }
}
