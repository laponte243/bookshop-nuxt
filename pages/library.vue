<template>
  <div>
    <v-row
      style="background-color: #C0C0DC"
      class="pt-6 pl-10 pr-10"
      justify="center"
    >
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-select
          v-model="categoria"
          :items="categorias"
          label="Categoria"
          item-value="id"
          item-text="name"
          dense
          solo
          clearable
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-select
          v-model="autor"
          :items="autores"
          label="Autor"
          dense
          solo
          clearable
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-btn
          color="#8C30F5"
          class="white--text"
          block
          @click="nftTokensContract"
        >
          <v-icon class="white--text">
            mdi-magnify
          </v-icon>
          Buscar libro
        </v-btn>
      </v-col>
    </v-row>
    <v-container class="pt-8 mt-8">
      <v-row class="ul1 container">
        <div
          v-for="(item, i) in library"
          :key="i"
          class="col-xs-6 col-sm-4 col-md-3 col text-center"
        >
          <v-card
            class="hover"
            align="center"
          >
            <v-img
              class="white--text align-end imgOffers"
              :src="item.metadata.media"
            />
            <v-card-text class="text--primary text-left">
              <div>
                <div style="font-size:16px; color: #9575CD">
                  {{ item.metadata.title }}
                </div>
              </div>
              <div>
                {{ item.creator_id }}
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn
                v-if="item.price <= 0"
                color="primary"
                class="white--text"
                @click="show_dialog_sale(item.token_series_id)"
              >
                Vender
              </v-btn>
              <v-btn
                v-else
                color="#cf66a5"
                class="white--text"
                @click="show_dialog_out_sale(item.token_series_id)"
              >
                Retirar Venta
              </v-btn>
              <v-dialog
                v-model="putOnSaleDialog"
                width="500"
              >
                <v-card>
                  <v-card-title class="text-h5 grey lighten-2">
                    Confirmar puesta en marketplace
                  </v-card-title>
                  <v-card-text>
                    <p>Storage fee: 0.015Ⓝ</p>
                    <v-text-field
                      v-model="price"
                      :rules="priceRule"
                      label="Precio en Ⓝ"
                      append-icon="mdi-wallet"
                      outlined
                      number
                    />
                  </v-card-text>
                  <v-divider />
                  <v-card-actions>
                    <v-btn
                      color="secondary"
                      text
                      @click="putOnSaleDialog = false"
                    >
                      Cancelar
                    </v-btn>
                    <v-spacer />
                    <v-btn
                      color="primary"
                      text
                      @click="putOnSaleDialog = false, set_price()"
                    >
                      Confirmar venta
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog
                v-model="putOutSaleDialog"
                width="500"
              >
                <v-card>
                  <v-card-title class="text-h5 grey lighten-2">
                    Confirmar sacar del marketplace
                  </v-card-title>
                  <v-divider />
                  <v-card-actions>
                    <v-btn
                      color="secondary"
                      text
                      @click="putOutSaleDialog = false"
                    >
                      Cancelar
                    </v-btn>
                    <v-spacer />
                    <v-btn
                      color="primary"
                      text
                      @click="putOutSaleDialog = false, out_market()"
                    >
                      Confirmar cancelar venta
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-spacer />
              <v-btn
                color="secondary"
                class="white--text"
                @click="show_dialog_review(item.token_series_id)"
              >
                Review
              </v-btn>
              <v-dialog
                v-model="putReviewDialog"
                width="500"
              >
                <v-card>
                  <v-card-title class="text-h5 grey lighten-2">
                    Queremos saber tu opinión!
                  </v-card-title>
                  <v-card-text>
                    <v-rating
                      v-model="critics"
                      background-color="warning lighten-3"
                      color="warning"
                      dense
                    />
                    <v-textarea
                      v-model="review"
                      label="Tu opinión"
                      outlined
                      rows="4"
                    />
                  </v-card-text>
                  <v-divider />
                  <v-card-actions>
                    <v-btn
                      color="secondary"
                      text
                      @click="putReviewDialog = false"
                    >
                      Cancelar
                    </v-btn>
                    <v-spacer />
                    <v-btn
                      color="primary"
                      text
                      @click="putReviewDialog = false, set_review()"
                    >
                      Guinda tu review
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import * as nearAPI from 'near-api-js'
import { CONFIG } from '@/services/api'
const { connect, keyStores, WalletConnection, Contract, utils } = nearAPI

export default {
  name: 'LibraryBook',

  data () {
    return {
      img: true,
      dataNftTokens: [],
      categorias: [],
      autores: [],
      autor: null,
      categoria: null,
      library: [],
      critics: null,
      review: null,
      putOnSaleDialog: false,
      putReviewDialog: false,
      putOutSaleDialog: false,
      price: null,
      tokenForSale: null,
      priceRule: [
        value => (!isNaN(parseFloat(value)) && value >= 0 && value <= 999999999) || 'precio no valido'
      ]
    }
  },
  mounted () {
    this.nftTokensContract()
    this.getCategorias()
  },
  methods: {
    show_dialog_sale (tokenId) {
      this.tokenForSale = tokenId
      this.putOnSaleDialog = true
    },
    show_dialog_out_sale (tokenId) {
      this.tokenForSale = tokenId
      this.putOutSaleDialog = true
    },
    show_dialog_review (tokenId) {
      this.tokenForSale = tokenId
      this.putReviewDialog = true
    },
    viewProduct () {
      this.$router.push({ name: 'product' })
    },
    formatPrice (price) {
      return utils.format.formatNearAmount(price.toLocaleString('fullwide', { useGrouping: false }))
    },
    async nftTokensContract () {
      const CONTRACT_NAME = 'book.bookshop2.testnet'
      // connect to NEAR
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore())
      )
      // create wallet connection
      const wallet = new WalletConnection(near)
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        viewMethods: ['get_nft_token_for_owner_on_sales'],
        sender: wallet.account()
      })
      await contract.get_nft_token_for_owner_on_sales({
        account_id: wallet.getAccountId()
      }).then((res) => {
        this.library = res
      })
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
        viewMethods: ['get_category', 'get_author_market'],
        sender: wallet.account()
      })
      await contract.get_category().then((response) => {
        this.categorias = response
      })
      await contract.get_author_market().then((response) => {
        this.autores = response
      })
    },
    async set_price () {
      const CONTRACT_NAME = 'book.bookshop2.testnet'
      // connect to NEAR
      const near = await connect(CONFIG(new keyStores.BrowserLocalStorageKeyStore()))
      // create wallet connection
      const wallet = new WalletConnection(near)
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        changeMethods: ['put_nft_series_price'],
        sender: wallet.account()
      })
      if (wallet.isSignedIn()) {
        await contract.put_nft_series_price({
          token_series_id: this.tokenForSale,
          price: utils.format.parseNearAmount(this.price)
        },
        '300000000000000',
        '1'
        ).then((res) => {
          this.price = null
          this.tokenForSale = null
          this.nftTokensContract()
        })
      }
    },
    async out_market () {
      const CONTRACT_NAME = 'book.bookshop2.testnet'
      // connect to NEAR
      const near = await connect(CONFIG(new keyStores.BrowserLocalStorageKeyStore()))
      // create wallet connection
      const wallet = new WalletConnection(near)
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        changeMethods: ['put_nft_series_price'],
        sender: wallet.account()
      })
      if (wallet.isSignedIn()) {
        await contract.put_nft_series_price({
          token_series_id: this.tokenForSale,
          price: '0'
        },
        '300000000000000',
        '1'
        ).then((res) => {
          this.nftTokensContract()
        })
      }
    },
    async set_review () {
      const CONTRACT_NAME = 'book.bookshop2.testnet'
      // connect to NEAR
      const near = await connect(CONFIG(new keyStores.BrowserLocalStorageKeyStore()))
      // create wallet connection
      const wallet = new WalletConnection(near)
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        changeMethods: ['set_review'],
        sender: wallet.account()
      })
      if (wallet.isSignedIn()) {
        contract.set_review({
          token_id: this.tokenForSale,
          review: this.review,
          critics: this.critics
        },
        '300000000000000',
        '1'
        ).then((res) => {
          this.review = null
          this.putReviewDialog = null
          this.tokenForSale = null
          this.nftTokensContract()
        })
      }
    }
  }
}
</script>
<style>
.ul1 {
  list-style: none;
}
.li1 {
  display: inline-block;
}
/* .imgOffers {
  filter: brightness(50%);
  -webkit-filter: brightness(50%);
  -moz-filter: brightness(50%);
  -o-filter: brightness(50%);
  -ms-filter: brightness(50%);
  height: 476.5px;
  width: 290px;
} */
.imgOffers {
    width: 265px;
    height: 350px;
  }
.hover2:hover {
  display: inline-block;
  background: #6868ac;
}
.hover:hover {
  transform: scale(1.1);
  box-shadow: 3px 3px 30px 15px gray;
}

/* .imgOffers:hover {
  opacity: 0.3;
} */
.textHover {
  display: none;
}
/* .hover2 .imgOffers:hover ~ .textHover {
  display: inline-block;
  color: #fff;
  position: absolute;
  z-index: 1;
  top: 0;
  padding-left: 10px;
} */
@media (min-width: 320px) and (max-width: 425px) {
  /*Aquí van todos los estilos CSS*/
}
@media (min-width: 375px) and (max-width: 425px) {
  /*Aquí van todos los estilos CSS*/
}
@media (max-width: 768px) {
  /*Aquí van todos los estilos CSS*/
}
@media (min-width: 960px) and (max-width: 1024px) {
  /*Aquí van todos los estilos CSS*/
}
@media (orientation: landscape) {
  /*Aquí van todos los estilos CSS*/
}
@media (orientation: Portrait) {
  /*Aquí van todos los estilos CSS*/
}
</style>
