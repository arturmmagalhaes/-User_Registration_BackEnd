import jwt from 'jsonwebtoken';

export class Authenticator {
    public generateToken(data: any): string{
        return jwt.sign(
            data.id,
            process.env.JWT_KEY as string,
            {expiresIn: '2d'}
            )
    }

    public getData(token: string) {
        return jwt.verify(token, process.env.JWT_KEY as string) as any;
    }
}