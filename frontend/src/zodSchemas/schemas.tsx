import { z } from "zod";

/* Login Schema */
export const loginSchema  = z.object({
	email: z.string().email('Por Favor, informe um email valido'),
	password: z.string().min(5, 'Sua senha tem que ter mais de 5 caracteres'),

})

export type loginSchema = z.infer<typeof loginSchema>;

/* Register Schema */
export const registerSchema  = z.object({
	name: z.string().min(3, 'Seu nome precisa ter 3 ou mais caracteres'),
	email: z.string().email('Por Favor, informe um email valido'),
	password: z.string().min(5, 'Sua senha tem que ter mais de 5 caracteres'),
	confirmPassword: z.string(),
	/* role: z.enum(['user', 'admin'], {  */
	/*  	errorMap: () => {  */
	/*  		return { message: `Informe 'admin' ou 'user'` }  */
	/*  	}  */
	/*  }), */
}).required()
.refine((data) => data.password === data.confirmPassword, {
	message: "Password não esta igual",
	path: ["confirmPassword"],
})

export type typeRegisterSchema = z.infer<typeof registerSchema>;


/* Produtos Schema */

export const productSchema  = z.object({
	name: z.string().min(10, 'Informe o nome do produto min 10 caracteres'),
	description: z.string().min(50, 'Minimo de 100 caracteres').max(255, 'Maximo de 100 caracteres'),

})

export type productSchema = z.infer<typeof productSchema>;
