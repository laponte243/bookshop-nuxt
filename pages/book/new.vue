<template>
  <v-container
    id="regular-tables"
    class="pt-12 mt-12"
    fluid
    tag="section"
  >
    <v-card
      style="background-color:#d8d8e9"
      title=""
      class="px-5 py-3"
    >
      <v-card-title
        class="#8686BD--text"
        color="#8686BD"
      >
        Estas a pocos pasos de publicar tu libro!
      </v-card-title>
      <v-card-content>
        <v-stepper
          v-model="e6"
          vertical
        >
          <v-stepper-step
            :complete="e6 > 1"
            step="1"
          >
            Primero lo primero, Completa tu perfil!
          </v-stepper-step>

          <v-stepper-content step="1">
            <v-container>
              <v-card
                outlined
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
            <v-btn
              color="primary"
              @click="e6 = 2"
            >
              Continuar
            </v-btn>
          </v-stepper-content>

          <v-stepper-step
            :complete="e6 > 2"
            step="2"
          >
            Cuentanos sobre tu libro
          </v-stepper-step>

          <v-stepper-content step="2">
            <v-container>
              <v-card
                outlined
                elevation="5"
              >
                <v-card-text>
                  <div class="text--primary">
                    <v-row>
                      <v-col
                        cols="12"
                        sm="12"
                        md="6"
                        lg="6"
                      >
                        <v-text-field
                          v-model="title"
                          :rules="[v => (v || '' ).length <= 40 || '40 caracteres o menos']"
                          label="Title"
                          append-icon="mdi-book"
                          outlined
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="12"
                        md="6"
                        lg="6"
                      >
                        <v-select
                          v-model="e6"
                          :menu-props="{ maxHeight: '400' }"
                          label="Genres"
                          multiple
                          hint="Selecciona una o varias"
                          append-icon="mdi-tag-multiple"
                          outlined
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="12"
                        md="6"
                        lg="6"
                      >
                        <v-textarea
                          label="Description"
                          clearable
                          counter
                          outlined
                          :rules="[v => (v || '' ).length <= 255 || '255 caracteres o menos']"
                          auto-grow
                          append-icon="mdi-text"
                        />
                      </v-col>
                    </v-row>
                  </div>
                </v-card-text>
              </v-card>
            </v-container>
            <v-btn
              color="primary"
              @click="e6 = 3"
            >
              Continue
            </v-btn>
          </v-stepper-content>

          <v-stepper-step
            :complete="e6 > 3"
            step="3"
          >
            Hora de subir tu libro!
          </v-stepper-step>

          <v-stepper-content step="3">
            <v-container>
              <v-card
                outlined
                elevation="5"
              >
                <v-card-text>
                  <div class="text--primary">
                    <v-row>
                      <v-col
                        cols="12"
                        sm="12"
                        md="6"
                        lg="6"
                      >
                        <v-file-input
                          v-model="image"
                          outlined
                          @change="Preview_image"
                        />
                        <v-img :src="url" />
                      </v-col>

                      <v-col
                        cols="12"
                        sm="12"
                        md="6"
                        lg="6"
                      >
                        <v-file-input
                          v-model="document"
                          outlined
                        />
                      </v-col>
                    </v-row>
                  </div>
                </v-card-text>
              </v-card>
            </v-container>
            <v-btn
              color="primary"
              @click="e6 = 4"
            >
              Continue
            </v-btn>
            <v-btn text>
              Cancel
            </v-btn>
          </v-stepper-content>

          <v-stepper-step step="4">
            Términos y Condiciones
          </v-stepper-step>
          <v-stepper-content step="4">
            <v-card
              color="grey lighten-1"
              class="mb-12"
              height="200px"
            ></v-card>
            <v-btn
              color="primary"
              @click="e6 = 1"
            >
              Continue
            </v-btn>
            <v-btn text>
              Cancel
            </v-btn>
          </v-stepper-content>
        </v-stepper>
      </v-card-content>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      e6: 1,
      url: null,
      image: null,
      document: null
    }
  },
  methods: {
    Preview_image () {
      this.url = URL.createObjectURL(this.image)
    }
  }
}
</script>
