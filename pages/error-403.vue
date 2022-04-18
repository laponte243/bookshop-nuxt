<template>
  <div>
    <!-- Hero End -->
    <section class="sheet">
      <v-container>
        <v-row>
          <v-col class="col-12 text-center mt-10">
            <div class="text-h1" style="color: #6868ac">
              403
            </div>
            <div class="text-h3">
              Forbidden
            </div>
            <div class="text-h6">
              No tienes permiso para acceder
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
    <!--end section-->
  </div>
</template>

<script>
/**
 * Shop-product-detail component
 */
export default {
  data () {
    return {}
  },
  methods: {}
}
</script>

<style>
  .sheet {
    background-image: url("~assets/img/home/fondoCarousel.png");
    background-size: 101% 100%;
    height: 85vh;
  }
</style>
