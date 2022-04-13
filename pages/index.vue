<template>
  <v-row>
    <v-col class="text-center">
      <v-sheet
        class="pt-8 sheet"
        elevation="8"
        rounded="2"
      >
        <v-row
          class="mt-7"
          align="center"
          justify="center"
        >
          <h1 class="black--text pt">
            Libros en tendencia
          </h1>
        </v-row>
        <v-slide-group
          v-model="model"
          class="ul1 container"
          show-arrows
        >
          <v-slide-item
            v-for="(item,i) in top_books"
            :key="i"
            class="ma-4"
          >
            <v-card
              align="center"
              width="265px"
              elevation="3"
            >
              <v-img
                class="white--text align-end imgOffers"
                :src="item.metadata.media"
              />
              <v-card-text
                class="text--primary text-left"
              >
                <div>
                  <div style="font-size:16px; color: #9575CD">
                    {{ item.metadata.title }}
                  </div>
                </div>
                <div>
                  {{ item.creator_id }}
                </div>
              </v-card-text>
            </v-card>
          </v-slide-item>
        </v-slide-group>

        <v-expand-transition>
          <v-sheet
            v-if="model != null"
            height="200"
            tile
          >
            <v-row
              class="fill-height"
              align="center"
              justify="center"
            >
              <h3 class="text-h6">
                Selected {{ model }}
              </h3>
            </v-row>
          </v-sheet>
        </v-expand-transition>
      </v-sheet>
        <v-col :cols="12">
          <v-card-text
            tile
            outlined
          >
            <v-card-title class="subheading ">
              Generos
            </v-card-title>
            <v-divider />
            <div class="row d-none d-sm-flex pt-1">
              <div
                v-for="(item,i) in categorias"
                :key="i"
                class="col-md-4 col-sm-4 col-xs-12"
              >
                <v-card outlined>
                  <v-img
                    :src="item.imagen"
                    class="white--text align-center"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="150px"
                  >
                    <h1 class="text-center font-size">
                      {{ item.nombre }}
                    </h1>
                    <div class="text-center mt-2">
                      <v-btn
                        class="white--text text-caption"
                        href="#"
                        text
                      >
                        Explorar
                        <v-icon class="white--text textcaption">
                          mdi-arrow-right
                        </v-icon>
                      </v-btn>
                    </div>
                  </v-img>
                </v-card>
              </div>
            </div>
          </v-card-text>
        </v-col>
      <v-container>
        <v-row no-gutters>
          <v-col :cols="12">
            <v-card-text
              class=""
              tile
              outlined
            >
              <v-card-title class="subheading">
                La crème de la crème
              </v-card-title>
              <v-divider />
              <highchart :options="chartOptions" />
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row no-gutters>
          <v-col :cols="12">
            <v-card-text
              class=""
              tile
              outlined
            >
              <v-card-title class="subheading">
                Ofertas del día
              </v-card-title>
              <v-divider />
              <div class="row mt-2">
                <div
                  v-for="(itemsO, i) in offers"
                  :key="i"
                  class="col-xs-6 col-sm-4 col-md-3 col text-center"
                >
                  <v-hover
                    v-slot="{ hover }"
                    open-delay="200"
                  >
                    <v-card
                      :elevation="hover ? 16 : 2"
                      align="center"
                      style="border: 0;"
                    >
                      <v-img
                        class="white--text align-end imgOffers"
                        :src="require('~/assets/img/' + itemsO.img)"
                      />

                      <v-card-text class="text--primary text-left">
                        <div>
                          <strong>
                            {{ itemsO.name }}
                          </strong>
                        </div>
                        <div>
                          <strong>
                            {{ itemsO.Author }}
                          </strong>
                        </div>
                        <div>
                          {{ itemsO.price }}
                        </div>
                        <div>
                          {{ itemsO.copy }}
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-hover>
                </div>
              </div>
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>
      <v-card
        color="#6868AC"
        class="pt-0 pb-0 mt-0 mb-0 m"
      >
        <v-container class="pt-0 pb-0 mt-0 mb-0">
          <v-row class="pt-0 pb-0 mt-0 mb-0">
            <v-col
              class="col-12 col-md-5 col-sm-5"
              align-self="center"
            >
              <h1 class="white--text">
                Pública tu Libro
              </h1>
              <p class="white--text">
                Registrate como escritor y publica tu libro
              </p>
              <v-btn
                color="#8C30F5"
                class="white--text"
                large
              >
                Inicia sesion con Near
              </v-btn>
            </v-col>
            <v-col
              class="col-12 col-md-6 col-sm-6 pt-0 pb-0 mt-0 mb-0"
              align-self="center"
            >
              <v-img
                class="d-none d-sm-flex imgPublica"
                :src="require('~/assets/img/home/publica.png')"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import * as nearAPI from 'near-api-js'
import { CONFIG } from '@/services/api'
const { connect, keyStores, WalletConnection, Contract } = nearAPI
export default {
  name: 'LandingPage',
  data () {
    return {
      categorias: [],
      top_books: [],
      top_authors: [],
      columns: 3,
      model: null,
      lacreme_authors: [],
      lacreme_sales: [],
      chartOptions: {
        chart: {
          renderTo: 'container',
          type: 'bar'
        },
        title: {
          text: ''
        },
        legend: {
          enabled: false
        },
        colors: ['#8C30F5'],
        xAxis: {
          categories: [],
          lineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: 'transparent',
          title: {
            text: null
          }
        },
        series: [{
          data: []
        }]
      },
      itemsCarousel: [
        {
          src1: 'home/libro2.jpg',
          src2: 'home/libro3.jpg',
          src3: 'home/libro4.jpg'
        },
        {
          src1: 'home/libro5.jpg',
          src2: 'home/libro6.jpg',
          src3: 'home/libro7.jpg'
        },
        {
          src1: 'home/libro8.jpg',
          src2: 'home/libro9.jpg',
          src3: 'home/libro1.png'
        },
        {
          src1: 'home/libro4.jpg',
          src2: 'home/libro5.jpg',
          src3: 'home/libro6.jpg'
        }
      ],
      writes: [
        {
          src1: 'avatars/imagenAvatar1.png',
          name1: 'Kim Slater',
          src2: 'avatars/imagenAvatar2.png',
          name2: 'Bran Stoker',
          src3: 'avatars/imagenAvatar3.png',
          name3: 'Lauren Grant',
          src4: 'avatars/imagenAvatar4.png',
          name4: 'Lucas LLoyd'
        },
        {
          src1: 'avatars/imagenAvatar5.png',
          name1: 'Alba Palacio',
          src2: 'avatars/imagenAvatar6.png',
          name2: 'Bill Hollen',
          src3: 'avatars/imagenAvatar7.png',
          name3: 'Victoria Aveyard',
          src4: 'avatars/imagenAvatar8.png',
          name4: 'Roberto Dubuc'
        }
      ],
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
      ]
    }
  },
  mounted () {
    this.fetch_data()
  },
  methods: {
    async fetch_data () {
      this.categorias = []
      const CONTRACT_NAME = 'book.bookshop2.testnet'
      // connect to NEAR
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore())
      )
      // create wallet connection
      const wallet = new WalletConnection(near)
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        viewMethods: ['get_category', 'get_top_series_sales', 'get_top_author_sales'],
        sender: wallet.account()
      })
      await contract.get_category().then((response) => {
        response.forEach((element) => {
          this.categorias.push({ id: element.id, nombre: element.name, imagen: element.img })
        })
      })
      await contract.get_top_series_sales().then((response) => {
        this.top_books = response
      })
      await contract.get_top_author_sales().then((response) => {
        this.top_authors = response
        response.forEach((element) => {
          this.lacreme_authors.push(element.author_id)
          this.lacreme_sales.push(element.sales)
        })
        this.chartOptions.xAxis.categories = this.lacreme_authors
        this.chartOptions.series[0].data = this.lacreme_sales
      })
    }
  }
}
</script>
<style>
  /* .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: 0.85;
    position: absolute;
    width: 100%;
  } */
  .sheet {
    background-image: url("~assets/img/home/fondoCarousel.png");
    background-size: 101% 100%;
  }
  .hover:hover {
    transform: scale(1);
    box-shadow: 3px 3px 30px 15px gray;
  }
  .hover2:hover {
    transform: scale(1.1);
    box-shadow: 3px 3px 10px 5px gray;
  }
  .v-btn .v-btn__content .v-icon {
    color: gray;
  }
  .imgCarousel {
    width: 250px;
    height: 400px;
  }
  .generoImg {
    height: 400px;
  }
  .imgOffers {
    width: 265px;
    height: 350px;
  }
  .imgPublica {
    width: 500px;
  }
  @media (min-width:320px) and (max-width:425px){
    /*Aquí van todos los estilos CSS*/
    .carousel {
      background-image: url("~assets/img/home/fondoCarousel.png");
      /*(width heigth)*/
      background-size: 101% 100%;
    }
    .generoImg {
      height: 200px;
    }
  };
  @media (min-width:375px) and (max-width:425px){
    /*Aquí van todos los estilos CSS*/
  }
  @media (max-width:768px) {
    /*Aquí van todos los estilos CSS*/
    .imgPublica {
      width: 300px;
    }
  }
  @media (min-width:960px) and (max-width:1024px){
    /*Aquí van todos los estilos CSS*/
    .carousel {
      background-image: url("~assets/img/home/fondoCarousel.png");
      /*(width heigth)*/
      background-size: 101% 100%;
    }
  };
  @media (orientation: landscape) {
    /*Aquí van todos los estilos CSS*/
  }
  @media (orientation: Portrait) {
    /*Aquí van todos los estilos CSS*/
  }
</style>
