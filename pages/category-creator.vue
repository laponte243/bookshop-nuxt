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
              v-if="url && !item.id"
              width="120px"
              :src="url"
            />
            <v-img
              v-if="url && item.id"
              width="120px"
              :src="item.imagen"
            />
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="2"
          >
            <v-btn
              v-if="!item.id"
              color="success"
              @click="add_item"
            >
              Agregar
            </v-btn>

            <v-btn
              v-else
              color="warning"
              @click="add_item"
            >
              Editar
            </v-btn>
            <v-btn
              icon
              @click="clear_item"
            >
            <v-icon>
              mdi-delete
              </v-icon>
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
      url: null
    }
  },
  mounted () {
    this.fetch_data()
    // this.$router.push('./')
  },
  methods: {
    Preview_image () {
      this.url = URL.createObjectURL(this.item.imagen)
    },
    add_item () {
      if (this.item.id) {
        this.update_item(this.item)
      } else {
        this.create_item(this.item)
        this.data_table.push(this.item)
      }
    },
    edit_item (item) {
      this.item = item
    },
    clear_item () {
      this.item = {
        id: null,
        nombre: null,
        imagen: null
      }
    },
    async fetch_data () {
      this.data_table = []
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
      await contract.get_category().then((response) => {
        response.forEach((element) => {
          this.data_table.push({ id: element.id, nombre: element.name, imagen: element.img })
        })
      })
    },
    async create_item (item) {
      const CONTRACT_NAME = 'book.bookshop2.testnet'
      const direccionIpfs = '.ipfs.dweb.link'
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
      const formData = new FormData()
      formData.append('imagen', this.item.imagen)
      await this.$axios.$post('api/uploader/categoria', formData).then((data) => {
        contract.set_category({
          name: this.item.nombre,
          img: 'https://' + data.data + direccionIpfs + '/' + data.nombre
        }).then((response) => {
          this.fetch_data()
        })
      })
    },
    async update_item (item) {
      const CONTRACT_NAME = 'book.bookshop2.testnet'
      const direccionIpfs = '.ipfs.dweb.link'
      // connect to NEAR
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore())
      )
      // create wallet connection
      const wallet = new WalletConnection(near)
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        changeMethods: ['put_category'],
        sender: wallet.account()
      })
      const formData = new FormData()
      formData.append('imagen', this.item.imagen)
      await this.$axios.$post('api/uploader/categoria', formData).then((data) => {
        contract.put_category({
          category_id: this.item.id,
          name: this.item.nombre,
          img: 'https://' + data.data + direccionIpfs + '/' + data.nombre
        }).then((response) => {
          this.fetch_data()
        })
      })
    }
  }
}
</script>

<style>

</style>
