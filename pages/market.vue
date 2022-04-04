<template>
  <div>
    <v-row
      style="background-color: #C0C0DC"
      class="pt-6 pl-10 pr-10"
    >
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-select
          :items="categorias"
          label="Categoria"
          item-value="id"
          item-text="name"
          dense
          solo
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-select
          :items="autores"
          label="Autor"
          dense
          solo
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
        <!-- <v-col
          v-for="(item, i) in dataNftTokens"
          :key="i"
          class="col-xs-12 col-sm-4 col-md-3 li1"
        >
          <v-hover v-slot="{ hover }">
            <v-card
              class="mx-auto"
              color="grey lighten-4"
            >
              <v-img
                :aspect-ratio="10/16"
                :src="item.metadata.extra"
              >
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="transition-fast-in-fast-out primary  v-card--reveal white--text"
                    style="height: 100%;"
                  >
                    <h4>
                      {{ item.metadata.title }}
                    </h4>
                    <h5>
                      <strong>
                        {{ item.metadata.price }}
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
                    <v-btn
                      :to="'/book/'+item.token_series_id"
                      class="mx-2 secondary"
                      icon
                    >
                      <v-icon>
                        mdi-magnify
                      </v-icon>
                    </v-btn>
                  </div>
                </v-expand-transition>
              </v-img>
            </v-card>
          </v-hover>
        </v-col> -->
        <div
          v-for="(item, i) in dataNftTokens"
          :key="i"
          class="col-xs-6 col-sm-4 col-md-3 col text-center"
        >
          <router-link :to="'/book/' + item.token_series_id" class="text-decoration-none">
            <v-card
              class="hover"
              align="center"
            >
              <v-img
                class="white--text align-end imgOffers"
                :src="item.metadata.extra"
              >
              </v-img>
              <v-card-text class="text--primary text-left">
                <div>
                  <div style="font-size:16px; color: #9575CD">
                    {{ item.metadata.title }}
                  </div>
                </div>
                <div>
                  {{ item.creator_id }}
                </div>
                <div>
                  <strong>{{ formatPrice(item.price) }} NEAR </strong>
                </div>
                <div>
                  {{ item.metadata.copies }} Copias
                </div>
              </v-card-text>

              <!-- <div class="text-right">
                <v-btn
                  href="/shop"
                  class="ma-2"
                  outlined
                  color="info"
                >
                  Explorar
                </v-btn>
                <v-btn
                  :to="'/book/' + item.token_series_id"
                  color="deep-purple lighten-2"
                  text
                  @click="reserve"
                >
                  Explorar
                </v-btn>
              </div> -->
            </v-card>
          </router-link>
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
  name: 'MarketBook',

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
      dataNftTokens: [],
      categorias: [],
      autores: []
    }
  },
  mounted () {
    this.nftTokensContract()
    this.getCategorias()
  },
  methods: {
    viewProduct () {
      this.$router.push({ name: 'product' })
    },
    formatPrice (price) {
      return utils.format.formatNearAmount(price.toLocaleString('fullwide', { useGrouping: false }))
    },
    async nftTokensContract () {
      const CONTRACT_NAME = 'book3.bookshop.testnet'
      // connect to NEAR
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore())
      )
      // create wallet connection
      const wallet = new WalletConnection(near)
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        viewMethods: ['get_market'],
        sender: wallet.account()
      })
      await contract.get_market().then((response) => {
        console.log(response)
        this.dataNftTokens = response
      })
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
      await contract.get_category().then((response) => {
        this.categorias = response
      })
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
