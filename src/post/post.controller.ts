// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
// } from '@nestjs/common';
// import { PostService } from './post.service';
// import { CreatePostDto } from './dto/create-post.dto';
// import { UpdatePostDto } from './dto/update-post.dto';

// @Controller('post')
// export class PostController {
//   constructor(private readonly postService: PostService) {}

//   @Post()
//   create(@Body() createPostDto: CreatePostDto) {
//     return this.postService.create(createPostDto);
//   }

//   @Get()
//   findAll() {
//     return this.postService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.postService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
//     return this.postService.update(+id, updatePostDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.postService.remove(+id);
//   }
// }

// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   Query,
// } from '@nestjs/common';
// import { PostService } from './post.service';
// import { CreatePostDto } from './dto/create-post.dto';
// import { UpdatePostDto } from './dto/update-post.dto';
// import { ApiQuery } from '@nestjs/swagger';

// @Controller('post')
// export class PostController {
//   constructor(private readonly postService: PostService) {}

//   @Post()
//   create(@Body() createPostDto: CreatePostDto) {
//     return this.postService.create(createPostDto);
//   }

//   @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Maximum number of items per page'})
//   @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (1-based index)' })

//   @Get()
  
//   findAll(@Query('page') page , @Query('limit') limit ) {
//     return this.postService.findAll({
//       page: Number(page),
//       limit: Number(limit),
//     });
//   }
    
//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.postService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
//     return this.postService.update(+id, updatePostDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.postService.remove(+id);
//   }
// }


// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   Query,
//   UseGuards,
// } from '@nestjs/common';
// import { PostService } from './post.service';
// import { CreatePostDto } from './dto/create-post.dto';
// import { UpdatePostDto } from './dto/update-post.dto';
// import { JwtAuthGuard } from 'src/auth/auth.guard';  // Import JWT AuthGuard
// import { User } from 'src/auth/user.decorator';  // Import User decorator
// import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

// @ApiBearerAuth()
// @Controller('post')
// export class PostController {
//   constructor(private readonly postService: PostService) {}

//   // Protect the 'create' endpoint with the JWT Auth Guard
//   @UseGuards(JwtAuthGuard)
//   @Post()

//   create(@Body() createPostDto: CreatePostDto, @User() user) {
//     // Attach the authenticated user as the author of the post
//     return this.postService.create(createPostDto, user.id);
//   }

//   @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Maximum number of items per page' })
//   @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (1-based index)' })
//   @Get()
//   findAll(@Query('page') page, @Query('limit') limit) {
//     return this.postService.findAll({
//       page: Number(page),
//       limit: Number(limit),
//     });
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.postService.findOne(+id);
//   }

//   // Protect the 'update' endpoint with JWT Auth Guard
//   @UseGuards(JwtAuthGuard)
//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @User() user) {
//     return this.postService.update(+id, updatePostDto, user.id);
//   }

//   // Protect the 'remove' endpoint with JWT Auth Guard
//   @UseGuards(JwtAuthGuard)
//   @Delete(':id')
//   remove(@Param('id') id: string, @User() user) {
//     return this.postService.remove(+id, user.id);
//   }
// }




// post.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/auth/user.decorator';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // Protect the 'create' endpoint with JWT Auth Guard
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto, @User() user) {
    // Attach the authenticated user as the author of the post
    console.log(user.userId)
    return this.postService.create(createPostDto, user.userId);
  }

  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Maximum number of items per page' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (1-based index)' })
  @Get()
  findAll(@Query('page') page, @Query('limit') limit) {
    return this.postService.findAll({
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  // Protect the 'update' endpoint with JWT Auth Guard
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @User() user) {
    return this.postService.update(+id, updatePostDto, user.userId);
  }

  // Protect the 'remove' endpoint with JWT Auth Guard
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @User() user) {
    return this.postService.remove(+id, user.userId);
  }
}
