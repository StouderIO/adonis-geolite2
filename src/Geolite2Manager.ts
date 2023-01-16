import maxmind, { Reader, CountryResponse, AsnResponse, CityResponse } from 'maxmind'
import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import type { Geolite2ManagerContract } from '@ioc:StouderIO/Geolite2'

export default class Geolite2Manager implements Geolite2ManagerContract {
  private countryReader: Reader<CountryResponse>
  private cityReader: Reader<CityResponse>
  private asnReader: Reader<AsnResponse>
  private closeAllCallback: () => void

  constructor(protected app: ApplicationContract) {}

  public async init() {
    // Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn.
    const geolite2: typeof import('geolite2-redist') = await Function(
      'return import("geolite2-redist")'
    )()

    const countryReader = await geolite2.open(geolite2.GeoIpDbName.Country, (dbPath) =>
      maxmind.open<CountryResponse>(dbPath)
    )
    const cityReader = await geolite2.open(geolite2.GeoIpDbName.City, (dbPath) =>
      maxmind.open<CityResponse>(dbPath)
    )
    const asnReader = await geolite2.open(geolite2.GeoIpDbName.ASN, (dbPath) =>
      maxmind.open<AsnResponse>(dbPath)
    )

    this.countryReader = countryReader
    this.cityReader = cityReader
    this.asnReader = asnReader

    // Trickery needed to access the WrapperReader type
    this.closeAllCallback = () => {
      countryReader.close()
      cityReader.close()
      asnReader.close()
    }
  }

  public getCountryReader(): Reader<CountryResponse> {
    return this.countryReader
  }

  public getCityReader(): Reader<CityResponse> {
    return this.cityReader
  }

  public getAsnReader(): Reader<AsnResponse> {
    return this.asnReader
  }

  public close() {
    this.closeAllCallback()
  }
}
