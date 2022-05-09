import { Strategy } from 'passport-local';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(playername: string, password: string): Promise<any | UnauthorizedException>;
}
export {};
