const express = require('express')
const connection = require('./conf/config')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json());

app.get('/api/users', (req, res) => {
	connection.query('select * from usuario', (error, response) => {
		res.send(response)
	})
})

app.get('/api/user/:id', (req, res) => {
	connection.query(`select * from usuario where nombreUsuario = '${req.params.id}'`, (error, response) => {
		res.send(response)
	})
})

app.post('/api/user/', (req, res) => {
	const nombreUsuario = req.body['nombreUsuario']
	const password = req.body['password']
	const privilegio = req.body['privilegio']

	connection.query(`INSERT INTO usuario(nombreUsuario,password,privilegio) VALUES('${nombreUsuario}','${password}',${privilegio})`, (error, response) => {

		res.status(201).send(`{"message":"Usuario agregado"}`);
	});
});
app.put('/api/user/:id', (req, res) => {
	connection.query(`UPDATE usuario SET ? WHERE nombreUsuario='${req.params.id}'`, req.body, (error, response) => {
		res.status(201).send(`{"message":"Usuario actualizado"}`);
	});
});

app.delete('/api/user/:id', (req, res) => {
	connection.query(`DELETE from usuario where nombreUsuario = '${req.params.id}'`, (error, response) => {
		if (error) throw error;
		res.send("Usuario eliminado")
	})
});

app.listen(3000, () =>
	console.log(`Server running: 3000`),
);