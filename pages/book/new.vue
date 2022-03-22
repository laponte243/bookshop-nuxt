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
      <v-card-text>
        <v-stepper
          v-model="e6"
          vertical
        >
          <v-stepper-step
            :complete="e6 > 1"
            step="1"
          >
            Cuentanos sobre tu libro
          </v-stepper-step>

          <v-stepper-content step="1">
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
                          label="Título"
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
                        <v-textarea
                          v-model="description"
                          label="Descripción"
                          clearable
                          counter
                          outlined
                          :rules="[v => (v || '' ).length <= 255 || '255 caracteres o menos']"
                          auto-grow
                          append-icon="mdi-text"
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
                          label="Generos"
                          multiple
                          hint="Selecciona uno o varios"
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
                        <v-text-field
                          v-model="price"
                          :rules="[v => (v || '' ).length <= 10 || '10 caracteres o menos', v => (v || '' ) > 0 || 'Debe ser numerico > 0']"
                          label="Precio"
                          append-icon="mdi-wallet"
                          outlined
                          number
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="12"
                        md="6"
                        lg="6"
                      >
                        <v-row>
                          <v-col
                            cols="12"
                            sm="12"
                            md="12"
                            lg="5"
                          >
                            <v-text-field
                              v-model="title"
                              :rules="[v => (v || '' ).length <= 40 || '40 caracteres o menos']"
                              label="Cuenta Near"
                              append-icon="mdi-book"
                              outlined
                            />
                          </v-col>
                          <v-col
                            cols="12"
                            sm="12"
                            md="12"
                            lg="5"
                          >
                            <v-text-field
                              v-model="title"
                              :rules="[v => (v || '' ).length <= 2 || '2 caracteres o menos', v => (v || '' ) > 0 || 'Debe ser numerico > 0']"
                              label="Porcentaje"
                              append-icon="mdi-book"
                              outlined
                            />
                          </v-col>
                          <v-col
                            cols="12"
                            sm="12"
                            md="12"
                            lg="2"
                          >
                            <v-btn
                            light
                            color="indigo"
                            icon
                            fab
                            >
                            <v-icon>
                              mdi-plus
                            </v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </div>
                </v-card-text>
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
            :complete="e6 > 3"
            step="2"
          >
            Hora de subir tu libro!
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
                        <v-file-input
                          v-model="cover"
                          outlined
                          label="Portada"
                          accept="image/*"
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
                          v-model="book"
                          label="Archivo del libro"
                          hint="Formato epub, pdf o mobi"
                          accept=".pdf, .epub, .mobi"
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
              @click="e6 = 3"
            >
              Continuar
            </v-btn>
          </v-stepper-content>

          <v-stepper-step step="3">
            Términos y Condiciones
          </v-stepper-step>
          <v-stepper-content step="3">
            <v-card
              color="grey lighten-1"
              class="mb-12"
              height="200px"
            ></v-card>
            <v-btn
              color="primary"
              @click="e6 = 1"
            >
              Aceptar y culminar
            </v-btn>
          </v-stepper-content>
        </v-stepper>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import * as nearAPI from 'near-api-js'
import { CONFIG } from '@/services/api'
const { connect, keyStores, WalletConnection, Contract } = nearAPI

export default {
  data () {
    return {
      e6: 1,
      cover: null,
      book: null,
      title: null,
      description: null,
      genres: [],
      rules_url: [
        value => this.isURL(value) || 'URL is not valid'
      ]
    }
  },
  methods: {
    Preview_image () {
      this.url = URL.createObjectURL(this.cover)
    },
    async ipfs_send () {
      const formData = new FormData()
      formData.append('book', this.cover)
      formData.append('cover', this.book)
      const { data } = await this.$axios.$post('/api/uploader/web3storage', formData)
      return data
    },
    isURL (str) {
      let url
      try {
        url = new URL(str)
      } catch (_) {
        return false
      }
      return url.protocol === 'http:' || url.protocol === 'https:'
    },
    async setData () {
      const CONTRACT_NAME = 'book.bookshop.testnet'
      // connect to NEAR
      const near = await connect(CONFIG(new keyStores.BrowserLocalStorageKeyStore()))
      // create wallet connection
      const wallet = new WalletConnection(near)
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        changeMethods: ['nft_series'],
        sender: wallet.account()
      })
      if (wallet.isSignedIn()) {
        await contract.nft_series(
          {
            token_metadata: this.profile.website,
            category: this.profile.bio,
            price: this.profile.bio
          }
        )
      }
    }
  }
}
</script>
