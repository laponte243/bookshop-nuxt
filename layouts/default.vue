<template>
  <v-app>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-title v-text="title" />
      <v-btn icon>
        <v-icon>
          mdi-shopping-outline
        </v-icon>
      </v-btn>
      <v-spacer />
      <v-btn
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
          <template v-slot:activator="{ on, attrs }">
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
            <v-list-itemlink>
              <v-list-item-title>
                <router-link
                  class="black--text"
                  to="pages/user/"
                >
                  Perfil
                </router-link>
              </v-list-item-title>
              <v-list-item-title>
                <router-link
                  class="black--text"
                  to="pages/user/"
                >
                  Mis Libros
                </router-link>
              </v-list-item-title>
              <v-list-item-title>
                <router-link
                  class="black--text"
                  to="pages/product/registration/"
                >
                  Publicar libro
                </router-link>
              </v-list-item-title>
              <v-list-item-title @click="signOut()">
                Cerrar Sesion
              </v-list-item-title>
            </v-list-itemlink>
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
        'bookshop.testnet', // contract requesting access
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
