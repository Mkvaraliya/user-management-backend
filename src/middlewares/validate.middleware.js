import { ZodError } from "zod";

const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.safeParse(req.body);
    
    if (!parsed.success) {
      const errors = parsed.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));
      
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors
      });
    }
    
    req.body = parsed.data; 
    next();
  } catch (error) {
    next(error);
  }
};

export default validate;

