import type { AsnResponse, CityResponse, CountryResponse, Reader } from 'maxmind'

export type AllReaders = {
  country: Reader<CountryResponse>
  city: Reader<CityResponse>
  asn: Reader<AsnResponse>
}

export interface GeoLite2Service {
  init(): Promise<void>
  close(): void

  getReaders(): AllReaders
}

export interface GeoLite2Contract {
  country(ip?: string): CountryResponse | null
  city(ip?: string): CityResponse | null
  asn(ip?: string): AsnResponse | null
}

export interface GeoLite2Config {
  downloadDirectory: string
  cache: number
}

export interface ResolvedGeoLite2Config {
  downloadDirectory: string
  cache: number
}
