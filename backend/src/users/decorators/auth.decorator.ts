import { applyDecorators, UseGuards } from "@nestjs/common";
import { Roles } from "./roles.decorator";
import { AuthGuard } from "../guards/user.guard";
import { RolesGuard } from "../guards/roles.guard";
import { ROLES } from "../constants/role.constants";

export const Auth = (...roles: ROLES[]) => {
    roles.push(ROLES.ADMIN);
    return applyDecorators(
        Roles(roles),
        UseGuards(AuthGuard, RolesGuard)
    );
};