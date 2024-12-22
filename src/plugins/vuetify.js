import { createVuetify } from 'vuetify'
import 'vuetify/styles' // Ensure you import the styles
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export const vuetify = createVuetify({
  components,
  directives,
})
