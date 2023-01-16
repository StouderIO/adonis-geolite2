import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { GeoLite2Contract } from '@ioc:StouderIO/GeoLite2'
import { CountryResponse, CityResponse, AsnResponse, Reader } from 'maxmind'

export class GeoLite2 implements GeoLite2Contract {
  constructor(
    private ctx: HttpContextContract,
    private countryReader: Reader<CountryResponse>,
    private cityReader: Reader<CityResponse>,
    private asnReader: Reader<AsnResponse>
  ) {}

  private get ip(): string {
    return this.ctx.request.ip()
  }

  public country(ip?: string): CountryResponse | null {
    if (!ip) {
      ip = this.ip
    }
    return this.countryReader.get(ip)
  }
  public city(ip?: string): CityResponse | null {
    if (!ip) {
      ip = this.ip
    }
    return this.cityReader.get(ip)
  }
  public asn(ip?: string): AsnResponse | null {
    if (!ip) {
      ip = this.ip
    }
    return this.asnReader.get(ip)
  }
}