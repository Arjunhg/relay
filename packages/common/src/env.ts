import type { ZodObject, ZodRawShape } from "zod";

// ZodRawShape(is just a TypeScript type alias, not a class): Type for the object shape passed into z.object()
// ZodObject(is a class (and a TypeScript type)): The schema instance returned by z.object(), which provides methods like parse, safeParse, extend, etc.

interface EnvOptions {
  source?: NodeJS.ProcessEnv;
  serviceName?: string;
}

type SchemaOutput<TSchema extends ZodRawShape> = ZodObject<TSchema>["_output"];

export const createEnv = <TSchema extends ZodRawShape>(
  schema: ZodObject<TSchema>,
  options: EnvOptions = {}
): SchemaOutput<TSchema> => {
  const { source = process.env, serviceName = "service" } = options;

  const parsed = schema.safeParse(source);

  if (!parsed.success) {
    const formatedErrors = parsed.error.format();
    throw new Error(
      `[${serviceName}] Environment variable validation failed: ${JSON.stringify(formatedErrors)}`
    );
  }

  return parsed.data;
};

export type EnvSchema<TShape extends ZodRawShape> = ZodObject<TShape>;