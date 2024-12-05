// export class SignupDto {
//     name: string;
//     email: string;
//     password: string;
//   }
  

// signup.dto.ts
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
   
  @IsNotEmpty()
  password: string;
}
