import { Response, NextFunction } from 'express'
import { AuthenticatedRequest } from '../models/auth'
import jwt from 'jsonwebtoken'
import config from '../config/config'
import { User } from '../models/user'

export const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!('authorization' in req.headers)) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const authHeader = req.headers['authorization']

    if (!authHeader) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const token = Array.isArray(authHeader) ? authHeader[0] : authHeader

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const decoded = jwt.verify(token, config.secretKey) as User

    req.user = decoded

    next()
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' })
  }
}
