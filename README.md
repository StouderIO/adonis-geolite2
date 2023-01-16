<div align="center">
  <img src="https://user-images.githubusercontent.com/2575182/212580654-fdde40b5-418b-4b72-97b3-5a15a6328590.png" />
  <h3>@stouder-io/adonis-geolite2</h3>
  <p>Maxmind's GeoLite2 integration for Adonis</p>
  <a href="https://www.npmjs.com/package/@stouder-io/adonis-geolite2">
    <img src="https://img.shields.io/npm/v/@stouder-io/adonis-geolite2.svg?style=for-the-badge&logo=npm" />
  </a>
  <img src="https://img.shields.io/npm/l/@stouder-io/adonis-geolite2?color=blueviolet&style=for-the-badge" />
  <img alt="npm" src="https://img.shields.io/npm/dt/@stouder-io/adonis-geolite2?style=for-the-badge">
</div>

## Legal Warning
This package uses [geolite2-redist](https://www.npmjs.com/package/geolite2-redist) and thus, you MUST comply with it specifics conditions. For more informations please check their [npm page](https://www.npmjs.com/package/geolite2-redist#user-content-legal-warning).

## Installation
This package is available in the npm registry.
```
npm i @stouder-io/adonis-geolite2
```

Next, configure the package by running the following command.
```
node ace configure @stouder-io/adonis-geolite2
```

## Usage
The geolite2 is automatically attached to HTTP requests, allowing you to use it to retries informations about the geolocation of requesting IPs.
```ts
Route.get('/', async ({ geolite2 }: HttpContextContract) => {
    const country = geolite2.country()
    const city = geolite2.city()
    const asn = geolite2.asn()

    return { country, city, asn }
})
```

If no parameter is provided to the functions, it uses [`request.ip()`](https://docs.adonisjs.com/guides/request#request-ip-address). Alternatively you can pass the IP you want to lookup.

```ts
Route.get('/', async ({ geolite2 }: HttpContextContract) => {
    const country = geolite2.country('8.8.8.8')
    const city = geolite2.city('8.8.8.8')
    const asn = geolite2.asn('8.8.8.8')

    return { country, city, asn }
})
```