<template>
  <div>
    <p>Pdf urls</p>

    <div class="container">
      <div v-if="(home.urls).length">
        <div v-for="(urlData, index) in home.urls" :key="index">
          <router-link :to="{name: 'viewer', params: { id: index }}">
            <div class="url-card">Reference id: {{ index }} @ Page: {{ urlData.pageIndex }}</div>
          </router-link>
        </div>
      </div>
      <div v-else>No urls</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState(["home"])
};
</script> 

<style scoped>
.url-card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border: 1px solid green;
  padding: 4px;
}

/* On mouse-over, add a deeper shadow */
.url-card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

/* Add some padding inside the card container */
.container {
  padding: 2px 16px;
  margin-left: 40%;
  margin-right: 40%;
}
</style>