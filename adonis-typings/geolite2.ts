declare module '@ioc:StouderIO/Geolite2' {
  import { AsnResponse, CityResponse, CountryResponse, Reader } from 'maxmind'

  export interface Geolite2ManagerContract {
    init(): Promise<void>
    close(): void

    getCountryReader(): Reader<CountryResponse>
    getCityReader(): Reader<CityResponse>
    getAsnReader(): Reader<AsnResponse>
  }

  export interface Geolite2Contract {
    country(ip?: string): CountryResponse | null
    city(ip?: string): CityResponse | null
    asn(ip?: string): AsnResponse | null
  }

  const Geolite2Manager: Geolite2ManagerContract
  export default Geolite2Manager
}
