declare module '@ioc:StouderIO/GeoLite2' {
  import { AsnResponse, CityResponse, CountryResponse, Reader } from 'maxmind'

  export interface GeoLite2ManagerContract {
    init(): Promise<void>
    close(): void

    getCountryReader(): Reader<CountryResponse>
    getCityReader(): Reader<CityResponse>
    getAsnReader(): Reader<AsnResponse>
  }

  export interface GeoLite2Contract {
    country(ip?: string): CountryResponse | null
    city(ip?: string): CityResponse | null
    asn(ip?: string): AsnResponse | null
  }

  const GeoLite2Manager: GeoLite2ManagerContract
  export default GeoLite2Manager
}
