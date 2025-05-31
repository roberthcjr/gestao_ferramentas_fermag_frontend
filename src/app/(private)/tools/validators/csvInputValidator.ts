import { z } from "zod";

const MB_RATIO = 1024 * 1024;
const MAX_FILE_SIZE = 5 * MB_RATIO;
const ACCEPTED_MIME_TYPES = ["text/csv"];

export const csvSchema = z.object({
  csv: z
    .any()
    .refine(
      (file) => file?.size <= MAX_FILE_SIZE,
      `O arquivo deve ter até ${MAX_FILE_SIZE / MB_RATIO}MB.`,
    )
    .refine(
      (file) => ACCEPTED_MIME_TYPES.includes(file?.type),
      `Apenas arquivos no formato ${ACCEPTED_MIME_TYPES.join(
        ",",
      )} são suportados.`,
    ),
});
