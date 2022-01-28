module.exports = {
  routes: [
    {
      method: "GET",
      path: "/events/me",
      handler: "custom-controller.me",
      config: {
        policies: [],
      },
    },
  ],
};
