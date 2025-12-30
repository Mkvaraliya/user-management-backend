import { ZodError } from "zod";

const validate = (schema) => (req, res, next) => {
  try {
    // ✅ Add validation check for schema
    if (!schema || typeof schema.safeParse !== 'function') {
      console.error('Invalid schema passed to validate middleware');
      return res.status(500).json({
        success: false,
        message: "Server configuration error"
      });
    }

    const parsed = schema.safeParse(req.body);
    
    if (!parsed.success) {
      // Console log the validation errors
      console.error('Validation Error:', {
        path: req.path,
        method: req.method,
        body: req.body,
        error: parsed.error
      });
      
      // ✅ Handle both ZodError format and other formats
      let errors = [];
      
      if (parsed.error instanceof ZodError) {
        errors = parsed.error.errors.map(err => ({
          field: err.path.join('.') || 'unknown',
          message: err.message
        }));
      } else if (parsed.error?.errors) {
        errors = parsed.error.errors.map(err => ({
          field: err.path?.join('.') || 'unknown',
          message: err.message || 'Validation failed'
        }));
      } else {
        // Fallback for unexpected error format
        errors = [{
          field: 'unknown',
          message: parsed.error?.message || 'Validation failed'
        }];
      }
      
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors
      });
    }
    
    req.body = parsed.data; 
    next();
  } catch (error) {
    // Console log unexpected errors
    console.error('Unexpected validation middleware error:', error);
    
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export default validate;