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
            @click="e6 = 1"
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
                          label="Precio en Ⓝ"
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
            :complete="e6 > 2"
            @click="e6 = 2"
            step="2"
          >
            Regalias
          </v-stepper-step>
          <v-stepper-content step="2">
            <v-container>
              <v-card
                outlined
                elevation="5"
              >
                <v-card-text>
                  <v-row>
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
                            @click="addSubitem"
                          >
                            <v-icon>
                              mdi-plus
                            </v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      md="6"
                      lg="6"
                    >
                      <v-list
                        outlined
                      >
                        <v-list-item
                          v-for="(item, i) in regalias"
                          :key="i"
                        >
                          <v-list-item-content>
                            <v-list-item-title v-text="item.wallet"></v-list-item-title>
                            <v-list-item-subtitle v-text="item.percent+'%'"></v-list-item-subtitle>
                          </v-list-item-content>

                          <v-list-item-avatar>
                            <v-icon
                              color="pink"
                            >
                              mdi-account
                            </v-icon>
                          </v-list-item-avatar>
                        </v-list-item>
                      </v-list>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
              <v-btn
                color="primary"
                @click="e6 = 3"
              >
                Continuar
              </v-btn>
            </v-container>
          </v-stepper-content>
          <v-stepper-step
            :complete="e6 > 3"
            step="3"
            @click="e6 = 3"
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
              @click="e6 = 4"
            >
              Continuar
            </v-btn>
          </v-stepper-content>

          <v-stepper-step
            :complete="e6 > 4"
            @click="e6 = 3"
            step="4"
          >
            Términos y Condiciones
          </v-stepper-step>
          <v-stepper-content step="4">
            <v-card
              color="grey lighten-1"
              class="mb-12"
              height="200px"
            ></v-card>
            <v-dialog
              v-model="beforeBuyDialog"
              width="500"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="#cf66a5"
                  dense
                  class="white--text"
                  large
                  v-bind="attrs"
                  v-on="on"
                >
                  Confirmar creación
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  Confirmación de creación
                </v-card-title>
                <v-card-text>
                  <p>Storage fee: 0.015Ⓝ</p>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn
                    color="secondary"
                    text
                    @click="beforeBuyDialog = false"
                  >
                    Cancelar
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    text
                    @click="beforeBuyDialog = false, create_item()"
                  >
                    Confirmar creación
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
      beforeBuyDialog: false,
      validaciones: {
        form1: false,
        form2: false,
        form3: false,
        form4: false
      },
      genres: [],
      categorias: [],
      regalias: [],
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
  created () {
    if (this.$route.query.transactionHashes) {
      this.$toast.success('Libro creado correctamente')
    }
  },
  mounted () {
    this.getCategorias()
  },
  methods: {
    Preview_image () {
      this.url = URL.createObjectURL(this.cover)
    },
    addSubitem () {
      this.regalias.push(this.subitem)
      this.subitem = {
        wallet: null,
        percent: null
      }
    },
    async ipfs_send () {
      const formData = new FormData()
      formData.append('cover', this.cover)
      formData.append('book', this.book)
      const { data } = await this.$axios.$post('api/uploader/web3storage', formData)
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
      const CONTRACT_NAME = 'book.bookshop2.testnet'
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
      const CONTRACT_NAME = 'book.bookshop2.testnet'
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
      const relagia = {}
      this.regalias.forEach((element) => {
        relagia[element.wallet] = element.percent * 100
      })
      this.$toast.show('Inicio subida de archivos...')
      await this.$axios.$post('api/uploader/web3storage', formData).then((data) => {
        this.$toast.show('Inicio subida a contrato...')
        contract.nft_series(
          {
            token_metadata: {
              title: this.title,
              description: this.description,
              media: 'https://' + data.data + direccionIpfs + '/' + data.nombre_cover,
              reference: data.data,
              copies: parseInt(this.copy),
              extra: 'https://' + data.data + direccionIpfs + '/' + data.nombre_libro
            },
            category: this.genres,
            price: utils.format.parseNearAmount(this.price),
            royalty: relagia
          },
          '300000000000000',
          '1000000000000000000000000'
        ).then((response) => {
          this.$toast.success('Libro creado correctamente')
        }).catch((error) => {
          console.log(error)
          this.$toast.error('Ops, algo salio mal')
        })
      })
    }
  }
}
</script>
