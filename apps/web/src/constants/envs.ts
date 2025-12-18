import { z } from "zod";

const zodSchema = z.object({
  VITE_ENVIROMENT: z.enum(["development", "production", "test"]).default("development"),
  VITE_API_ROUTE: z.string(),
  VITE_PORT: z.coerce.number().default(5173),
  VITE_API_WS_ROUTE: z.string(),
})

const _env = zodSchema.safeParse(import.meta.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

const env = _env.data

export default env