const { Router } = require("express");

const {
  getAllUsuario,
  postUsuario,
  getUsuario,
  putUsuario,
  deleteUsuario,
} = require("../controllers/usuario");

const {
  getAllPelicula,
  postPelicula,
  getPelicula,
  putPelicula,
  deletePelicula,
} = require("../controllers/peliculas");

const appRouter = Router();

/**
 * * ENDPOINTS - USUARIOS
 */

appRouter.get("/usuario-todos", async (Req, Resp) => {
  try {
    const result = await getAllUsuario();
    Resp.json(result);
  } catch (error) {
    console.log(error);
  }
});

appRouter.post("/nuevo-usuario", async (Req, Resp) => {
  try {
    if (Object.entries(Req.body).length == 0) {
      return Resp.send("Faltan campos (usuario)");
    }
    const result = await postUsuario(Req.body);
    Resp.json(result);
  } catch (error) {
    console.log(error);
  }
});

appRouter.get("/obtener-usuario/:dni", async (Req, Resp) => {
  try {
    const { dni } = Req.params;
    if (!dni) {
      return Resp.send("Faltan campos (dni)");
    }
    const result = await getUsuario(dni);
    Resp.json(result);
  } catch (error) {
    console.log(error);
  }
});

appRouter.put("/actualizar-usuario/:dni", async (Req, Resp) => {
  try {
    const { dni } = Req.params;
    if (!dni) {
      return Resp.send("Faltan campos (dni)");
    }
    if (Object.entries(Req.body).length == 0) {
      return Resp.send("Faltan campos (usuario)");
    }
    const result = await putUsuario(dni, Req.body);
    Resp.json(result);
  } catch (error) {
    console.log(error);
  }
});

appRouter.delete("/eliminar-usuario/:dni", async (Req, Resp) => {
  try {
    const { dni } = Req.params;
    if (!dni) {
      return Resp.send("Faltan campos (dni)");
    }
    const result = await deleteUsuario(dni);
    Resp.json(result);
  } catch (error) {
    console.log(error);
  }
});

/**
 * * ENDPOINTS - PELICULAS
 */

appRouter.get("/pelicula-todos", async (Req, Resp) => {
  try {
    const result = await getAllPelicula();
    Resp.json(result);
  } catch (error) {
    console.log(error);
  }
});

appRouter.post("/nueva-pelicula/:rol", async (Req, Resp) => {
  try {
    const { rol } = Req.params;
    if (!rol && Object.entries(Req.body).length == 0) {
      return Resp.send("Faltan campos (rol y pelicula)");
    }
    const result = await postPelicula(rol, Req.body);
    Resp.json(result);
  } catch (error) {
    console.log(error);
  }
});

appRouter.get("/obtener-pelicula/:titulo", async (Req, Resp) => {
  try {
    const { titulo } = Req.params;
    if (!titulo) {
      return Resp.send("Faltan campos (titulo)");
    }
    const result = await getPelicula(titulo);
    Resp.json(result);
  } catch (error) {
    console.log(error);
  }
});

appRouter.put("/actualizar-pelicula/:rol", async (Req, Resp) => {
  try {
    const { rol } = Req.params;
    if (!rol) {
      return Resp.send("Faltan campos (rol)");
    }
    if (Object.entries(Req.body).length == 0) {
      return Resp.send("Faltan campos (titulo y pelicula)");
    }
    const result = await putPelicula(rol, Req.body);
    Resp.json(result);
  } catch (error) {
    console.log(error);
  }
});

appRouter.delete("/eliminar-pelicula/:rol", async (Req, Resp) => {
  try {
    const { rol } = Req.params;
    const { titulo } = Req.body;
    if (!rol && !titulo) {
      return Resp.send("Faltan campos (rol y titulo)");
    }
    const result = await deletePelicula(rol, titulo);
    Resp.json(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  appRouter,
};
