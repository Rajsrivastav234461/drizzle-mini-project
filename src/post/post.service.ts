// import { Inject, Injectable, NotFoundException } from '@nestjs/common';
// import { CreatePostDto } from './dto/create-post.dto';
// import { UpdatePostDto } from './dto/update-post.dto';
// import { DRIZZLE } from 'src/drizzle/drizzle.module';
// import { DrizzleDB } from 'src/drizzle/types/drizzle';
// import { posts } from 'src/drizzle/schema/posts.schema';
// import { eq } from 'drizzle-orm';
// import { comments } from 'src/drizzle/schema/comments.schema';

// @Injectable()
// export class PostService {
//   constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}
//   create(createPostDto: CreatePostDto) {
//     return 'This action adds a new post';
//   }

//   async findAll(p0: { page: number; limit: number; }) {
//     // return await this.db.select().from(posts);
//     return await this.db.query.posts.findMany({
//       // where: (posts, { eq }) => eq(posts.id, 1),
//       with: {
//         author: {
//           with: {
//             usersToGroups: {
//               with: {
//                 group: true,
//               },
//             },
//           },
//         },
//         comments: true,
//       },
//     });
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} post`;
//   }

//   async update(id: number, updatePostDto: UpdatePostDto) {
//     return await this.db
//       .update(posts)
//       .set({
//         title: 'NITESH Srivastava',
//       })
//       .where(eq(posts.id, id));
//   }

//   async remove(id: number) {
//     // Delete related comments first to avoid foreign key constraint violations
//     await this.db.delete(comments).where(eq(comments.postId, id));

//     // Now delete the post
//     const result = await this.db.delete(posts).where(eq(posts.id, id));
//     if (result.rowCount === 0) {
//       throw new NotFoundException(`Post with ID ${id} not found`);
//     }
//     return `Post with ID ${id} deleted successfully`;
//   }
// }

// 



// import { Inject, Injectable, NotFoundException } from '@nestjs/common';
// import { CreatePostDto } from './dto/create-post.dto';
// import { UpdatePostDto } from './dto/update-post.dto';
// import { DRIZZLE } from 'src/drizzle/drizzle.module';
// import { DrizzleDB } from 'src/drizzle/types/drizzle';
// import { posts } from 'src/drizzle/schema/posts.schema';
// import { eq } from 'drizzle-orm';
// import { comments } from 'src/drizzle/schema/comments.schema';
// import { sql } from 'drizzle-orm/sql';

// @Injectable()
// export class PostService {
//   constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

//   create(createPostDto: CreatePostDto) {
//     return this.db
//       .insert(posts)
//       .values({
//         title: createPostDto.title,
//         content: createPostDto.content,
//         authorId: createPostDto.authorId,
//       })
//       .returning();
//   }

//   async findAll({ page, limit }: { page: number; limit: number }) {
//     const offset = (page - 1) * limit;
    
//     page = Math.max(page, 1); // page should not be less than 1
//     limit = Math.max(limit, 1); // limit should not be less than 1

//     // Retrieve posts with pagination and relations, excluding password from author
//     const data = await this.db.query.posts.findMany({
//       limit,
//       offset,
//       with: {
//         author: {
//           columns: {
//             id: true,
//             name: true,
//             email: true,
//           },
//           with: {
//             usersToGroups: {
//               with: {
//                 group: true,
//               },
//             },
//           },
//         },
//         comments: true,
//       },
//     });

//     // Get the total count of posts for pagination metadata
//     const totalItemsResult = await this.db.execute(
//       sql`SELECT COUNT(*) AS count FROM ${posts}`
//     );

//     const totalItems = totalItemsResult[0]?.count || 0;

//     return {
//       data,
//       meta: {
//         currentPage: page,
//         totalPages: Math.ceil(totalItems / limit),
//         totalItems,
//       },
//     };
//   }

//   async findOne(id: number) {
//     // Fetch the post with relations (author and comments) by ID, excluding password from author
//     const post = await this.db.query.posts.findFirst({
//       where: (posts, { eq }) => eq(posts.id, id),
//       with: {
//         author: {
//           columns: {
//             id: true,
//             name: true,
//             email: true,
//           },
//           with: {
//             usersToGroups: {
//               with: {
//                 group: true,
//               },
//             },
//           },
//         },
//         comments: true,
//       },
//     });
  
//     // If the post is not found, throw a NotFoundException
//     if (!post) {
//       throw new NotFoundException(`Post with ID ${id} not found`);
//     }
  
//     return post;
//   }

//   async update(id: number, updatePostDto: UpdatePostDto) {
//     return await this.db
//       .update(posts)
//       .set({
//         title: updatePostDto.title || 'Updated Title',
//         authorId: updatePostDto.authorId,
//       })
//       .where(eq(posts.id, id));
//   }

//   async remove(id: number) {
//     // Delete related comments first
//     await this.db.delete(comments).where(eq(comments.postId, id));

//     // Now delete the post
//     const result = await this.db.delete(posts).where(eq(posts.id, id));
//     if (result.rowCount === 0) {
//       throw new NotFoundException(`Post with ID ${id} not found`);
//     }
//     return `Post with ID ${id} deleted successfully`;
//   }
// }



// import { Inject, Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
// import { CreatePostDto } from './dto/create-post.dto';
// import { UpdatePostDto } from './dto/update-post.dto';
// import { DRIZZLE } from 'src/drizzle/drizzle.module';
// import { DrizzleDB } from 'src/drizzle/types/drizzle';
// import { posts } from 'src/drizzle/schema/posts.schema';
// import { eq } from 'drizzle-orm';
// import { comments } from 'src/drizzle/schema/comments.schema';
// import { sql } from 'drizzle-orm/sql';

// @Injectable()
// export class PostService {
//   constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

//   create(createPostDto: CreatePostDto, authorId: number) {
//     return this.db
//       .insert(posts)
//       .values({
//         title: createPostDto.title,
//         content: createPostDto.content,
//         authorId,  // associate the post with the author
//       })
//       .returning();
//   }

//   async findAll({ page, limit }: { page: number; limit: number }) {
//     const offset = (page - 1) * limit;
    
//     page = Math.max(page, 1); // page should not be less than 1
//     limit = Math.max(limit, 1); // limit should not be less than 1

//     // Retrieve posts with pagination and relations, excluding password from author
//     const data = await this.db.query.posts.findMany({
//       limit,
//       offset,
//       with: {
//         author: {
//           columns: {
//             id: true,
//             name: true,
//             email: true,
//           },
//           with: {
//             usersToGroups: {
//               with: {
//                 group: true,
//               },
//             },
//           },
//         },
//         comments: true,
//       },
//     });

//     // Get the total count of posts for pagination metadata
//     const totalItemsResult = await this.db.execute(
//       sql`SELECT COUNT(*) AS count FROM ${posts}`
//     );

//     const totalItems = totalItemsResult[0]?.count || 0;

//     return {
//       data,
//       meta: {
//         currentPage: page,
//         totalPages: Math.ceil(totalItems / limit),
//         totalItems,
//       },
//     };
//   }

//   async findOne(id: number) {
//     // Fetch the post with relations (author and comments) by ID, excluding password from author
//     const post = await this.db.query.posts.findFirst({
//       where: (posts, { eq }) => eq(posts.id, id),
//       with: {
//         author: {
//           columns: {
//             id: true,
//             name: true,
//             email: true,
//           },
//           with: {
//             usersToGroups: {
//               with: {
//                 group: true,
//               },
//             },
//           },
//         },
//         comments: true,
//       },
//     });
  
//     // If the post is not found, throw a NotFoundException
//     if (!post) {
//       throw new NotFoundException(`Post with ID ${id} not found`);
//     }
  
//     return post;
//   }

//   async update(id: number, updatePostDto: UpdatePostDto, userId: number) {
//     const post = await this.db.query.posts.findFirst({
//       where: (posts, { eq }) => eq(posts.id, id),
//     });

//     if (!post) {
//       throw new NotFoundException(`Post with ID ${id} not found`);
//     }

//     if (post.authorId !== userId) {
//       throw new ForbiddenException('You can only update your own posts');
//     }

//     return await this.db
//       .update(posts)
//       .set({
//         title: updatePostDto.title || 'Updated Title',
//         content: updatePostDto.content || 'Updated Content',
//       })
//       .where(eq(posts.id, id));
//   }

//   async remove(id: number, userId: number) {
//     const post = await this.db.query.posts.findFirst({
//       where: (posts, { eq }) => eq(posts.id, id),
//     });

//     if (!post) {
//       throw new NotFoundException(`Post with ID ${id} not found`);
//     }

//     if (post.authorId !== userId) {
//       throw new ForbiddenException('You can only delete your own posts');
//     }

//     // Delete related comments first
//     await this.db.delete(comments).where(eq(comments.postId, id));

//     // Now delete the post
//     const result = await this.db.delete(posts).where(eq(posts.id, id));
//     if (result.rowCount === 0) {
//       throw new NotFoundException(`Post with ID ${id} not found`);
//     }
//     return `Post with ID ${id} deleted successfully`;
//   }
// }




// post.service.ts
import { Inject, Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { posts } from 'src/drizzle/schema/posts.schema';
import { eq } from 'drizzle-orm';
import { comments } from 'src/drizzle/schema/comments.schema';
import { sql } from 'drizzle-orm/sql';
import { users } from 'src/drizzle/schema/users.schema'; // Assuming this is where users are stored

@Injectable()
export class PostService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(createPostDto: CreatePostDto, authorId: number) {

    console.log(authorId, " authorID")
    // Ensure the user exists before allowing post creation
    const userExists = await this.db.query.users.findFirst({
      where: eq(users.id, authorId),
    });

    if (!userExists) {
      throw new NotFoundException('User not authorized to create posts');
    }

    return this.db
      .insert(posts)
      .values({
        title: createPostDto.title,
        content: createPostDto.content,
        authorId,  // associate the post with the author
      })
      .returning();
  }

  async findAll({ page, limit }: { page: number; limit: number }) {
    const offset = (page - 1) * limit;

    const data = await this.db.query.posts.findMany({
      limit,
      offset,
      with: {
        author: {
          columns: {
            id: true,
            name: true,
            email: true,
          },
        },
        comments: true,
      },
    });

    const totalItemsResult = await this.db.execute(
      sql`SELECT COUNT(*) AS count FROM ${posts}`
    );

    const totalItems = totalItemsResult[0]?.count || 0;

    return {
      data,
      meta: {
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        totalItems,
      },
    };
  }

  async findOne(id: number) {
    const post = await this.db.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
      with: {
        author: {
          columns: {
            id: true,
            name: true,
            email: true,
          },
        },
        comments: true,
      },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto, userId: number) {
    const post = await this.db.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    if (post.authorId !== userId) {
      console.log(userId)
      throw new ForbiddenException('You can only update your own posts');
    }

    return await this.db
      .update(posts)
      .set({
        title: updatePostDto.title || 'Updated Title',
        content: updatePostDto.content || 'Updated Content',
      })
      .where(eq(posts.id, id));
  }

  async remove(id: number, userId: number) {
    const post = await this.db.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    if (post.authorId !== userId) {
      throw new ForbiddenException('You can only delete your own posts');
    }

    await this.db.delete(comments).where(eq(comments.postId, id));

    const result = await this.db.delete(posts).where(eq(posts.id, id));
    if (result.rowCount === 0) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return `Post with ID ${id} deleted successfully`;
  }
}
