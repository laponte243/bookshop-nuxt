<template>
  <div>
    <v-container class="pt-12 mt-12">
      <v-row class="ul1">
        <v-col
          v-for="(item, i) in dataNftTokens"
          :key="i"
          class="col-xs-12 col-sm-4 col-md-2 li1"
        >
          <NuxtLink :to="`/book/${item.token_series_id}`">
            <v-card class="hover2">
              <v-img
                :src="item.metadata.media"
                class="white--text imgOffers"
              />
              <div class="textHover pt-4">
                <h4>
                  {{ item.metadata.title }}
                </h4>
                <h5>
                  <!--{{ item.metadata.price }}-->
                  <strong>
                    10 NEAR
                  </strong>
                </h5>
                <h5>
                  {{ item.metadata.copies }} copias
                </h5>
                <br>
                <h5>
                  {{ item.creator_id }}
                </h5>
                <br>
                <p>
                  {{ item.metadata.description }}
                </p>
              </div>
            </v-card>
          </NuxtLink>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import * as nearAPI from 'near-api-js'
import { CONFIG } from '@/services/api'
const { connect, keyStores, WalletConnection, Contract } = nearAPI

export default {
  name: 'DashboardDashboard',

  data () {
    return {
      img: true,
      offers: [
        {
          img: 'home/libro8.jpg',
          nombre: 'Smart',
          Author: 'Kim Slater',
          price: '10 NEAR',
          copy: '10 Copias'
        },
        {
          img: 'home/libro9.jpg',
          nombre: 'Dracula',
          Author: 'Bram Stoker',
          price: '15 NEAR',
          copy: '10 Copias'
        },
        {
          img: 'home/libro1.png',
          nombre: 'El camino de la miseria',
          Author: 'Lauren Grant',
          price: '15 NEAR',
          copy: '10 Copias'
        },
        {
          img: 'home/libro2.jpg',
          nombre: 'The Arrivals',
          Author: 'Kim Slater',
          price: '10 NEAR',
          copy: '10 Copias'
        }
      ],
      dataNftTokens: []
    }
  },
  mounted () {
    this.nftTokensContract()
  },
  methods: {
    viewProduct () {
      this.$router.push({ name: 'product' })
    },
    async nftTokensContract () {
      const CONTRACT_NAME = 'bookshop.testnet'
      // connect to NEAR
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore())
      )
      // create wallet connection
      const wallet = new WalletConnection(near)
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        viewMethods: ['get_nft_series'],
        sender: wallet.account()
      })
      if (wallet.isSignedIn()) {
        await contract.get_nft_series({
          from_index: '0',
          limit: 10
        }).then((response) => {
          this.dataNftTokens = response
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
.imgOffers {
  filter: brightness(50%);
  -webkit-filter: brightness(50%);
  -moz-filter: brightness(50%);
  -o-filter: brightness(50%);
  -ms-filter: brightness(50%);
  height: 300px;
  width: 180px;
}
.hover2:hover {
  display: inline-block;
  background: #6868ac;
}

.imgOffers:hover {
  opacity: 0.3;
}
.textHover {
  display: none;
}
.hover2 .imgOffers:hover ~ .textHover {
  display: inline-block;
  color: #fff;
  position: absolute;
  z-index: 1;
  top: 0;
  padding-left: 10px;
}
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
