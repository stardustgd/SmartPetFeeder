import * as z from 'zod'

export const RegisterSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'Please enter an email address' })
      .email({
        message: 'Please enter a valid email address',
      }),
    password: z.string().min(1, { message: 'Password is required.' }).min(6, {
      message: 'Password must be at least 6 characters long.',
    }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Please confirm your password.' })
      .min(6, {
        message: 'Password must be at least 6 characters long.',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  })

export const LoginSchema = z.object({
  email: z.string().min(1, { message: 'Please enter an email address' }).email({
    message: 'Please enter a valid email address',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long.',
  }),
})
