<template>
  <div>
    <v-container class="pt-12 mt-12">
      <v-row
        v-if="dataNftToken"
      >
        <v-col class="col-md-4 col-sm-4 col-xs-12 pl-8">
          <v-img
            :src="dataNftToken.metadata.extra"
            width="350"
            height="500"
            style="box-shadow: 30px 20px 5px #6868ac"
          />
        </v-col>
        <v-col class="col-md-8 col-sm-8 col-xs-12">
          <div class="pl-6">
            <p class="text-h4 mb-0" style="color: #7474b3">
              {{ dataNftToken.metadata.title }}
            </p>
            <v-card-actions class="pa-0">
              <p class="text-h5 font-weight-light pt-3">
                {{ formatPrice(dataNftToken.price) }} Near
              </p>
              <v-spacer />
              <v-rating
                v-model="rating"
                background-color="warning lighten-3"
                color="warning"
                dense
              />
              <span class="text-body-2font-weight-thin"> 25 REVIEWS</span>
            </v-card-actions>
            <p class="text-h4 font-weight-thin">
              {{ dataNftToken.metadata.description }}
            </p>
            <p class="text-h6">
              Copias
            </p>
            <p class="text-subtitle-1 font-weight-thin">
              {{ dataNftToken.metadata.copies }} Disponibles
            </p>
            <v-btn color="#7474B3" class="white--text" dense large @click="buy_nft()">
              Comprar
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row class="row">
        <div class="col-sm-12 col-xs-12 col-md-12">
          <v-tabs>
            <v-tab>About Author</v-tab>
            <v-tab>Reviews</v-tab>
            <v-tab-item>
              <h5
                v-if="author.pen_name"
              >
                {{author.pen_name}}
              </h5>
              <h5
                v-else
              >
                {{author.pen_name}}
              </h5>
              <p class="text-subtitle-1 font-weight-thin">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ultricies mi eget mauris pharetra et. Vel pretium lectus quam id
                leo in vitae turpis massa. Orci dapibus ultrices in iaculis
                nunc. At auctor urna nunc id cursus metus. Integer feugiat
                scelerisque varius morbi enim nunc. Aliquam sem et tortor
                consequat id porta nibh venenatis cras. Pellentesque pulvinar
                pellentesque habitant morbi tristique senectus et netus.
                Malesuada nunc vel risus commodo viverra maecenas. Neque
                volutpat ac tincidunt vitae semper quis.
              </p>
            </v-tab-item>
            <v-tab-item>
              <p class="pt-10 text-subtitle-1 font-weight-thin">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ultricies mi eget mauris pharetra et. Vel pretium lectus quam id
                leo in vitae turpis massa. Orci dapibus ultrices in iaculis
                nunc. At auctor urna nunc id cursus metus. Integer feugiat
                scelerisque varius morbi enim nunc. Aliquam sem et tortor
                consequat id porta nibh venenatis cras. Pellentesque pulvinar
                pellentesque habitant morbi tristique senectus et netus.
                Malesuada nunc vel risus commodo viverra maecenas. Neque
                volutpat ac tincidunt vitae semper quis.
              </p>
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
      author: null
    }
  },
  mounted () {
    this.nftTokensContract()
  },
  methods: {
    formatPrice (price) {
      return utils.format.formatNearAmount(price.toLocaleString('fullwide', { useGrouping: false }))
    },
    async nftTokensContract () {
      const CONTRACT_NAME = 'book3.bookshop.testnet'
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore())
      )
      const wallet = new WalletConnection(near)
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        viewMethods: ['get_market_single'],
        sender: wallet.account()
      })
      await contract.get_market_single({
        token_series_id: this.serieId
      }).then((response) => {
        console.log(response)
        this.dataNftToken = response
        this.getAuthor(response.creator_id)
      })
    },
    async getAuthor (author) {
      const CONTRACT_NAME = 'book3.bookshop.testnet'
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
        console.log(response)
        this.author = response
      })
    },
    async buy_nft () {
      const CONTRACT_NAME = 'book3.bookshop.testnet'
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
      this.dataNftToken.price.toLocaleString('fullwide', { useGrouping: false })).then((response) => {
        // console.log(response)
      })
    }
  }
}
</script>
