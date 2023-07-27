import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { LoginService } from "./login.service";


@Controller('user')
export class LoginController{
    constructor (private readonly loginService:LoginService){}
    @Post('login')
    async login(
        @Body('username') username:string,
        @Body('password') password:string
    ){
        const user= await this.loginService.validateUser(username,password);
        if(!user){
            throw new HttpException('Invalid login',HttpStatus.UNAUTHORIZED)
        }
        return this.loginService.login(user)
    }

}