import path from "path";
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
	role: z.enum(['user', 'admin'], {
		errorMap: () => {
			return { message: `Informe 'admin' ou 'user'` }
		}
	}),
}).refine((data) => data.password === data.confirmPassword, {
	message: "Passwords don't match",
	path: ["confirmPassword"],
})

export type registerSchema = z.infer<typeof registerSchema>;


/* Produtos Schema */

export const productSchema  = z.object({
	sabor: z.string().min(3, 'Informe o nome do produto min 3 caracteres'),
	price: z.number().positive(),
	description: z.string(),

})

export type productSchema = z.infer<typeof productSchema>;


/* Orders Schema */

export const ordersSchema = z.object({
	comprador: z.string().email('Por favor, informe o comprador'),
	sabor: z.string().min(5, 'Informe o sabor'),
	preco: z.number(),
	qnt: z.number(),
	descricao: z.string().optional(),
	total: z.number().optional(), // torna o campo total opcional
  }).refine((data) => {
	if (!data.preco || !data.qnt) {
	  return true; // se o preço ou a quantidade não foram fornecidos, não calcula o total
	}
	data.total = data.preco * data.qnt; // calcula o total
	return true;
  });



export type ordersSchema = z.infer<typeof loginSchema>;
