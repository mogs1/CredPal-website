import jwt from 'jsonwebtoken';

export const generateToken = (userId: string) => {
  const JWT_SECRET = process.env.JWT_SECRET;

  console.log('JWT_SECRET:', process.env.JWT_SECRET); // TEMPORARY
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}
  
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: '7d',
  });
};
