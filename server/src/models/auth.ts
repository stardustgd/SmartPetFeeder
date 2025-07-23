import { Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'

export interface AuthenticatedRequest extends Request {
  user?: User
}

interface User extends JwtPayload {
  id: number
}
