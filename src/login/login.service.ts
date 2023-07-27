import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user.services";
import * as bcrypt from 'bcryptjs';
import { promises } from "dns";

@Injectable()

export class LoginService{
    constructor(
        private readonly userService: UserService,
        private readonly jwtService:JwtService,
    ){}

    async validateUser(username:string , password:string): Promise<any> {

        const user=await this.userService.findByUsername(username);
        if(user && bcrypt.compareSync(password,user.password)){
            const {password, ...result}=user;
            console.log(result);
            return result;
        }
        return null;
    }

    async login(user:any){
        const payload={username: user.username,sub: user.id};
        return{
            access_token:this.jwtService.sign(payload),
        }
    }

}
