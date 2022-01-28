"use strict";
// const { sanitizeEntity } = require("strapi-utils");
const { createCoreController } = require("@strapi/strapi").factories;

const modelUID = "api::event.event";

module.exports = createCoreController(modelUID, ({ strapi }) => ({
  // Create user event----------------------------------------
  async create(ctx) {
    let entity;
    ctx.request.body.data.user = ctx.state.user;
    entity = await super.create(ctx);
    return entity;
  },
  // Update user event----------------------------------------
  async update(ctx) {
    let entity;
    const { id } = ctx.params;
    const query = {
      filters: {
        id: id,
        user: { id: ctx.state.user.id },
      },
    };
    // console.log(ctx.state.user.id);
    const events = await this.find({ query: query });
    // console.log(events);
    if (!events.data || !events.data.length) {
      return ctx.unauthorized(`You can't update this entry`);
    }
    entity = await super.update(ctx);
    return entity;
  },

  // Delete a user event----------------------------------------
  async delete(ctx) {
    const { id } = ctx.params;
    const query = {
      filters: {
        id: id,
        user: { id: ctx.state.user.id },
      },
    };
    const events = await this.find({ query: query });
    if (!events.data || !events.data.length) {
      return ctx.unauthorized(`You can't delete this entry`);
    }
    const response = await super.delete(ctx);
    return response;
  },
  async me(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was found" }] },
      ]);
    }
    // console.log(ctx);
    // console.log(strapi);
    // const entity = await strapi.service(modelUID).find(user.id, {
    //   populate: "*",
    // });
    const entries = await strapi.entityService.findMany(modelUID, {
      filters: { user: user.id },
      populate: "*",
    });

    // console.log(entries);
    // const data = await strapi.services.events.find({ user: user.id });
    // console.log(entity);
    if (!entries) {
      return ctx.notFound();
    }

    return entries;
  },
}));
