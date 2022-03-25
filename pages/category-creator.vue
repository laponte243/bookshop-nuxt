<template>
  <v-container>
    <v-card>
      Creador inicial de las categorias
      <v-card-text>
        <v-row>
          <v-col
            cols="12"
            sm="10"
            md="5"
          >
            <v-text-field
              v-model="item.nombre"
              label="Nombre de la categoria"
              outlined
              required
            />
          </v-col>
          <v-col
            cols="12"
            sm="10"
            md="5"
          >
            <v-file-input
              v-model="item.imagen"
              outlined
              label="Imagen"
              accept="image/*"
              @change="Preview_image"
            />
            <v-img
              v-if="url"
              width="120px"
              :src="url"
            />
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="2"
          >
            <v-btn
              color="success"
              @click="add_item"
            >
              Agregar
            </v-btn>
          </v-col>
        </v-row>
        <v-divider />
        <v-row>
          <v-col
            cols="12"
            sm="12"
            md="12"
          >
            <v-data-table
              :headers="header_table"
              :items="data_table"
            >
              <template #[`item.imagen`]="{ item }">
                <v-container>
                  <v-img width="200px" :src="Preview_image2(item)" />
                </v-container>
              </template>
              <template #[`item.acciones`]="{ item }">
                <v-icon
                  color="yellow"
                  class="mr-2"
                  @click="edit_item(item)"
                >
                  mdi-pencil
                </v-icon>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import * as nearAPI from 'near-api-js'
import { CONFIG } from '@/services/api'
const { connect, keyStores, WalletConnection, Contract } = nearAPI
export default {
  name: 'CategoryCreator',
  data () {
    return {
      item: {
        id: null,
        nombre: null,
        imagen: null
      },
      header_table: [
        {
          text: 'Id',
          value: 'id'
        },
        {
          text: 'Nombre',
          value: 'nombre'
        },
        {
          text: 'Imagen',
          value: 'imagen'
        },
        {
          text: 'Acciones',
          value: 'acciones'
        }
      ],
      data_table: [],
      datax: [],
      url: null
    }
  },
  methods: {
    Preview_image () {
      this.url = URL.createObjectURL(this.item.imagen)
    },
    Preview_image2 (item) {
      return URL.createObjectURL(item.imagen)
    },
    add_item () {
      if (this.item.id) {
        this.update_item(this.item)
      } else {
        this.create_item(this.item)
        this.data_table.push(this.item)
      }
      this.item = {
        id: null,
        nombre: null,
        imagen: null
      }
      this.url = null
    },
    edit_item (item) {
      this.item = item
    },
    async fetch_data () {
      const CONTRACT_NAME = 'bookshop.testnet'
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
      await contract.get_nft_series().then((response) => {
        this.datax = response
        console.log(this.datax)
      })
    },
    async create_item(item) {
      const CONTRACT_NAME = 'bookshop.testnet'
      // connect to NEAR
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore())
      )
      // create wallet connection
      const wallet = new WalletConnection(near)
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        changeMethods: ['set_category'],
        sender: wallet.account()
      })
      await contract.set_profile(item.nombre, item.imagen).then((response) => {
        console.log(response)
      })
    },
    }
  }
}
</script>

<style>

</style>
