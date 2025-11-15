import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable
} from "@nestjs/common";
import { users } from "../data/users.data";
import { rolePermissions } from "../data/role-permissions.data";

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private requiredPermission: string) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const userId = Number(req.headers["authorization"]);

    if (!userId) {
      throw new ForbiddenException("Authorization header missing");
    }

    const user = users.find(u => u.id === userId);
    if (!user) throw new ForbiddenException("Invalid user");

    // Collect permissions from all user roles
    const permissions = user.roles.flatMap(roleCode => {
      const role = rolePermissions.find(r => r.code === roleCode);
      return role ? role.permissions : [];
    });

    if (!permissions.includes(this.requiredPermission)) {
      throw new ForbiddenException(
        "Not allowed to perform action due to insufficient permissions."
      );
    }

    return true;
  }
}