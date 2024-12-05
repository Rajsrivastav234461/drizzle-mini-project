// import type { Config } from "drizzle-kit";

// const config: Config = {
//   schema: "./src/drizzle/schema/schema.ts", // Path to your schema file
//   out: "./drizzle", // Directory where migrations will be stored
//   driver: "pg", // PostgreSQL as the driver
//   dbCredentials: {
//     user: "postgres", // Your database username
//     password: "123", // Your database password
//     host: "localhost", // Your database host
//     port: 5432, // Your database port
//     database: "drizzle_crud", // Your database name
//     ssl: false, // Ensure SSL is a boolean (not a string)
//   },
// };

// export default config;


import { defineConfig } from 'drizzle-kit'
// via connection params
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/drizzle/schema/schema.ts",
  out: "./drizzle",
   dbCredentials: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "123",
    database: "drizzle_crud",
    ssl: false, // can be boolean | "require" | "allow" | "prefer" | "verify-full" | options from node:tls
  }
})