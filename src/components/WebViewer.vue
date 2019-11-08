<template>
  <div>
    <div v-if="!isViewer">
      <button @click="createUrl">Create URL</button>
    </div>
    <div class="view" ref="viewer"></div>
  </div>
</template> 

<script>
import store from "@/store/store";
export default {
  name: "WebViewer",
  props: {
    path: String,
    url: String,
    isViewer: Boolean,
    fileUrlData: {}
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
      this.URLData.file = this.url;
      store.dispatch("home/createUrl", this.URLData);
    }
  },
  mounted: function() {
    // eslint-disable-next-line no-undef
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
        // instance of annotation manager
        var annotManager = docViewer.getAnnotationManager();

        if (self.isViewer) {
          // opening the web-viewer as viewer
          // jumping to the marked area
          var doc = docViewer.getDocument();
          var zoomLevel = 1;

          var pageHeight = doc.getPageInfo(self.fileUrlData.pageIndex).height;
          var pageGap = 5;
          // x and y offsets are continous increasing and considers document as one long page
          var xOffset = self.fileUrlData.x * zoomLevel;
          var yOffset =
            (self.fileUrlData.y +
              (pageHeight + pageGap) * (self.fileUrlData.pageIndex - 1)) *
            zoomLevel;
          docViewer.zoomTo(zoomLevel, xOffset, yOffset);
          // the color to fill in the marked area
          var fillColor = { R: 255, G: 255, B: 0, A: 0.2 };
          var rectangle = new Annotations.RectangleAnnotation();
          var color = new Annotations.Color(
            fillColor.R,
            fillColor.G,
            fillColor.B,
            fillColor.A
          );
          // annotating data for the page
          rectangle.PageNumber = parseInt(self.fileUrlData.pageIndex);
          rectangle.X = self.fileUrlData.x;
          rectangle.Y = self.fileUrlData.y;
          rectangle.Width = self.fileUrlData.width;
          rectangle.Height = self.fileUrlData.height;
          rectangle.FillColor = color;
          rectangle.Author = annotManager.getCurrentUser();
          annotManager.addAnnotation(rectangle);
        } else {
          // opening the web-viewer as editor

          annotManager.on("annotationChanged", function(e, annots) {
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
