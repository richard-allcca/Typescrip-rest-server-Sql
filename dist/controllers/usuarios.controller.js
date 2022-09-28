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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_model_1.default.findAll();
    res.json({
        ok: true,
        msg: "Lista de usuarios",
        usuarios,
    });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_model_1.default.findByPk(id);
    if (!usuario) {
        return res.status(404).json({
            ok: false,
            msg: `No existe el usuario con el id: ${id}`,
        });
    }
    res.json({
        ok: true,
        msg: "Usuario",
        usuario,
    });
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const isEmail = yield usuario_model_1.default.findOne({
            where: {
                email: body.email,
            },
        });
        if (isEmail) {
            return res.status(400).json({
                ok: false,
                msg: `El email ${body.email} ya existe`,
            });
        }
        const usuario = usuario_model_1.default.build(body);
        yield usuario.save();
        res.json({
            ok: true,
            msg: "Usuario Guardado",
            usuario,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj: "Hable con el Administrador",
        });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const isUsuario = yield usuario_model_1.default.findByPk(id);
        if (!isUsuario) {
            return res.status(400).json({
                ok: false,
                msg: `El usuario con el id: ${id} no existe`,
            });
        }
        yield usuario_model_1.default.update(body, {
            where: {
                id,
            },
        });
        res.json({
            ok: true,
            msg: "Usuario Actualizado",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj: "Hable con el Administrador",
        });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_model_1.default.findByPk(id);
    if (!usuario) {
        return res.status(400).json({
            ok: false,
            msg: `El usuario con el id ${id} no existe`,
        });
    }
    // NOTE - Para Eliminación fisica
    // await usuario.destroy();
    yield usuario.update({ estado: false });
    res.json({
        ok: true,
        msg: "Usuario Eliminado (camibio de estado)",
        id,
    });
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.controller.js.map