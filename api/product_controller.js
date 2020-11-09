const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.product.search(ctx.query);
    } else {
      entities = await strapi.services.product.find(ctx.query);
    }

    return entities.map((entity) => {
      const product = sanitizeEntity(entity, {
        model: strapi.models.product,
      });

      // Calculate price
      if (product.cost && product.markup) {
        product.price = product.cost * product.markup;
      }

      // Calculate sale price
      if (!product.sale_price && product.sale_cost && product.markup) {
        product.sale_price = product.sale_cost * product.markup;
      }

      // Calculate final price
      product.final_price = product.sale_price
        ? product.sale_price
        : product.price;

      return product;
    });
  },
};
