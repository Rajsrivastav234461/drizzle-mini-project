//  import { Placeholder, SQL } from "drizzle-orm";

// export class CreatePostDto {
//   title: string | SQL<unknown> | Placeholder<string, any>;
//   content: string | SQL<unknown> | Placeholder<string, any>;
//   authorId: number | SQL<unknown> | Placeholder<string, any>;
// }

// export class CreatePostDto {
//   title: string  
//   content: string  
//   authorId: number 
// }


// create-post.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
   title: string;

  @IsString()
  @IsNotEmpty()
   content: string;
}
