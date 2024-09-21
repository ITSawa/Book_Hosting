export type jwtUserPayload = {
    id: string | number;
    name: string;
    email: string;
    role: string;
};
export type UserData = {
    user: {
        name: string;
        email: string;
    };
    access_token: string;
    refresh_token: string;
};
//# sourceMappingURL=validation.types.d.ts.map