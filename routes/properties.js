const express = require("express");
const router = express.Router();

const getProperties = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM properties;`)
      .then((data) => {
        console.log(data.rows);
        const templateVars = { properties: data.rows };
        console.log(templateVars);
        res.render("properties", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

const addProperties = (db) => {
  router
    .post("/", (req, res) => {
      db.query(
        `INSERT INTO properties (
          owner_id,
          name,
          title,
          description,
          cost,
          image_url,
          number_of_bedrooms,
          number_of_bathrooms,
          country,
          province,
          city,
          postal_code,
          street,
          isActive)
          VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
          RETURNING *;
`,
        [
          properties.owner_id,
          properties.name,
          properties.title,
          properties.description,
          properties.cost,
          properties.image_url,
          properties.number_of_bedrooms,
          properties.number_of_bathrooms,
          properties.country,
          properties.province,
          properties.city,
          properties.postal_code,
          properties.street,
          properties.isActive,
        ]
      );
    })
    .then((res) => {
      return res.rows[0];
    });
};

module.exports = { getProperties, addProperties };