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
exports.modificarSalarioRol = exports.crearRol = exports.getRolPorId = exports.getRoles = void 0;
const database_1 = require("../database");
const getRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.pool.query('SELECT * FROM rol');
    return res.json(response.rows);
});
exports.getRoles = getRoles;
const getRolPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const response = yield database_1.pool.query('SELECT * FROM rol where id = $1', [id]);
    return res.json(response.rows);
});
exports.getRolPorId = getRolPorId;
const crearRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nombre = req.body.nombre;
    const salario = req.body.salario;
    if (salario > 0) {
        yield database_1.pool.query('INSERT INTO rol ( nombre, salario ) VALUES ($1, $2)', [nombre, salario]);
        return res.json({ 'Estado': 'Rol creado' });
    }
    else {
        return res.json({ 'Estado': 'Rol no creado, salario invalido' });
    }
});
exports.crearRol = crearRol;
const modificarSalarioRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    const salario = req.body.salario;
    if (esSalarioValido(salario)) {
        yield database_1.pool.query('UPDATE TABLE rol SET salario = $2 where id = $1;', [id, salario]);
        return res.json({ 'Estado': 'Salario del rol modificado' });
    }
    else {
        return res.json({ 'Estado': 'Rol no modificado, salario invalido' });
    }
});
exports.modificarSalarioRol = modificarSalarioRol;
function esSalarioValido(sal) {
    var esValido = false;
    if (sal > 0) {
        esValido = true;
    }
    return esValido;
}
