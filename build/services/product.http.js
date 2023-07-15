"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = void 0;
const product_controller_1 = require("../controllers/product.controller");
const getAll = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = (0, product_controller_1.readAllProducts)();
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios.' });
    }
});
exports.getAll = getAll;
