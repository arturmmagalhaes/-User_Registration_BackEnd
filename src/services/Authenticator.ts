import jwt from 'jsonwebtoken';

export class Authenticator {
    public async generateToken(data: any): Promise<any>{
        const token = await jwt.sign(
            {id: data.id},
            process.env.JWT_KEY as string,
            {expiresIn: '1d'}
        );

        return token
    }

    public async getData(token: string) {
        const payload = await jwt.verify(token, process.env.JWT_KEY as string) as any;
        
        return payload.id;
    }
}