import { ContentProperties, ContentType } from '../enum/content-enums';
import { LaTeXBlockContent } from './latex-block.impl';
import { createParsedContent } from '../parsed-content.factory';

describe('LaTeXInlineContent', () => {
    const getLatexInline = (content: string, properties: ContentProperties[]) => createParsedContent({
        contentType: ContentType.LATEX_INLINE,
        content: content,
        properties: properties,
      }) as LaTeXBlockContent
  it('contentType이 LATEX_INLINE이어야 한다', () => {
    const latexInline = getLatexInline('가나다', []);
    expect(latexInline.getContentType()).toBe(ContentType.LATEX_INLINE);
  });

  it('# 이후의 내용을 $로 감싸야 한다', () => {
    const latexInline = getLatexInline('some text # x^2 + y^2', []);
    expect(latexInline.getWrappedContent()).toBe('$x^2 + y^2$');
  });

  it('# 없는 경우 전체 내용을 $로 감싸야 한다', () => {
    const latexInline = getLatexInline('x^2 + y^2', []);
    expect(latexInline.getWrappedContent()).toBe('$x^2 + y^2$');
  });

  it('앞뒤 공백을 제거하고 $로 감싸야 한다', () => {
    const latexInline = getLatexInline('  x^2 + y^2  ', []);
    expect(latexInline.getWrappedContent()).toBe('$x^2 + y^2$');
  });

  it('# 이후 내용의 앞뒤 공백을 제거하고 $로 감싸야 한다', () => {
    const latexInline = getLatexInline('some text #   x^2 + y^2   ', []);
    expect(latexInline.getWrappedContent()).toBe('$x^2 + y^2$');
  });
}); 