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
                :src="item.metadata.media"
              />
              <v-card-text class="text--primary text-left">
                <div>
                  <div style="font-size:16px; color: #9575CD">
                    {{ item.metadata.title }} #{{ item.token_series_id }}
                  </div>
                </div>
                <div>
                  {{ item.creator_id }}
                </div>
                <div>
                  <strong>{{ formatPrice(item.price) }}Ⓝ </strong>
                </div>
                <div>
                  {{ item.metadata.copies }} Copias
                </div>
              </v-card-text>
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
      dataNftTokens: [],
      categorias: [],
      autores: [],
      autor: null,
      categoria: null
    }
  },
  mounted () {
    this.nftTokensContract()
    this.getCategorias()
    if (this.$route.params.category) {
      this.categoria = this.$route.params.category
    }
  },
  methods: {
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
        viewMethods: ['get_market'],
        sender: wallet.account()
      })
      const filtro = {}
      if (this.categoria) {
        filtro.category = this.categoria
      }
      if (this.autor) {
        filtro.creator_id = this.autor
      }
      await contract.get_market(filtro).then((response) => {
        this.dataNftTokens = response
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
