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
exports.crearDepartamento = exports.getDepartamentoPorId = exports.getDepartamentos = void 0;
const database_1 = require("../database");
const getDepartamentos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.pool.query('SELECT * FROM departamento');
    return res.json(response.rows);
});
exports.getDepartamentos = getDepartamentos;
const getDepartamentoPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const response = yield database_1.pool.query('SELECT * FROM departamento where id = $1', [id]);
    return res.json(response.rows);
});
exports.getDepartamentoPorId = getDepartamentoPorId;
const crearDepartamento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nombre = req.body.nombre;
    const response = yield database_1.pool.query('INSERT INTO departamento ( nombre) VALUES ($1)', [nombre]);
    response.rows;
    return res.json({ 'Estado': 'Departamento creado' });
});
exports.crearDepartamento = crearDepartamento;
/*export const getEntriesWithoutSensitiveInfo = (): NonSensitiveInfoDiaryEntry[] => {
    return diaries.map(({id,date,weather, visibility})=>{
        return{
            id, date, weather, visibility
        }
    })
}

export const addDiary = (newDiaryEntry: newDepartamentontry): DepartamentoEntry =>  {
        const newDiary = {
            id: Math.max( ...diaries.map( d => d.id)) + 1,
            ...newDiaryEntry
        }
        diaries.push( newDiary )
        return newDiary
    }
*/ 
