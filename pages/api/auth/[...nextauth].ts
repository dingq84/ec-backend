import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Login',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Please enter your username' },
        password: { label: 'Password', type: 'password', placeholder: 'Please enter your password' }
      },
      async authorize(credentials) {
        console.log(credentials, 14)
        const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }

        if (user) {
          // Any user object returned here will be saved in the JSON Web Token
          return user
        } else {
          return null
        }
      }
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    }),
    Providers.Google({
      // google 的 redirect 不能是 http://localhost:3000，需要是 http://localhost:3000/api/auth/callback/google
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  pages: {
    signIn: '/auth/signIn'
  },
  secret: process.env.SECRET,
  // Optional SQL or MongoDB database to persist users
  // database: process.env.DATABASE_URL
  session: {
    jwt: true
  }
})
