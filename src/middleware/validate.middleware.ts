import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

import { ValidateError } from '../apperrors/apperrors';

export const validate = (
    schema: z.ZodObject<any>
)   => (
    req: Request,
    _res: Response,
    next: NextFunction
) : void => {

    const validation = schema.safeParse(req.body);

    if (!validation.success) {
        next(
            new ValidateError(
                "Validation failed",
                validation.error.issues
            )
        );
        return;
    }

  req.body = validation.data

  next();
};
