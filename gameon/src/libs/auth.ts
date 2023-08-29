import {NextAuthOptions} from "next-auth"
import {MongoDBAdapter} from "@auth/mongodb-adapter"
import clientPromise from "./mongodb"
import GoogleProvider from "next-auth/providers/google"
import CredentailsProvider from "next-auth/providers/credentials"
import { MongoClient } from "mongodb"
export const authOptions:NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENTID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentailsProvider({
            name: 'email and password',
            credentials: {
                email: {
                    label: "Email",
                    placeholder: "example@gmail.com",
                    type: "email",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder:"Enter Password"
                }
            },
             async authorize (credentaials, req){

                if(!credentaials?.email || !credentaials?.password){
                    throw new Error("Please provide valid credentails");
                }
                const client = await MongoClient.connect(
                    process.env.MONGO_URI as string
                )
                const db = client.db();
                const user = await db.collection('users').findOne({email:credentaials.email});
                if(user){
                    return user as any;
                }
                else{
                    return null;
                }
             }
        })
    ],
    session: {
        strategy: "jwt",
    },
    adapter: MongoDBAdapter(clientPromise),
    debug: process.env.NODE_ENV==="development",
    secret: process.env.NEXTAUTH_SECRET,
}