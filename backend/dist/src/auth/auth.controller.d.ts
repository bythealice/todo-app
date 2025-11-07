import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(signupDto: SignupDto): Promise<{
        user: {
            email: string;
            name: string;
            id: string;
            createdAt: Date;
        };
        access_token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
            createdAt: Date;
        };
        access_token: string;
    }>;
    getProfile(user: any): Promise<any>;
}
