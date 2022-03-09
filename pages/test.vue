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
      ]
    }
  }
}
</script>
<style>
  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .5;
    position: absolute;
    width: 100%;
  }
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
