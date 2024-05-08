import * as geolite2 from 'geolite2-redist'
import { type AllReaders, type GeoLite2Service, type ResolvedGeoLite2Config } from './types.js'
import maxmind, { type CountryResponse, type CityResponse, type AsnResponse } from 'maxmind'
import { GeoIpDbName } from 'geolite2-redist'

export default class GeoLite2Manager implements GeoLite2Service {
  private readers: AllReaders | null = null

  private onClose: () => void = () => {}

  constructor(protected config: ResolvedGeoLite2Config) {}

  async initReaders() {
    const country = await geolite2.open(
      GeoIpDbName.Country,
      (path) => maxmind.open<CountryResponse>(path, { cache: { max: this.config.cache } }),
      this.config.downloadDirectory
    )

    const city = await geolite2.open(
      GeoIpDbName.City,
      (dbPath) => maxmind.open<CityResponse>(dbPath, { cache: { max: this.config.cache } }),
      this.config.downloadDirectory
    )

    const asn = await geolite2.open(
      GeoIpDbName.ASN,
      (dbPath) => maxmind.open<AsnResponse>(dbPath, { cache: { max: this.config.cache } }),
      this.config.downloadDirectory
    )

    this.onClose = () => {
      country.close()
      city.close()
      asn.close()
    }

    return {
      country,
      city,
      asn,
    }
  }

  async init() {
    this.readers = await this.initReaders()
  }

  close() {
    if (this.readers === null) {
      return
    }

    this.onClose()
  }

  getReaders() {
    if (this.readers === null) {
      throw new Error('GeoLite2 readers are not initialized')
    }

    return this.readers
  }
}
