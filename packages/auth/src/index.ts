export * from '@clerk/nextjs';

export const authConfig = {
  debug: process.env.NODE_ENV === 'development',
  // You can customize these options based on your needs
  signIn: '/sign-in',
  signUp: '/sign-up',
  afterSignIn: '/',
  afterSignUp: '/',
};
