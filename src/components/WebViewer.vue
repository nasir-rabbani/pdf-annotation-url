<template>
  <div>
    <div v-if="!isViewer">
      <button @click="createUrl">Create URL</button>
    </div>
    <div class="view" ref="viewer"></div>
  </div>
</template> 

<script>
/* eslint-disable */
import store from "@/store/store";
export default {
  name: "WebViewer",
  props: {
    path: String,
    url: String,
    isViewer: false
  },
  data() {
    return {
      currentPage: 0,
      firstWindowCoords: {},
      secondWindowCoords: {},
      URLData: {
        file: "",
        pageIndex: 0,
        x: 0,
        y: 0,
        width: 0,
        height: 0
      }
    };
  },
  methods: {
    createUrl() {
      console.log("create url called : ");

      this.URLData.file = this.url;
      // this.URLData.pageIndex = this.currentPage;
      store.dispatch("home/createUrl", this.URLData).then(
        response => {
          console.log("Success!!");
        },
        error => {
          console.error("Error!!!");
        }
      );
    }
  },
  mounted: function() {
    WebViewer(
      {
        path: this.path,
        initialDoc: this.url, // replace with your own PDF file
        fullAPI: true
      },
      this.$refs.viewer
    ).then(instance => {
      var docViewer = instance.docViewer;
      var Annotations = instance.Annotations;

      let self = this;

      docViewer.on("documentLoaded", function() {
        if (self.isViewer) {
          // opening the web-viewer as viewer
          // copying the annoted data
          self.URLData = self.$route.query.URLData;

          // jumping to the marked page
          // docViewer.setCurrentPage(self.URLData.pageIndex);
          // docViewer.zoomTo(2, self.URLData.x * 2, self.URLData.y * 2);
          var zoomLevel = 1;
          var xOffset = self.URLData.x * zoomLevel;
          var yOffset =
            (self.URLData.y + 795 * (self.URLData.pageIndex - 1)) * zoomLevel;
          docViewer.zoomTo(zoomLevel, xOffset, yOffset);

          // instance of annotation manager
          var annotManager = docViewer.getAnnotationManager();

          var rectangle = new Annotations.RectangleAnnotation();
          // annotating data for the page
          rectangle.PageNumber = parseInt(self.URLData.pageIndex);
          rectangle.X = self.URLData.x;
          rectangle.Y = self.URLData.y;
          rectangle.Width = self.URLData.width;
          rectangle.Height = self.URLData.height;
          rectangle.Author = annotManager.getCurrentUser();
          annotManager.addAnnotation(rectangle);
        } else {
          // opening the web-viewer as editor
          var annotManager = docViewer.getAnnotationManager();

          annotManager.on("annotationChanged", function(e, annots) {
            console.log("annotationChanged : ", annots);
            (self.URLData.pageIndex = annots[0].getPageNumber()),
              (self.URLData.x = annots[0].X),
              (self.URLData.y = annots[0].Y),
              (self.URLData.width = annots[0].Width),
              (self.URLData.height = annots[0].Height);
          });
        }
      });
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.view {
  width: 100%;
  height: 100vh;
}
</style>
