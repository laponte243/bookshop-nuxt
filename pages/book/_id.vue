<template>
  <div>
    <v-container class="pt-12 mt-12">
      <v-row
        v-if="dataNftToken"
      >
        <v-col class="col-md-5 col-sm-5 col-xs-12 text-center">
          <v-img
            :src="dataNftToken.metadata.media"
            width="350"
            height="500"
            style="box-shadow: 30px 20px 5px #6868ac"
          />
        </v-col>
        <v-col class="col-md-7 col-sm-7 col-xs-12">
          <div class="pl-6">
            <p class="text-h4 mb-0" style="color: #7474b3">
              {{ dataNftToken.metadata.title }}
            </p>
            <v-card-actions class="pa-0">
              <p class="text-h5 font-weight-light pt-3">
                10 NEAR
                <del class="text-subtitle-1 font-weight-thin"> 15 NEAR </del>
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
            <v-btn color="#7474B3" class="white--text" dense large>
              Comprar
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row class="row">
        <div class="col-sm-12 col-xs-12 col-md-12">
          <v-tabs>
            <v-tab>Description</v-tab>
            <v-tab>Materials</v-tab>
            <v-tab>REVIEWS</v-tab>
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
const { connect, keyStores, WalletConnection, Contract } = nearAPI
export default {
  data () {
    return {
      items: ['Administrador', 'Regular', 'Moderador'],
      serieId: this.$route.params.id,
      dataNftToken: null
    }
  },
  mounted () {
    this.nftTokensContract()
  },
  methods: {
    async nftTokensContract () {
      const CONTRACT_NAME = 'bookshop.testnet'
      // connect to NEAR
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore())
      )
      // create wallet connection
      const wallet = new WalletConnection(near)
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        viewMethods: ['get_nft_series_single'],
        sender: wallet.account()
      })
      if (wallet.isSignedIn()) {
        await contract
          .get_nft_series_single({
            token_series_id: this.serieId
          })
          .then((response) => {
            console.log(response)
            this.dataNftToken = response
          })
      }
    }
  }
}
</script>
