export declare class Books {
    id: number;
    name: string;
    description: string;
    authorId: number;
    authorName: string;
    authorDescription: string;
    bookPrice: number;
    onlySubscribers: boolean;
    pagesCount: number;
    createdAt: Date;
    updatedAt: Date;
    constructor(name: string, description: string, authorId: number, authorName: string, authorDescription: string, bookPrice: number, onlySubscribers: boolean, pagesCount: number);
    validate(): void;
}
//# sourceMappingURL=Books.d.ts.map