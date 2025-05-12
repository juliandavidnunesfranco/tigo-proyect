import type { NextApiRequest, NextApiResponse } from "next"
import { verify } from "jsonwebtoken"
import type { IUserRepository } from "../../../domain/repositories/IUserRepository"
import { UserId } from "../../../domain/entities/user/UserId"

/**
 * Middleware para autenticación y autorización
 */
export function authMiddleware(userRepository: IUserRepository, requiredRoles: string[] = []) {
  return async (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
    try {
      // Obtener token de autorización
      const authHeader = req.headers.authorization
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Authentication required" })
      }

      const token = authHeader.substring(7)

      // Verificar y decodificar el token
      const decoded = verify(token, process.env.JWT_SECRET!) as any

      // Obtener el usuario de la base de datos
      const user = await userRepository.getById(UserId.create(decoded.userId))

      if (!user) {
        return res.status(401).json({ error: "User not found" })
      }

      // Verificar si el usuario está activo
      if (user.status !== "ACTIVE") {
        return res.status(403).json({ error: "User account is not active" })
      }

      // Verificar acceso al tenant actual
      const tenantId = (req as any).tenantContext?.tenantId
      if (tenantId && !user.hasTenantAccess(tenantId)) {
        return res.status(403).json({ error: "User does not have access to this tenant" })
      }

      // Verificar roles requeridos
      if (requiredRoles.length > 0) {
        const hasRequiredRole = requiredRoles.some((role) => user.hasRole(role))
        if (!hasRequiredRole) {
          return res.status(403).json({ error: "Insufficient permissions" })
        }
      }

      // Establecer el contexto del usuario para esta solicitud
      setUserContext(req, user)

      // Registrar el login
      user.recordLogin()
      await userRepository.save(user)

      next()
    } catch (error) {
      console.error("Auth middleware error:", error)
      return res.status(401).json({ error: "Invalid or expired token" })
    }
  }
}

/**
 * Establece el contexto del usuario para la solicitud actual
 */
function setUserContext(req: NextApiRequest, user: any): void {
  // Añadir información del usuario al objeto de solicitud para uso posterior
  ;(req as any).userContext = {
    userId: user.id.toString(),
    userName: user.name,
    userEmail: user.email.value,
    userRoles: user.getRoles(),
    accessibleTenants: user.getAccessibleTenants(),
  }
}
