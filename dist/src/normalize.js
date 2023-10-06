"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const normalize = (string) => string
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
exports.default = normalize;
