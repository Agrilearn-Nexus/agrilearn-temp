import {config} from "dotenv"

config({
    path: process.cwd() + '/.env'
})
import {defineConfig, env} from "prisma/config"

export default defineConfig({
    schema: process.cwd() + '/prisma/schema.prisma',
    migrations: {
        path: process.cwd() + '/prisma/migrations',
    },
    datasource: {
        url: env('DATABASE_URL') || `postgresql://user:pass@localhost:5432/db`
    }
})