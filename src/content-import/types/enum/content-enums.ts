export enum ContentType {
  "LATEX_INLINE",
  "LATEX_BLOCK",
  "MARKDOWN",
}

export enum ContentProperties {
  "HAS_NEWLINE",
  "HAS_TEX",
  "HAS_BEGINNING_BLOCK",
  "HAS_ENDING_BLOCK",
}
export type ContentPropertyPayload = { [key in ContentProperties]?: string };
