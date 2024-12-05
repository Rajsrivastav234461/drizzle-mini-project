// import { Module } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
//  export const DRIZZLE=Symbol('drizzle-connection');//unique token
//  import { Pool } from 'pg';
//  import {drizzle, NodePgDatabase} from 'drizzle-orm/node-postgres'
//  import  *  as schema from './schema/schema';

//  //dynamic provider
// @Module({
//     providers:[
//         {
//             provide:DRIZZLE,
//             inject:[ConfigService],//use for other
//             useFactory:async(ConfigService:ConfigService)=>{
//                 const databasURL=ConfigService.get<string>("DATABASE_URL");//will use databaseURL in other
//                     const pool=new Pool({   //create pool
//                        connectionString:databasURL,
//                         ssl:true,
//                     });
//                  return   drizzle(pool,{schema})as NodePgDatabase<typeof schema>
//             },
            
//         },
//     ],
//     exports:[DRIZZLE] // can use in other services
// })
// export class DrizzleModule {}



import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema/schema';

export const DRIZZLE = Symbol('DRIZZLE_CONNECTION');

@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<NodePgDatabase<typeof schema>> => {
        const databaseURL = configService.get<string>('DATABASE_URL');
        const pool = new Pool({ connectionString: databaseURL });
        return drizzle(pool, { schema });
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
