const cookieOptionsAbstract = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    sameSite: 'strict' as 'strict',
    maxAge: 0
};

const cookieRefreshOptions = {
    ...cookieOptionsAbstract,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
}

const cookieAccessOptions = {
    ...cookieOptionsAbstract,
    maxAge:  30 * 60 * 1000 // 30 minutes
}

export {
    cookieRefreshOptions,
    cookieAccessOptions
}