"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const departamentos_1 = __importDefault(require("./routes/departamentos"));
const roles_1 = __importDefault(require("./routes/roles"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(departamentos_1.default);
app.use(roles_1.default);
app.listen(process.env.PORT, () => {
    console.log('Server running: ', process.env.PORT);
});
