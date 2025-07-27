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
    const authToken = req.cookies['authorization']

    if (!authToken) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const decoded = jwt.verify(authToken, config.secretKey) as User
    req.user = decoded

    next()
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' })
  }
}
