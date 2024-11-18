import { ContentProperties, ContentType } from '../enum/content-enums';
import { createParsedContent } from '../parsed-content.factory';
import { MarkdownContent } from './markdown.impl';

describe('MarkdownContent', () => {
    const getMarkdown = (content: string, properties: ContentProperties[]) => createParsedContent({
        contentType: ContentType.MARKDOWN,
        content: content,
        properties: properties,
      }) as MarkdownContent
  it('contentType이 MARKDOWN이어야 한다', () => {
    const markdown = getMarkdown('# Header\n\nThis is *markdown* content', []);
    expect(markdown.contentType).toBe(ContentType.MARKDOWN);
  });

  it('원본 콘텐츠를 그대로 반환해야 한다', () => {
    const content = '# Header\n\nThis is *markdown* content';
    const markdown = getMarkdown(content, []);

    expect(markdown.getWrappedContent()).toBe(content);
  });
}); 