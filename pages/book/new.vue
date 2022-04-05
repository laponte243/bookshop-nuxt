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
                          v-model="genres"
                          :items="categorias"
                          item-value="id"
                          item-text="name"
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
                          :rules="priceRule"
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
                        <v-text-field
                          v-model="copy"
                          :rules="copyRule"
                          label="Copias"
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
                              v-model="subitem.wallet"
                              :rules="[v => (v || '' ).length <= 40 || '40 caracteres o menos']"
                              label="Wallet Near"
                              append-icon="mdi-account"
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
                              v-model="subitem.percent"
                              :rules="percentRule"
                              label="Porcentaje"
                              append-icon="mdi-percent"
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
                        />
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
              @click="create_item"
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
const { connect, keyStores, WalletConnection, Contract, utils } = nearAPI

export default {
  data () {
    return {
      e6: 1,
      cover: null,
      book: null,
      title: null,
      description: null,
      copy: null,
      price: null,
      url: null,
      genres: [],
      categorias: [],
      subitem: {
        wallet: null,
        percent: null
      },
      rules_url: [
        value => this.isURL(value) || 'URL is not valid'
      ],
      priceRule: [
        value => (!isNaN(parseFloat(value)) && value >= 0 && value <= 999999999) || 'precio no valido'
      ],
      copyRule: [
        value => (Number.isInteger(Number(value)) && value >= 0 && value <= 100) || 'Maximo de 100 copias'
      ],
      percentRule: [
        value => (!isNaN(parseFloat(value)) && value >= 0 && value <= 99) || 'porcentaje no valido'
      ]
    }
  },
  mounted () {
    this.getCategorias()
  },
  methods: {
    Preview_image () {
      this.url = URL.createObjectURL(this.cover)
    },
    async ipfs_send () {
      const formData = new FormData()
      formData.append('cover', this.cover)
      formData.append('book', this.book)
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
    async getCategorias () {
      this.categorias = []
      const CONTRACT_NAME = 'book3.bookshop.testnet'
      // connect to NEAR
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore())
      )
      // create wallet connection
      const wallet = new WalletConnection(near)
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        viewMethods: ['get_category'],
        sender: wallet.account()
      })
      if (wallet.isSignedIn()) {
        await contract.get_category().then((response) => {
          this.categorias = response
        })
      }
    },
    async create_item () {
      const CONTRACT_NAME = 'book3.bookshop.testnet'
      const direccionIpfs = '.ipfs.dweb.link'
      // connect to NEAR
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore())
      )
      // create wallet connection
      const wallet = new WalletConnection(near)
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        changeMethods: ['nft_series'],
        sender: wallet.account()
      })
      const formData = new FormData()
      formData.append('cover', this.cover)
      formData.append('book', this.book)
      await this.$axios.$post('/api/uploader/web3storage', formData).then((data) => {
        contract.nft_series(
          {
            token_metadata: {
              title: this.title,
              description: this.description,
              media: 'https://' + data.data + direccionIpfs + '/' + data.nombre_cover,
              reference: data.data,
              copies: this.copies,
              extra: 'https://' + data.data + direccionIpfs + '/' + data.nombre_libro
            },
            category: this.genres,
            price: utils.format.parseNearAmount(this.price),
            royalty: {
              'hpalencia.test.testnet': 1000
            }
          },
          '300000000000000',
          '1000000000000000000000000'
        ).then((response) => {
          console.log(response)
        }).catch((error) => {
          console.log(error)
        })
      })
    }
  }
}
</script>
