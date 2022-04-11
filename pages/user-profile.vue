<template>
  <v-container>
    <v-card
      elevation="5"
    >
      <v-card-text>
        <div>Queremos conocerte mejor</div>
        <p class="text-h4 text--primary">
          Perfil
        </p>
        <div class="text--primary">
          <v-row>
            <v-col
              cols="12"
              sm="12"
              md="4"
              lg="4"
            >
              <v-text-field
                v-model="profile.name"
                :rules="[v => (v || '' ).length <= 30 || '30 caracteres o menos']"
                label="Name"
                append-icon="mdi-account"
                outlined
              />
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="4"
              lg="4"
            >
              <v-text-field
                v-model="profile.last_name"
                :rules="[v => (v || '' ).length <= 30 || '30 caracteres o menos']"
                label="Last Name"
                append-icon="mdi-account"
                outlined
              />
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="4"
              lg="4"
            >
              <v-text-field
                v-model="profile.pen_name"
                :rules="[v => (v || '' ).length <= 40 || '40 caracteres o menos']"
                label="Pen Name"
                append-icon="mdi-pencil"
                outlined
              />
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="4"
              lg="4"
            >
              <v-text-field
                v-model="profile.website"
                :rules="rules_url"
                label="Website"
                append-icon="mdi-web"
                outlined
              />
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="4"
              lg="4"
            >
              <v-text-field
                v-model="profile.twitter"
                :rules="[v => (v || '' ).length <= 30 || '30 caracteres o menos']"
                outlined
                label="twitter"
                append-icon="mdi-twitter"
              />
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="6"
              lg="6"
            >
              <v-textarea
                v-model="profile.bio"
                label="Bio"
                clearable
                counter
                outlined
                :rules="[v => (v || '' ).length <= 255 || '255 caracteres o menos']"
                auto-grow
                append-icon="mdi-leaf"
              />
            </v-col>
          </v-row>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          v-if="nuevo"
          block
          color="secondary"
          @click="setDataEdit()"
        >
          guardar
        </v-btn>
        <v-btn
          v-else
          block
          color="secondary"
          @click="setData()"
        >
          guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import * as nearAPI from 'near-api-js'
import { CONFIG } from '@/services/api'
const { connect, keyStores, WalletConnection, Contract } = nearAPI

export default {
  name: 'UserProfile',
  data () {
    return {
      e6: 1,
      nuevo: false,
      rules_url: [
        value => this.isURL(value) || 'URL is not valid'
      ],
      profile: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    isURL (str) {
      let url
      try {
        url = new URL(str)
      } catch (_) {
        return false
      }
      return url.protocol === 'http:' || url.protocol === 'https:'
    },
    async setData () {
      const CONTRACT_NAME = 'book.bookshop2.testnet'
      // connect to NEAR
      const near = await connect(CONFIG(new keyStores.BrowserLocalStorageKeyStore()))
      // create wallet connection
      const wallet = new WalletConnection(near)
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        changeMethods: ['set_profile'],
        sender: wallet.account()
      })
      if (wallet.isSignedIn()) {
        await contract.set_profile({
          name: this.profile.name,
          last_name: this.profile.last_name,
          pen_name: this.profile.pen_name,
          email: this.profile.email,
          bio: this.profile.bio,
          website: this.profile.website,
          twitter: this.profile.twitter
        })
      }
    },
    async setDataEdit () {
      const CONTRACT_NAME = 'book.bookshop2.testnet'
      // connect to NEAR
      const near = await connect(CONFIG(new keyStores.BrowserLocalStorageKeyStore()))
      // create wallet connection
      const wallet = new WalletConnection(near)
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        changeMethods: ['put_profile'],
        sender: wallet.account()
      })
      if (wallet.isSignedIn()) {
        await contract.put_profile({
          name: this.profile.name,
          last_name: this.profile.last_name,
          pen_name: this.profile.pen_name,
          email: this.profile.email,
          bio: this.profile.bio,
          website: this.profile.website
        })
      }
    },
    async getData () {
      const CONTRACT_NAME = 'book.bookshop2.testnet'
      // connect to NEAR
      const near = await connect(CONFIG(new keyStores.BrowserLocalStorageKeyStore()))
      // create wallet connection
      const wallet = new WalletConnection(near)
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        viewMethods: ['get_profile'],
        sender: wallet.account()
      })
      if (wallet.isSignedIn()) {
        // console.log(wallet.account())
        await contract.get_profile({
          user_id: wallet.getAccountId()
        }).then((res) => {
          this.profile = res
          this.nuevo = true
        })
        // console.log(response)
      }
    }
  }
}
</script>
