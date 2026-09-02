const { pool, Pool } = require('pg')

const DbCOnfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'zombieplus',
    password: 'postgres',
    port: 5432
}

export async function executeSQL(sqlScript) {

    try {
        const pool = new Pool(DbCOnfig)

        const client = await pool.connect()

        const result = await client.query(sqlScript)

        console.log(result)

    } catch (error) {
        console.log('Erro ao executar SQL ' + error)
    }
}