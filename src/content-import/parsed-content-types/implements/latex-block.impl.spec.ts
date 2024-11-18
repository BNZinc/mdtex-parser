import { ContentProperties, ContentType } from '../enum/content-enums';
import { createParsedContent } from '../parsed-content.factory';
import { LaTeXBlockContent } from './latex-block.impl';

describe('LaTeXBlockContent', () => {
    const getLatexBlock = (content: string, properties: ContentProperties[]) => createParsedContent({
        contentType: ContentType.LATEX_BLOCK,
        content: content,
        properties: properties,
      }) as LaTeXBlockContent
  it('contentType이 LATEX_BLOCK이어야 한다', () => {
    const latexBlock = getLatexBlock('x^2 + y^2 = r^2', [ContentProperties.HAS_BEGINNING_BLOCK, ContentProperties.HAS_ENDING_BLOCK]);
    expect(latexBlock.getContentType()).toBe(ContentType.LATEX_BLOCK);
  });

  it('시작과 끝 블록이 모두 있는 경우 $$로 감싸야 한다', () => {
    const latexBlock = getLatexBlock('x^2 + y^2 = r^2', [ContentProperties.HAS_BEGINNING_BLOCK, ContentProperties.HAS_ENDING_BLOCK]);

    expect(latexBlock.getWrappedContent()).toBe('$$x^2 + y^2 = r^2$$');
  });

  it('블록 구분자가 없는 경우 $$를 추가하지 않아야 한다', () => {
    const latexBlock = getLatexBlock('x^2 + y^2 = r^2', []);
    
    expect(latexBlock.getWrappedContent()).toBe('x^2 + y^2 = r^2');
  });
}); 