/* Modulos / Modules */
const express = require("express")
const bodyParser = require("body-parser")
const loki = require("lokijs")

/* Auxiliares / Helpers */
const server = express()
const port = 2000
const header = { "Content-Type" : "application/json; charset=utf-8"} 

let personas = null

const db = new loki("datos.json", {
	autoload : true, /*true carga, false cada vez que se resentea*/ 
	autosave : true /*true autosave, false no*/,
	autosaveInterval : 5000,
	autoloadCallback : () => {

		personas = db.addCollection("personas") || db.getCollection("personas")
	}
})

/* Configurarciones / Configurations */
server.listen( port )
server.use( bodyParser.urlencoded({ extended : false }))
server.use( bodyParser.json() )

/* Procesos / Process */
server.get("/api", (req, res) => {

	res.set( header )
	res.json( personas.data )
})

server.post("/api", (req, res) => {

	let persona = req.body

	personas.insert(persona)

	res.set( header )
	res.json( { "rta" : "ok" } )
})
