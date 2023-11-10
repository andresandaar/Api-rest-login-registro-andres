import 'dotenv/config';
export default{
    jwtSecret: process.env.JWT_SECRET || 'clave_secreta_jwt',
    port: process.env.PORT ||  3000,
    db_host: process.env.DB_HOST || "localhost",
    db_port: process.env.DB_PORT || 3306,
    db_user: process.env.DB_USER || "root",
    db_password: process.env.DB_PASSWORD || "rootpass",
    db_database: process.env.DB_DATABASE || "login_nodex"
}