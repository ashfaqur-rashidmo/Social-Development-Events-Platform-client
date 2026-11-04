// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "@better-auth/mongo-adapter";
// import { jwt } from "better-auth/plugins"



// const client = new MongoClient(process.env.MONGODB_URI as string);
// const db = client.db();

// export const auth = betterAuth({
//     emailAndPassword: { 
//     enabled: true, 
//   }, 

//   plugins: [
//      jwt()
//   ],

//   session: {
//     cookieCache: {
//       enabled: true,
//       strategy: "jwt",
//       maxAge: 60 * 60 * 24 * 7, // 7 days
//     }
//   },

//   socialProviders: {
//         google: { 
//             clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string, 
//             clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET as string, 
//         }, 
//     },
//     database: mongodbAdapter(db, {
//     client,
//   }),
    
// });





import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db();

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,

  emailAndPassword: {
    enabled: true,
  },

  plugins: [
    jwt({
      sessionCookieCache: true,
    }),
  ],

  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 60 * 60 * 24 * 7,
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET as string,
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),
});
