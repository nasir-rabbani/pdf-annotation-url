import Vue from "vue";
import Router from "vue-router";

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
      path: "/viewer/:pageIndex",
      name: "viewer",
      component: loadView("Viewer"),
      props(route) {
        return { fileUrl: route.query.URLData.file };
      },
      // props: false,
      meta: { title: "PDF Viewer" }
    }
  ]
});
