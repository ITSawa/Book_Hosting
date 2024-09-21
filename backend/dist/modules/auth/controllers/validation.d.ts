import { jwtUserPayload } from '../@types/validation.types';
import { StatusError } from '../models/errors.models';
import type { RegistrationUser, LoginUser } from '../@types/user.types';
declare function validateUserPayload(payload: jwtUserPayload): void | StatusError;
declare function validateLoginData(loginData: LoginUser): void | StatusError;
declare function validateRegistrationData(registrationData: RegistrationUser): void | StatusError;
export declare const validation: {
    validateUserPayload: typeof validateUserPayload;
    validateLoginData: typeof validateLoginData;
    validateRegistrationData: typeof validateRegistrationData;
};
export {};
//# sourceMappingURL=validation.d.ts.map