import { Request, Response } from "express";
import Usuario from "../models/usuario.model";

export const getUsuarios = async (req: Request, res: Response) => {
   const usuarios = await Usuario.findAll();

   res.json({
      ok: true,
      msg: "Lista de usuarios",
      usuarios,
   });
};

export const getUsuario = async (req: Request, res: Response) => {
   const { id } = req.params;

   const usuario = await Usuario.findByPk(id);

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
};

export const postUsuario = async (req: Request, res: Response) => {
   const { body } = req;

   try {
      const isEmail = await Usuario.findOne({
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

      const usuario = Usuario.build(body);
      await usuario.save();

      res.json({
         ok: true,
         msg: "Usuario Guardado",
         usuario,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msj: "Hable con el Administrador",
      });
   }
};

export const putUsuario = async (req: Request, res: Response) => {
   const { id } = req.params;
   const { body } = req;

   try {
      const isUsuario = await Usuario.findByPk(id);
      if (!isUsuario) {
         return res.status(400).json({
            ok: false,
            msg: `El usuario con el id: ${id} no existe`,
         });
      }

      await Usuario.update(body, {
         where: {
            id,
         },
      });

      res.json({
         ok: true,
         msg: "Usuario Actualizado",
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msj: "Hable con el Administrador",
      });
   }
};

export const deleteUsuario = async (req: Request, res: Response) => {
   const { id } = req.params;

   const usuario = await Usuario.findByPk(id);
   if (!usuario) {
      return res.status(400).json({
         ok: false,
         msg: `El usuario con el id ${id} no existe`,
      });
   }

   // NOTE - Para Eliminación fisica
   // await usuario.destroy();

   await usuario.update({ estado: false });

   res.json({
      ok: true,
      msg: "Usuario Eliminado (camibio de estado)",
      id,
   });
};
