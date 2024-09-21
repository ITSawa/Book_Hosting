import { v4 as uuidv4 } from 'uuid';

export function genUUIDUrlForBook(): string {
    return uuidv4();
}