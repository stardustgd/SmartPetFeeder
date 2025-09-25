import dotenv from 'dotenv'

dotenv.config()

interface Config {
  port: number
  secretKey: string
  refreshSecret: string
  atlasUri: string
  environment: string
}

const config: Config = {
  port: Number(process.env.PORT) || 5050,
  secretKey: process.env.SECRET_KEY || '',
  refreshSecret: process.env.REFRESH_SECRET || '',
  atlasUri: process.env.ATLAS_URI || '',
  environment: process.env.ENVIRONMENT || 'dev',
}

export default config
