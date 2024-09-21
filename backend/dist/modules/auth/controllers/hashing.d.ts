declare function hashPassword(password: string): Promise<string>;
declare function comparePassword(password: string, hashedPassword: string): Promise<boolean>;
export { hashPassword, comparePassword };
//# sourceMappingURL=hashing.d.ts.map