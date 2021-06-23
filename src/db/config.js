const sqlite3 = require('sqlite3')
const { open } = require('sqlite')


// O método open() tem que estar dentro de uma função para ser usado, por isso estamos exportando uma arrow function e dentro dela colocamos ele
module.exports = () => 
	open({
		filename: './database.sqlite',
		driver: sqlite3.Database
	})