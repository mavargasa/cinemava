const { PeliculaModel } = require("../mongo/models/peliculas.model");

async function getAllPelicula() {
  const pelicula = await PeliculaModel.find();
  return pelicula;
}

async function postPelicula(rol, data) {
  if (rol === "administrador" && Object.entries(data).length > 0) {
    const pelicula = await new PeliculaModel({ ...data });
    pelicula.save();
    return pelicula;
  } else {
    return "No eres administrador o no enviaste el objeto pelicula!!!";
  }
}

async function getPelicula(titulo) {
  const pelicula = await PeliculaModel.findOne({ titulo });
  return pelicula;
}

async function putPelicula(rol, data) {
  if (rol === "administrador" || rol === "encargado") {
    const { titulo, pelicula } = data;
    if (!titulo) {
      return "Hace falta el titulo de la pelicula!!!";
    }
    const peliculaUpdated = await PeliculaModel.findOneAndUpdate(
      { titulo },
      { ...pelicula }
    );
    return peliculaUpdated;
  } else {
    return "No eres administrador, encargado o no enviaste el objeto pelicula!!!";
  }
}

async function deletePelicula(rol, titulo) {
  if (rol === "administrador" && titulo) {
    const pelicula = await PeliculaModel.findOneAndDelete({ titulo });
    return pelicula;
  } else {
    return "No eres administrador o no enviaste el titulo de la pelicula!!!";
  }
}

module.exports = {
  getAllPelicula,
  postPelicula,
  getPelicula,
  putPelicula,
  deletePelicula,
};
