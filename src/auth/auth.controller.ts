// import { Body, Controller, Post } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { SignupDto } from './dto/signup.dto';
// import { LoginDto } from './dto/login.dto';
// import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

// @ApiTags('auth')  // Tag to group the auth endpoints in Swagger UI
// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   // Signup endpoint
//   @Post('signup')
  
//   @ApiOperation({ summary: 'User Signup' })  // Description for the operation
//   @ApiBody({ type: SignupDto })  // Request body schema
//   @ApiResponse({ status: 201, description: 'User successfully signed up.' })
//   @ApiResponse({ status: 400, description: 'Bad request.' })
//   @ApiBody({
//     description: 'User signup details',
//     schema: {
//       type: 'object',
//       properties: {
//         name: { type: 'string', example: 'John Doe' },
//         email: { type: 'string', example: 'john.doe@example.com' },
//         password: { type: 'string', example: 'securePassword123' },
//       },
//       required: ['name', 'email', 'password'],
//     },
//   })
//   async signup(@Body() signupDto: SignupDto) {
//     return this.authService.signup(signupDto);
//   }

//   // Login endpoint
//   @Post('login')
  
//   @ApiOperation({ summary: 'User Login' })  // Description for the operation
// //   @ApiBody({ type: LoginDto })  // Request body schema
// @ApiBody({
//     description: 'User login details',
//     schema: {
//       type: 'object',
//       properties: {
//         email: { type: 'string', example: 'user@example.com' },
//         password: { type: 'string', example: 'strongPassword123' },
//       },
//       required: ['email', 'password'],
//     },
//   })
//   @ApiResponse({ status: 200, description: 'User successfully logged in.' })
//   @ApiResponse({ status: 401, description: 'Unauthorized: Invalid credentials.' })
//   async login(@Body() loginDto: LoginDto) {
//     return this.authService.login(loginDto);
//   }
// }



import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('auth')  // Tag to group the auth endpoints in Swagger UI
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Signup endpoint
  @Post('signup')
  @ApiOperation({ summary: 'User Signup' })  // Description for the operation
  @ApiBody({ type: SignupDto })  // Request body schema
  @ApiResponse({ status: 201, description: 'User successfully signed up.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  // Login endpoint
  @Post('login')
  @ApiOperation({ summary: 'User Login' })  // Description for the operation
  @ApiBody({
    description: 'User login details',
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        password: { type: 'string', example: 'strongPassword123' },
      },
      required: ['email', 'password'],
    },
  })  // Request body schema for login
  @ApiResponse({ status: 200, description: 'User successfully logged in.' })
  @ApiResponse({ status: 401, description: 'Unauthorized: Invalid credentials.' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
