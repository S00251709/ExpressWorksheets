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

    const validation = schema.safeParse({
        body: req.body,
        params: req.params,
        query: req.query
    });

    if (!validation.success) {
        next(
            new ValidateError(
                "Validation failed",
                validation.error.issues
            )
        );
        return;
    }

  if (validation.data.body !== undefined) {
    req.body = validation.data.body;
}
  next();
};
