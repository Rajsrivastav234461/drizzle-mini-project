// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { Inject } from '@nestjs/common';
// import { DrizzleDB } from 'src/drizzle/types/drizzle';
// import { DRIZZLE } from 'src/drizzle/drizzle.module';
// import * as bcrypt from 'bcryptjs';
// import { JwtService } from '@nestjs/jwt';
// import { SignupDto } from './dto/signup.dto';
// import { LoginDto } from './dto/login.dto';
// import { users } from 'src/drizzle/schema/users.schema';
// import { eq } from 'drizzle-orm';  // Import eq function from drizzle-orm

// @Injectable()
// export class AuthService {
//   constructor(
//     @Inject(DRIZZLE) private db: DrizzleDB,
//     private jwtService: JwtService,
//   ) {}

//   // Signup method
//   async signup(signupDto: SignupDto) {
//     const { name, email, password } = signupDto;
    
//     // Hash password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert user into the database
//     const user = await this.db
//       .insert(users)
//       .values({
//         name,
//         email,
//         password: hashedPassword,
//       })
//       .returning();

//     return user[0];
//   }

//   // Login method
//   async login(loginDto: LoginDto) {
//     const { email, password } = loginDto;

//     // Find user by email using eq() for comparison
//     const user = await this.db
//       .select()
//       .from(users)
//       .where(eq(users.email, email))  // Use eq() for comparison
//       .limit(1)
//       .execute();

//     if (!user[0]) {
//       throw new UnauthorizedException('Invalid credentials');
//     }

//     const isMatch = await bcrypt.compare(password, user[0].password);
//     if (!isMatch) {
//       throw new UnauthorizedException('Invalid credentials');
//     }

//     // Generate JWT token
//     const payload = { id: user[0].id, email: user[0].email };
//     const accessToken = this.jwtService.sign(payload);

//     return { accessToken };
//   }
// }




import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { users } from 'src/drizzle/schema/users.schema';
import { eq } from 'drizzle-orm';  // Import eq function from drizzle-orm

@Injectable()
export class AuthService {
  constructor(
    @Inject(DRIZZLE) private db: DrizzleDB,
    private jwtService: JwtService,
  ) {}

  // Signup method
  async signup(signupDto: SignupDto) {
    const { name, email, password } = signupDto;

    // Check if the email already exists
    const existingUser = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email))  // Use eq() for comparison
      .limit(1)
      .execute();

    if (existingUser.length > 0) {
      throw new UnauthorizedException('Email is already in use');
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    const user = await this.db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
      })
      .returning();

    return user[0];  // Returning user data after successful signup
  }

  // Login method
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user by email using eq() for comparison
    const user = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email))  // Use eq() for comparison
      .limit(1)
      .execute();

    if (!user[0]) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token with user id and email in the payload
    const payload = { id: user[0].id, email: user[0].email };
    const accessToken = this.jwtService.sign(payload);

    // Return access token on successful login
    return { accessToken };
  }
}
