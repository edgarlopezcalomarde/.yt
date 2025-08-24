import { requireEnv } from "../utils/require-env"

export const env = {
    PORT: requireEnv("PORT")
}

export type Env = typeof env