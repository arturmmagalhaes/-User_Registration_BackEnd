import bcrypt from 'bcrypt';

export class HashManager {

    public async hash(password: string) {
        const salts = await bcrypt.genSalt(12)
        return await bcrypt.hash(password, salts);
    }

    public async compare(password: string, hash: string){
        return await bcrypt.compare(password, hash);
    }
}