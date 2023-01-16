declare module '@ioc:Adonis/Core/HttpContext' {
  import { Geolite2Contract } from '@ioc:StouderIO/Geolite2'

  interface HttpContextContract {
    geolite2: Geolite2Contract
  }
}
