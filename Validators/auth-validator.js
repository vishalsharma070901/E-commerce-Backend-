const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email" })
    .max(255, { message: "Name must not be more than 255 character" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password should be atleast of 6 character" })
    .max(255, { message: "Name must not be more than 255 character" }),
});

const signupScheme = loginSchema.extend({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name should be atleast of 3 character" })
    .max(255, { message: "Name must not be more than 255 character" }),

  phone: z
    .string({ required_error: "Phone Number  is required" })
    .trim()
    .min(10, { message: "Phone number should be atleast of 10 character" })
    .max(10, { message: "Phone number  must not be more than 10 character" }),
});

module.exports = { signupScheme, loginSchema };
