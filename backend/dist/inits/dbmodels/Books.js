"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Books = void 0;
const typeorm_1 = require("typeorm");
const errors_models_1 = require("../../modules/auth/models/errors.models");
let Books = class Books {
    constructor(name, description, authorId, authorName, authorDescription, bookPrice, onlySubscribers, pagesCount) {
        this.id = 0;
        this.name = name;
        this.description = description;
        this.authorId = authorId;
        this.authorName = authorName;
        this.authorDescription = authorDescription;
        this.bookPrice = bookPrice;
        this.onlySubscribers = onlySubscribers;
        this.pagesCount = pagesCount;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
    validate() {
        if (this.name === null || this.name === undefined) {
            throw new errors_models_1.StatusError('Name is required', 400);
        }
        if (this.description === null || this.description === undefined) {
            throw new errors_models_1.StatusError('Description is required', 400);
        }
        if (this.authorId === null || this.authorId === undefined) {
            throw new errors_models_1.StatusError('Author id is required', 400);
        }
        if (this.authorName === null || this.authorName === undefined) {
            throw new errors_models_1.StatusError('Author name is required', 400);
        }
        if (this.onlySubscribers === null || this.onlySubscribers === undefined) {
            throw new errors_models_1.StatusError('Only subscribers field is required', 400);
        }
        if (this.pagesCount === null || this.pagesCount === undefined) {
            throw new errors_models_1.StatusError('Pages count is required', 400);
        }
    }
};
exports.Books = Books;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Books.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Books.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Books.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], Books.prototype, "authorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Books.prototype, "authorName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Books.prototype, "authorDescription", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Books.prototype, "bookPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: false }),
    __metadata("design:type", Boolean)
], Books.prototype, "onlySubscribers", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: 0 }),
    __metadata("design:type", Number)
], Books.prototype, "pagesCount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', nullable: false }),
    __metadata("design:type", Date)
], Books.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp', nullable: false }),
    __metadata("design:type", Date)
], Books.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Books.prototype, "validate", null);
exports.Books = Books = __decorate([
    (0, typeorm_1.Entity)({ name: 'books' }),
    __metadata("design:paramtypes", [String, String, Number, String, String, Number, Boolean, Number])
], Books);
