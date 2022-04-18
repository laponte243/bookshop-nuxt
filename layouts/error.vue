<template>
  <v-app dark>
    <section class="sheet">
      <v-container>
        <v-row>
          <v-col class="col-12 text-center mt-10">
            <div class="text-h1" style="color: #6868ac">
              {{ code }}
            </div>
            <div class="text-h3">
              {{ description }}
            </div>
            <div class="text-h6">
              {{ text }}
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-right mt-10">
            <v-btn
              text
              class="black--text"
              onclick="location.href='/'"
            >
              <v-icon class="black--text">mdi-home</v-icon>
              go to home
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <!--end row-->
    </section>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      code: '',
      description: '',
      text: '',
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    if (this.error.statusCode === 403) {
      this.code = '403'
      this.description = 'Forbidden'
      this.text = 'No tienes permiso para acceder'
    } else if (this.error.statusCode === 404) {
      this.code = '404'
      this.description = 'Not Found'
      this.text = 'No se encuentra esta url'
    } else if (this.error.statusCode === 500) {
      this.code = '500'
      this.description = 'Internal server error'
      this.text = 'Ha ocurrido un error'
    }
    const title = this.code
    // this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
  .sheet {
    background-image: url("~assets/img/home/fondoCarousel.png");
    background-size: 101% 100%;
    height: 85vh;
  }
</style>
