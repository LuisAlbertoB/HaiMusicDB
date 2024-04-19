const express = require("express");
const cors = require("cors")
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const dbConfig = require("./src/config/db.config")
const rateLimit = require("express-rate-limit");
const app = express();


const accountLimiter = rateLimit({
    windowMs: 60  * 1000, // 1 minuto
    max: 5, 
    message: "Demasiadas peticiones realizadas, intenta despues de 1 hora"
}); 


let corsOption = {
    origin: "http://177.244.61.246:3030"
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(accountLimiter);

const db = require("./src/models");
const Role = db.role;


db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`)
.then(() => {
    console.log("Exito al conectar con mongo db");
    initial();
})
    .catch(err => {
    console.error("error al conectar", err);
    process.exit();
});

app.get("/", (req,res)=>{
    res.json({message:"Bienbenidos a HaiMusic API"})
})


require('./src/routers/auth.routes')(app);
require('./src/routers/user.routes')(app);
require('./src/routers/song.routes')(app);
require('./src/routers/artist.routes')(app);
require('./src/routers/disk.routes')(app);
require('./src/routers/lenguage.routes')(app);
require('./src/routers/favList.routes')(app);
require('./src/routers/likedList.routes')(app);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en el puerto: ${PORT}.`);
});

async function initial() {
    try{
      const count = await Role.estimatedDocumentCount();
      if(count === 0){
        await Promise.all([
          new Role({name: "user"}).save(),
          new Role({name: "admin"}).save()
        ])
        console.log("Roles activados e iniciados");
      }
      }catch (error){
        console.error("error al iniciar los roles checalo",error);
  }
  
  }

  const upload = multer({ dest: 'uploads/' });

// Endpoint para subir archivos mp3
app.post('/api/V3/upload', upload.single('mp3file'), (req, res) => {

  res.send('Archivo mp3 subido correctamente.');
});

// Endpoint para descargar archivos mp3
app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);

  // Verificar si el archivo existe
  if (fs.existsSync(filePath)) {
    // Configurar el encabezado Content-Type para archivos mp3
    res.setHeader('Content-Type', 'audio/mpeg');
    // Proporcionar el archivo como una respuesta HTTP
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.status(404).send('Archivo no encontrado.');
  }
});


