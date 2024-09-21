export type jwtUserPayload = {
    id: string | number,
    name: string,
    email: string,
    role: string
}

export type UserData = {
    user: {
        name: string,
        email: string
    },
    access_token: string,
    refresh_token: string
}

export type RefreshData = {
    access_token: string;
    user: {
        name: string;
        email: string;
    }
};