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
      this.URLData.pageIndex = this.currentPage;
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
      var document = instance.document;
      let self = this;

      docViewer.on("documentLoaded", function() {
        if (self.isViewer) {
          // opening the web-viewer as viewer
          // copying the annoted data
          self.URLData = self.$route.query.URLData;

          // jumping to the marked page
          docViewer.setCurrentPage(self.URLData.pageIndex);
          // instance of annotation manager
          var annotManager = docViewer.getAnnotationManager();
          var rectangle = new Annotations.RectangleAnnotation();
          // annotating data for the page
          rectangle.PageNumber = parseInt(self.URLData.pageIndex);
          rectangle.X = self.URLData.x;
          rectangle.Y = self.URLData.y + 800;
          rectangle.Width = self.URLData.width;
          rectangle.Height = self.URLData.height;
          rectangle.Author = annotManager.getCurrentUser();
          annotManager.addAnnotation(rectangle);
        } else {
          // opening the web-viewer as editor

          var getMouseLocation = function(e) {
            var scrollElement = docViewer.getScrollViewElement();
            var scrollLeft = scrollElement.scrollLeft || 0;
            var scrollTop = scrollElement.scrollTop || 0;

            return {
              x: e.pageX + scrollLeft,
              y: e.pageY + scrollTop
            };
          };
          var displayMode = docViewer.getDisplayModeManager().getDisplayMode();

          // to fetch top left coordinates
          docViewer.on("mouseLeftDown", function(jqueryE, e) {
            // get mouse pointer coordinates
            self.firstWindowCoords = getMouseLocation(e);
            self.currentPage =
              displayMode.getSelectedPages(
                self.firstWindowCoords,
                self.firstWindowCoords
              ).first + 1;
            var pageCoordinates = displayMode.windowToPage(
              self.firstWindowCoords,
              self.currentPage
            );

            self.URLData.x = pageCoordinates.x;
            self.URLData.y = pageCoordinates.y;
          });

          // to fetch bottom right coordinates
          docViewer.on("mouseLeftUp", function(jqueryE, e) {
            // get mouse pointer coordinates
            self.secondWindowCoords = getMouseLocation(e);
            var pageCoordinates = displayMode.windowToPage(
              self.secondWindowCoords,
              self.currentPage
            );
            self.URLData.width = pageCoordinates.x - self.URLData.x;
            self.URLData.height = pageCoordinates.y - self.URLData.y;
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
