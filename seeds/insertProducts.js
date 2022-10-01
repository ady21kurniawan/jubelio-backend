/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const builderdb = require("../builderdb");
exports.seed = async function(knex) {

  const data = await builderdb();
  console.log(data[0]);

  var raws = [];

  data.forEach((value, index) => {

      var raw = {
        sku:value.prdNo,
        name: value.prdNm,
        images:null,
        price:value.selPrc,
        description:value.dispCtgrNmRoot
      }

      raws.push(raw)
  });

  console.log(raws);
  // Deletes ALL existing entries
  await knex('products').del()
  await knex('products').insert(raws);
};
