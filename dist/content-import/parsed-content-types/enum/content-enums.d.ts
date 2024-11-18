export declare enum ContentType {
    "LATEX_INLINE" = 0,
    "LATEX_BLOCK" = 1,
    "MARKDOWN" = 2
}
export declare enum ContentProperties {
    "HAS_NEWLINE" = 0,
    "HAS_TEX" = 1,
    "HAS_BEGINNING_BLOCK" = 2,
    "HAS_ENDING_BLOCK" = 3,
    "HAS_BLOCK_ONLY_CONTENT" = 4
}
export type ContentPropertyPayload = {
    [key in ContentProperties]?: string;
};
