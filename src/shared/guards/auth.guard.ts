import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import { UserService } from "src/modules/user/services/user/user.service";
import { UserFactory } from "../../modules/user/factories/user.factor";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly userService: UserService){}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const valid = await this.validateRequest(request);
        if(!valid) throw new UnauthorizedException("Unauthorized");
        return true;
    }

    private async validateRequest(request: Request) : Promise<boolean> {
        const authToken = this.getAuthTokenFromRequest(request);

        if(!authToken) return false 

        const authData: any = jwt.decode(authToken, { complete: true });
        
        if (!authData || !authData.payload) return false;
        
        const userExist =  await this.userService.findByUserId(authData.payload.id);
        if(!userExist) {
            throw new UnauthorizedException("Unauthorized");
        }

        request.user = UserFactory.generateUserForJwt(userExist);

        return true;

    }

    getAuthTokenFromRequest(request: Request): string {
        const authTokenSegment = (request.headers['authorization'] || '').split(' ')
        
        return authTokenSegment.length == 2 ? authTokenSegment[1] : null;
    }
}