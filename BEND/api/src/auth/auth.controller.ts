import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDTO } from "./DTO/authDTO";
import { SignUpDTO } from "./DTO/signUpDTO";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

}