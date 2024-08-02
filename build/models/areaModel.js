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
exports.Area = void 0;
const typeorm_1 = require("typeorm");
const equipoModel_1 = require("./equipoModel");
const class_validator_1 = require("class-validator");
let Area = class Area extends typeorm_1.BaseEntity {
};
exports.Area = Area;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'codigo' }),
    __metadata("design:type", Number)
], Area.prototype, "codigo", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 100 }),
    (0, class_validator_1.Length)(3, 50, { message: "El nombre del area debe tener entre 3 y 50 caracteres" }),
    __metadata("design:type", String)
], Area.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 100 }),
    (0, class_validator_1.Length)(4, 50, { message: "El nombre debe tener entre 4 y 50 caracteres" }),
    __metadata("design:type", String)
], Area.prototype, "zona", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 100 }),
    __metadata("design:type", String)
], Area.prototype, "coordenadas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => equipoModel_1.Equipo, (equipo) => equipo.area),
    __metadata("design:type", Array)
], Area.prototype, "equipos", void 0);
exports.Area = Area = __decorate([
    (0, typeorm_1.Entity)('areas')
], Area);
