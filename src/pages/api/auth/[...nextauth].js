import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

// Default fallback values if env vars aren't set
const DEFAULT_ADMIN_EMAIL = 'admin@example.com';
const DEFAULT_ADMIN_PASSWORD = 'password123';
const DEFAULT_SECRET = 'this-is-a-development-secret-key';

// For demo purposes, we're using a simple in-memory user
// In a real app, this would come from MongoDB
const users = [
  {
    id: '1',
    name: 'Admin User',
    email: process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL,
    // This should be hashed in a real application
    password: process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD
  }
];

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Find user by email
        const user = users.find(user => user.email === credentials.email);
        
        if (!user) {
          throw new Error('No user found with this email');
        }
        
        // In a real app, you would hash the password and compare
        // const isValid = await bcrypt.compare(credentials.password, user.password);
        
        // For demo, we just do a simple comparison
        const isValid = credentials.password === user.password;
        
        if (!isValid) {
          throw new Error('Invalid password');
        }
        
        return {
          id: user.id,
          name: user.name,
          email: user.email
        };
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    }
  },
  pages: {
    signIn: '/', // We use a custom signin modal instead
    error: '/'
  },
  secret: process.env.NEXTAUTH_SECRET || DEFAULT_SECRET
});