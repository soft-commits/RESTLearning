import type { NextFunction, Request, Response } from "express";
declare const validateJwt: (roleToValidate?: String) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export default validateJwt;
//# sourceMappingURL=validatejwt.d.ts.map