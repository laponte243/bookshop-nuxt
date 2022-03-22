<template>
  <v-row>
    <v-col class="text-center">
      <v-carousel
        class="carousel"
        hide-delimiter-background
        delimiter-icon="mdi-minus"
        height="90vh"
      >
        <v-carousel-item
          v-for="(itemC,i) in itemsCarousel"
          :key="i"
        >
          <v-row
            class="pt-12 mt-12"
            align="center"
            justify="center"
          >
            <h1 class="black--text pt">
              Libros en tendencia
            </h1>
          </v-row>
          <v-row
            align="center"
            justify="center"
          >
            <v-col />
            <v-col
              align-self="center"
            >
              <div class="text-h3">
                <a>
                  <v-img
                    class="hover imgCarousel"
                    :src="require(`~/assets/img/${itemC.src1}`)"
                  />
                </a>
              </div>
            </v-col>
            <v-col
              class="d-none d-sm-flex"
              align-self="center"
            >
              <div class="text-h3">
                <a href="/product">
                  <v-img
                    class="hover imgCarousel"
                    :src="require(`~/assets/img/${itemC.src2}`)"
                  />
                </a>
              </div>
            </v-col>
            <v-col
              class="d-none d-md-flex"
              align-self="center"
            >
              <div class="text-h3">
                <a href="/product">
                  <v-img
                    class="hover imgCarousel"
                    :src="require(`~/assets/img/${itemC.src3}`)"
                  />
                </a>
              </div>
            </v-col>
            <v-col />
          </v-row>
        </v-carousel-item>
      </v-carousel>
      <v-container>
        <v-col :cols="12">
          <v-card-text
            tile
            outlined
          >
            <v-card-title class="subheading ">
              Generos
            </v-card-title>
            <v-divider />
            <div class="row">
              <div
                class="col-md-6 col-sm-6 col-xs-12"
              >
                <v-card>
                  <v-img
                    :src="require('~/assets/img/home/aventura.jpg')"
                    class="white--text align-center generoImg"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  >
                    <h1 class="text-center font-size">
                      Aventura
                    </h1>
                    <div class="text-center">
                      <v-btn
                        href="#"
                        class="white--text "
                        outlined
                      >
                        Explorar
                      </v-btn>
                    </div>
                  </v-img>
                </v-card>
              </div>
              <div
                class="col-md-6 col-sm-6 col-xs-12"
              >
                <v-card>
                  <v-img
                    :src="require('~/assets/img/home/ficcion.jpg')"
                    class="white--text align-center generoImg"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  >
                    <h1 class="text-center font-size">
                      Ciencia Ficcion
                    </h1>
                    <div class="text-center">
                      <v-btn
                        href="#"
                        class="white--text"
                        outlined
                      >
                        Explorar
                      </v-btn>
                    </div>
                  </v-img>
                </v-card>
              </div>
            </div>
            <div class="row d-none d-sm-flex">
              <div class="col-md-4 col-sm-4 col-xs-12">
                <v-card outlined>
                  <v-img
                    :src="require('~/assets/img/home/romance.jpg')"
                    class="white--text align-center"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="300px"
                  >
                    <h1 class="text-center font-size">
                      Romance
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
              <div
                class="col-md-4 col-sm-4 col-xs-12"
              >
                <v-card outlined>
                  <v-img
                    :src="require('~/assets/img/home/terror.jpg')"
                    class="white--text align-center"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="300px"
                  >
                    <h1 class="text-center font-size">
                      Terror
                    </h1>
                    <div class="text-center mt-2">
                      <v-btn
                        class="white--text text-caption"
                        href="#"
                        text
                      >
                        Explorar
                        <v-icon class="white--text text-caption">
                          mdi-arrow-right
                        </v-icon>
                      </v-btn>
                    </div>
                  </v-img>
                </v-card>
              </div>
              <div
                class="col-md-4 col-sm-4 col-xs-12"
              >
                <v-card outlined>
                  <v-img
                    :src="require('~/assets/img/home/libro7.jpg')"
                    class="white--text align-center"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="300px"
                  >
                    <h1 class="text-center font-size">
                      Fantasia
                    </h1>
                    <div class="text-center mt-2">
                      <v-btn
                        class="white--text text-caption"
                        text
                      >
                        Explorar
                        <v-icon class="white--text text-caption">
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
        <div class="text-center mt-2">
          <v-btn
            class="black--text text-caption"
            text
          >
            Explorar
            <v-icon class="black--text text-caption">
              mdi-arrow-right
            </v-icon>
          </v-btn>
        </div>
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
                Escritores Destacados
              </v-card-title>
              <v-divider />
              <v-carousel
                hide-delimiter-background
                hide-delimiters
                show-arrows-on-hover
                height="230"
              >
                <v-carousel-item
                  v-for="(itemsW, i) in writes"
                  :key="i"
                >
                  <v-row align-content="center">
                    <v-col
                      class="col-12 col-md-3 col-sm-6 col-xs-6 text-center"
                      align-self="center"
                    >
                      <v-card class="hover2">
                        <v-img
                          :src="require('~/assets/img/' + itemsW.src1)"
                          class="white--text align-end"
                          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                          height="200px"
                        >
                          <v-card-title>
                            {{ itemsW.name1 }}
                          </v-card-title>
                        </v-img>
                      </v-card>
                    </v-col>
                    <v-col
                      class="col-12 col-md-3 col-sm-6 col-xs-6 text-center"
                      align-self="center"
                    >
                      <v-card class="hover2">
                        <v-img
                          :src="require('~/assets/img/' + itemsW.src2)"
                          class="white--text align-end"
                          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                          height="200px"
                        >
                          <v-card-title>
                            {{ itemsW.name2 }}
                          </v-card-title>
                        </v-img>
                      </v-card>
                    </v-col>
                    <v-col
                      class="col-12 col-md-3 col-sm-6 col-xs-6 text-center"
                      align-self="center"
                    >
                      <v-card class="hover2">
                        <v-img
                          :src="require('~/assets/img/' + itemsW.src3)"
                          class="white--text align-end"
                          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                          height="200px"
                        >
                          <v-card-title>
                            {{ itemsW.name3 }}
                          </v-card-title>
                        </v-img>
                      </v-card>
                    </v-col>
                    <v-col
                      class="col-12 col-md-3 col-sm-6 col-xs-6 text-center"
                      align-self="center"
                    >
                      <v-card class="hover2">
                        <v-img
                          :src="require('~/assets/img/' + itemsW.src4)"
                          class="white--text align-end"
                          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                          height="200px"
                        >
                          <v-card-title>
                            {{ itemsW.name4 }}
                          </v-card-title>
                        </v-img>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-carousel-item>
              </v-carousel>
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
              <div class="row">
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
                    >
                      <v-img
                        class="white--text align-end imgOffers"
                        :src="require('~/assets/img/' + itemsO.img)"
                      >
                        <v-card-title>
                          {{ itemsO.name }}
                        </v-card-title>
                      </v-img>

                      <v-card-text class="text--primary text-left">
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

                      <div class="text-right">
                        <v-btn
                          href="/shop"
                          class="ma-2"
                          outlined
                          color="info"
                        >
                          Explorar
                        </v-btn>
                      </div>
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
export default {
  name: 'LandingPage',
  data () {
    return {
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
  }
}
</script>
<style>
  .carousel {
    background-image: url("~assets/img/home/fondoCarousel.png");
    background-size: 101% 100%;
  }
  .hover:hover {
    transform: scale(1.1);
    box-shadow: 3px 3px 30px 15px gray;
  }
  .hover2:hover {
    transform: scale(1);
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
