import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
			authorization: {
				params: {
					access_type: 'offline',
					prompt: 'consent',
					response_type: 'code',
				},
			},
    }),
    
  ],
};

export default NextAuth(authOptions);
