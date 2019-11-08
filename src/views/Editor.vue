<template>
  <div>
    <div>
      <p>This is Editor</p>
    </div>
    <div id="app">
      <WebViewer
        :path="`${publicPath}lib`"
        url="http://localhost/assets/3772338819.pdf"
        :isViewer="this.isViewer"
      />
    </div>
  </div>
</template>

<script>
import WebViewer from "@/components/WebViewer.vue";
export default {
  name: "app",
  components: {
    WebViewer
  },
  data() {
    return {
      isViewer: false,
      publicPath: process.env.BASE_URL
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
