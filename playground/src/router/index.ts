import { RouterGuards } from "s-uni-router";

const guards = new RouterGuards();

export default function () {
  guards.beforeEach((form, to) => {
    return new Promise((r, s) => {
      setTimeout(() => {
        r(true);
      }, 5000);
    });
    // return true;
  });
  // guards.beforeEach((form, to) => {
  //   return new Promise((r, s) => {
  //     console.log(form, to);
  //     if (to.url === "/pages/index/index") {
  //       r({
  //         url: "/pages/ppp/index",
  //         query: {
  //           b: "3",
  //         },
  //       });
  //     } else if (to.url === "/pages/ppp/index") {
  //       r(true);
  //     } else {
  //       setTimeout(() => {
  //         r(true);
  //       }, 5000);
  //     }
  //   });
  //   // return true;
  // });
}
