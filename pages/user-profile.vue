<template>
  <v-container>
    <v-card
      elevation="5"
    >
      <v-card-text>
        <div>Queremos conocerte mejor</div>
        <p class="text-h4 text--primary">
          Perfil
        </p>
        <div class="text--primary">
          <v-row>
            <v-col
              cols="12"
              sm="12"
              md="4"
              lg="4"
            >
              <v-text-field
                v-model="name"
                :rules="[v => (v || '' ).length <= 30 || '30 caracteres o menos']"
                label="Name"
                append-icon="mdi-account"
                outlined
              />
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="4"
              lg="4"
            >
              <v-text-field
                v-model="lastName"
                :rules="[v => (v || '' ).length <= 30 || '30 caracteres o menos']"
                label="Last Name"
                append-icon="mdi-account"
                outlined
              />
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="4"
              lg="4"
            >
              <v-text-field
                v-model="penName"
                :rules="[v => (v || '' ).length <= 40 || '40 caracteres o menos']"
                label="Pen Name"
                append-icon="mdi-pencil"
                outlined
              />
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="4"
              lg="4"
            >
              <v-text-field
                v-model="website"
                :rules="rules_url"
                label="Website"
                append-icon="mdi-web"
                outlined
              />
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="4"
              lg="4"
            >
              <v-text-field
                v-model="twitter"
                :rules="[v => (v || '' ).length <= 30 || '30 caracteres o menos']"
                outlined
                label="twitter username"
                append-icon="mdi-twitter"
              />
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="6"
              lg="6"
            >
              <v-textarea
                label="Bio"
                clearable
                counter
                outlined
                :rules="[v => (v || '' ).length <= 255 || '255 caracteres o menos']"
                auto-grow
                append-icon="mdi-leaf"
              />
            </v-col>
          </v-row>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          block
          color="secondary"
        >
          guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      e6: 1,
      rules_url: [
        value => this.isURL(value) || 'URL is not valid'
      ]
    }
  },
  methods: {
    isURL (str) {
      let url
      try {
        url = new URL(str)
      } catch (_) {
        return false
      }
      return url.protocol === 'http:' || url.protocol === 'https:'
    }
  }
}
</script>
