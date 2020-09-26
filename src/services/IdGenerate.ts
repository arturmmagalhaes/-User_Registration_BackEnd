import { v4 } from 'uuid';

export class IdGenerate {
    public generate() {
        return v4();
    }
}