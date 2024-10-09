import { ZodError, ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        if(error instanceof ZodError){
            res.status(400).json({
                message: "Validation failed",
                errors: error.errors,
            })
        }
        else{
            next(error);
        }
    }
}