import NextAuth from 'next-auth';

import { authOptions } from '~/server/auth';

const handler = NextAuth(authOptions) as VoidFunction;

export { handler as POST, handler as GET };
