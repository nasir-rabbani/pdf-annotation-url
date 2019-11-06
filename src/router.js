import Vue from "vue";
import Router from "vue-router";
import store from "@/store/store";

Vue.use(Router);
function loadView(view) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`);
}
export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: loadView("Home"),
      meta: { title: "Home" }
    },
    {
      path: "/editor",
      name: "editor",
      component: loadView("Editor"),
      meta: { title: "Editor" }
    },
    {
      path: "/viewer/:id",
      name: "viewer",
      component: loadView("Viewer"),
      // props(route) {
      //   return { fileUrl: route.query.URLData.file };
      // },
      props: true,
      meta: { title: "PDF Viewer" },
      beforeEnter(routeTo, routeFrom, next) {
        store
          .dispatch("home/fetchURLData", routeTo.params.id)
          .then(fileUrlData => {
            routeTo.params.fileUrlData = fileUrlData;
            next();
          })
          .catch(error => {
            alert("Something went wrong!!!", error);
          });
      }
    }
  ]
});
