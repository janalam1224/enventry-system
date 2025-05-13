const z = require('zod');

exports.loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(5).max(20)
});