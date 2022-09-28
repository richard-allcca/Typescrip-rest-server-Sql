import { Request, Response } from "express";

export const getUsuarios = (req: Request, res: Response) => {
   res.json({
      ok: true,
      msg: "getUsuarios",
   });
};

export const getUsuario = (req: Request, res: Response) => {
   const { id } = req.params;

   res.json({
      ok: true,
      msg: "getUsuario",
      id,
   });
};

export const postUsuario = (req: Request, res: Response) => {
   const { body } = req;

   res.json({
      ok: true,
      msg: "postUsuario",
      body,
   });
};

export const putUsuario = (req: Request, res: Response) => {
   const { id } = req.params;
   const { body } = req;

   res.json({
      ok: true,
      msg: "putUsuario",
      body,
      id
   });
};

export  const deleteUsuario = (req: Request, res: Response) => {

   const {id} = req.params

   res.json({
      ok: true,
      msg: 'deleteUsuario',
      id
   })
}