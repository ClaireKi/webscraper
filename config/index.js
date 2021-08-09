export const SERVER_MODE = "PROD"

export const PORT = 3030

export const WHITE_LIST = []

export const CORS_OPTIONS = {
    origin: (origin, callback) => {
        var isWhitelisted = WHITE_LIST.indexOf(origin) !== -1;
        callback(null, isWhitelisted); 
    },
    credentials:true
}

export const NONJEON_DB_CONFIG = {
    host     : 'localhost',
    user     : 'root',
    password : 'Dkdleldjvmffotvha$#43',
    port     : 3306,
    database: 'idea_platform',
    dateStrings: true,
    charset: 'utf8_general_ci',
    connectionLimit : 100
}
