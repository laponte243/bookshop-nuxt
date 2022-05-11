<template>
  <div>
    <v-container class="mt-12">
      <v-row
        v-if="dataNftToken"
      >
        <v-col class="col-md-4 col-sm-4 col-xs-12 pl-8">
          <v-img
            :src="dataNftToken.metadata.media"
            width="350"
            height="500"
            style="box-shadow: 30px 20px 5px #6868ac"
          />
        </v-col>
        <v-col class="col-md-8 col-sm-8 col-xs-12">
          <div class="pl-6">
            <p
              v-if="isSerie"
              class="text-h4 mb-0"
              style="color: #7474b3"
            >
              {{ dataNftToken.metadata.title }}
            </p>
            <p
              v-if="!isSerie"
              class="text-h4 mb-0"
              style="color: #7474b3"
            >
              {{ dataNftToken.metadata.title }} #{{ serieId }}
            </p>
            <v-card-actions class="pa-0">
              <p class="text-h5 font-weight-light pt-3">
                {{ formatPrice(dataNftToken.price) }} Near
              </p>
              <v-spacer />
              <v-rating
                v-model="promedio"
                background-color="warning lighten-3"
                color="warning"
                half-increments
                dense
                readonly
              />
              <span class="text-body-2font-weight-thin"> {{ promedio }} REVIEWS</span>
            </v-card-actions>
            <p class="font-weight-thin">
              {{ dataNftToken.metadata.description }}
            </p>
            <p
              v-if="isSerie"
              class="text-h6"
            >
              Copias
            </p>
            <p
              v-if="isSerie"
              class="text-subtitle-1 font-weight-thin"
            >
              {{ dataNftToken.metadata.copies - dataNftToken.copy }} Disponible(s)
            </p>
            <v-dialog
              v-model="beforeBuyDialog"
              width="500"
            >
              <template #activator="{ on, attrs }">
                <v-btn
                  color="#cf66a5"
                  dense
                  class="white--text"
                  large
                  v-bind="attrs"
                  v-on="on"
                >
                  Comprar
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  Confirmar compra
                </v-card-title>
                <v-card-text>
                  <p>Total: {{ formatPrice(dataNftToken.price) }} Ⓝ</p>
                  <p>Storage fee: 0.015 Ⓝ</p>
                </v-card-text>
                <v-divider />
                <v-card-actions>
                  <v-btn
                    color="secondary"
                    text
                    @click="beforeBuyDialog = false"
                  >
                    Cancelar
                  </v-btn>
                  <v-spacer />
                  <v-btn
                    color="primary"
                    text
                    @click="beforeBuyDialog = false, buy_nft()"
                  >
                    Comprar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-col>
      </v-row>
      <v-row class="row mt-10">
        <div class="col-sm-12 col-xs-12 col-md-12">
          <v-tabs
            v-if="dataNftToken"
          >
            <v-tab>Sobre el autor</v-tab>
            <v-tab-item>
              <v-list three-line>
                <v-list-item>
                  <v-list-item-content>
                    <p>
                      {{ author.name }} {{ author.last_name }}
                    </p>
                    <p>
                      {{ author.bio }}
                    </p>
                  </v-list-item-content>
                </v-list-item>
                <v-divider />
              </v-list>
            </v-tab-item>
            <v-tab>Reviews</v-tab>
            <v-tab-item>
              <v-list three-line>
                <v-list-item
                  v-for="(item, index) in dataNftToken.reviews"
                  :key="index"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item.user_id }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ item.review }}
                    </v-list-item-subtitle>
                    <v-rating
                      v-model="item.critics"
                      background-color="warning lighten-3"
                      color="warning"
                      dense
                      readonly
                    />
                  </v-list-item-content>
                </v-list-item>
                <v-divider />
              </v-list>
            </v-tab-item>
          </v-tabs>
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
  data () {
    return {
      serieId: this.$route.params.id,
      dataNftToken: null,
      author: [],
      beforeBuyDialog: false,
      isSerie: true,
      promedio: null
    }
  },
  mounted () {
    this.nftTokensContract()
    this.token_or_serie()
    if (this.$route.query.transactionHashes) {
      this.$toast.success('Libro comprado correctamente')
    }
  },
  methods: {
    formatPrice (price) {
      return Number(utils.format.formatNearAmount(price.toLocaleString('fullwide', { useGrouping: false })))
    },
    token_or_serie () {
      if (this.serieId.search(':') !== -1) {
        this.isSerie = false
      }
    },
    TokenPrice (price) {
      return utils.format.formatNearAmount(price.toLocaleString('fullwide', { useGrouping: false }))
    },
    async nftTokensContract () {
      const CONTRACT_NAME = 'book.bookshop2.testnet'
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore())
      )
      const wallet = new WalletConnection(near)
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        viewMethods: ['get_market'],
        sender: wallet.account()
      })
      await contract.get_market({
        token: this.serieId
      }).then((response) => {
        if (response[0]) {
          this.dataNftToken = response[0]
          this.getAuthor(response[0].creator_id)
          this.calcularPromedio()
        } else {
          this.$router.push('./../market')
        }
      })
    },
    calcularPromedio () {
      const prom = this.dataNftToken.reviews.reduce((a, b) => a + b.critics, 0) / this.dataNftToken.reviews.length
      this.promedio = prom.toFixed(2)
    },
    async getAuthor (author) {
      const CONTRACT_NAME = 'book.bookshop2.testnet'
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore())
      )
      const wallet = new WalletConnection(near)
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        viewMethods: ['get_profile'],
        sender: wallet.account()
      })
      await contract.get_profile({
        user_id: author
      }).then((response) => {
        this.author = response
        // console.log(this.author)
      })
    },
    async buy_nft () {
      const CONTRACT_NAME = 'book.bookshop2.testnet'
      // connect to NEAR
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore())
      )
      // create wallet connection
      const wallet = new WalletConnection(near)
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        changeMethods: ['nft_buy'],
        sender: wallet.account()
      })
      await contract.nft_buy({
        token_series_id: this.serieId,
        receiver_id: wallet.getAccountId()
      }, '300000000000000', // attached GAS (optional)
      utils.format.parseNearAmount((this.formatPrice(this.dataNftToken.price) + 0.015).toString()))
    }
  }
}
</script>
