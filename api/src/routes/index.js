const { Router } = require('express');
const dietsRouter = require('./dietsRouter')
const recipesRouter = require('./recipesRouter')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/diets', dietsRouter);
router.use('/recipes',recipesRouter);
//router.use("/recipes", Recipes);


module.exports = router;
