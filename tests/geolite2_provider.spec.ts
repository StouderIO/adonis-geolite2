import { test } from '@japa/runner'
import { IgnitorFactory } from '@adonisjs/core/factories'
import { defineConfig } from '../src/define_config.js'
import GeoLite2Manager from '../src/manager.js'

const BASE_URL = new URL('./tmp/', import.meta.url)

test.group('GeoLite2 Provider', () => {
  test('register geolite2 provider', async ({ assert }) => {
    const ignitor = new IgnitorFactory()
      .withCoreConfig()
      .withCoreProviders()
      .merge({
        config: {
          geolite2: defineConfig({
            downloadDirectory: './tmp',
            cache: 6000,
          }),
        },
        rcFileContents: {
          providers: [() => import('../providers/geolite2_provider.js')],
        },
      })
      .create(BASE_URL)

    const app = ignitor.createApp('web')
    await app.init()
    await app.boot()
    assert.instanceOf(await app.container.make('geolite2'), GeoLite2Manager)
    await app.terminate()
  })

  test('throw error when config is invalid', async () => {
    const ignitor = new IgnitorFactory()
      .withCoreConfig()
      .withCoreProviders()
      .merge({
        config: {
          geolite2: {},
        },
        rcFileContents: {
          providers: [() => import('../providers/geolite2_provider.js')],
        },
      })
      .create(BASE_URL)

    const app = ignitor.createApp('web')
    await app.init()
    await app.boot()
    await app.container.make('geolite2')
  }).throws(
    'Invalid default export from "config/geolite2.ts" file. Make sure to use defineConfig method'
  )
})
