import { RouterGuards } from "s-uni-router";

const guards = new RouterGuards();

export default function () {

  guards.beforeEach((form, to) => {
    console.log(form, to);
    return new Promise((r, s) => {
      setTimeout(() => {
        r(true);
      }, 5000);
    });
  });
}
