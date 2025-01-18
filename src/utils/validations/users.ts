import { z } from 'zod'

export const signUpSchema = z.object({
  name: z.string().nonempty('Name cannot be empty'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must include an uppercase letter')
    .regex(/[a-z]/, 'Password must include a lowercase letter')
    .regex(/[0-9]/, 'Password must include a number')
})

export type SignUpFormData = z.infer<typeof signUpSchema>

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().nonempty('Password cannot be empty')
})

export type LoginFormData = z.infer<typeof loginSchema>
