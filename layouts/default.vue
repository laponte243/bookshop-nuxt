<template>
  <v-app>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <NuxtLink to="/">
        <v-img
          class="mx-2"
          :src="require('~/assets/img/logo.png')"
          max-width="120"
          contain
        />
      </NuxtLink>
      <v-btn
        to="/market"
        class="mx-2"
        icon
      >
        <v-icon>
          mdi-shopping-outline
        </v-icon>
      </v-btn>
      <v-btn
        to="/library"
        class="mx-2"
        icon
      >
        <v-icon>
          mdi-book-multiple
        </v-icon>
      </v-btn>
      <v-btn
        to="/book/new"
        class="mx-2"
        icon
      >
        <v-icon>
          mdi-book-plus
        </v-icon>
      </v-btn>
      <v-spacer />
      <v-btn
        v-show="!sesion"
        color="#6868ac"
        large
        class="white--text"
        @click="signIn()"
      >
        Inicia Sesion Con Near
      </v-btn>
      <div
        v-show="sesion"
        class="my-2"
      >
        <v-menu transition="slide-x-transition">
          <template #activator="{ on, attrs }">
            <v-btn
              color="#6868ac"
              class="ma-2 white--text"
              v-bind="attrs"
              v-on="on"
            >
              {{ accountId }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              to="/user-profile"
            >
              <v-list-item-title>Perfil</v-list-item-title>
            </v-list-item>
            <v-list-item
              @click="signOut()"
            >
              <v-list-item-title>Cerrar Sesión</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import * as nearAPI from 'near-api-js'
import { CONFIG } from '~/services/api'
const { connect, keyStores, WalletConnection } = nearAPI
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      sesion: null,
      accountId: null,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-check',
          title: 'test',
          to: '/test'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      title: "Near's Bookshop"
    }
  },
  mounted () {
    this.isSigned()
  },
  methods: {
    async signIn () {
      // connect to NEAR
      const near = await connect(CONFIG(new keyStores.BrowserLocalStorageKeyStore()))
      // create wallet connection
      const wallet = new WalletConnection(near)
      wallet.requestSignIn(
        'book.bookshop.testnet', // contract requesting access
        'Near-BookShop', // optional
        'http://localhost:3000/', // optional
        'http://localhost:3000/error'
      )
    },
    async isSigned () {
      // connect to NEAR
      const near = await connect(CONFIG(new keyStores.BrowserLocalStorageKeyStore()))
      // create wallet connection
      const wallet = new WalletConnection(near)
      if (wallet.isSignedIn()) {
        this.sesion = true
        // returns account Id as string
        const walletAccountId = wallet.getAccountId()
        this.accountId = walletAccountId
      }
    },
    async signOut () {
      // connect to NEAR
      const near = await connect(CONFIG(new keyStores.BrowserLocalStorageKeyStore()))
      // create wallet connection
      const wallet = new WalletConnection(near)
      wallet.signOut()
      this.sesion = false
      this.$router.go()
    }
  }
}
</script>
