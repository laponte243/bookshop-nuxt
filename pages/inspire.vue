<template>
  <v-row>
    <v-col class="text-center">
      <img
        src="/v.png"
        alt="Vuetify.js"
        class="mb-5"
      >
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
            <v-file-input
              v-model="file"
              show-size
              label="File input"
            />
            <v-btn
              color="#6868ac"
              large
              class="white--text"
              @click="test"
            >
              test
            </v-btn>
          </small>
        </footer>
      </blockquote>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'InspirePage',

  data: () => ({
    file: null
  }),
  methods: {
    async test ({ $axios }) {
      const formData = new FormData()
      formData.append('libro', this.file)
      const { data } = await this.$axios.$post('/api/uploader/test', formData)
      return data
    }
  }

}
</script>
