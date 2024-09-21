import { Books } from "../../../inits/pg/dbmodels/Books";
import { StatusError } from "../../../inits/answers/errorStatus";
import { jwtUserPayload } from "../@types/validation.types";

export function validateJwtPayload (payload: jwtUserPayload): void | StatusError {
    if (!payload || typeof payload !== 'object' || Object.keys(payload).length === 0) {
        throw new StatusError('Invalid payload', 400);
    }

    if (payload.role !== 'admin' && payload.role !== 'client') {
        throw new StatusError('Invalid role', 400);
    }

    if (!payload.email || typeof payload.email !== 'string') {
        throw new StatusError('Invalid email', 400);
    }

    if (!payload.name || typeof payload.name !== 'string') {
        throw new StatusError('Invalid name', 400);
    }

    if (!payload.id || typeof payload.id !== 'number') {
        throw new StatusError('Invalid id', 400);
    }
}