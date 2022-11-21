const axios = require("axios");
const { Country } = require("../db.js");

const getApiCountries = async (req, res) => {
  try {
    const apiInfo = await axios.get("https://restcountries.com/v3/all");
    const apiCountries = await apiInfo.data.map((c) => {
      return {
        name: c.name.common,
        flag: c.flags[0],
      };
    });
    let paisesApi = await apiCountries;

    paisesApi.forEach((el) => {
      Country.findOrCreate({
        where: { name: el.name, flag: el.flag },
      });
    });
    const allPaises = await Country.findAll();

    res.send(allPaises);
  } catch (error) {
    console.log("Sucedio un error en /paises: ", error);
  }
};

module.exports = { getApiCountries };
