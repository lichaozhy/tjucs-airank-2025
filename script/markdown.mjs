import MarkdownIt from 'markdown-it';
import markdownItMathTemml from 'markdown-it-math/temml';
import MarkdownItAnchor from 'markdown-it-anchor';
import slugify from '@sindresorhus/slugify';

export const parser = MarkdownIt({ html: true, linkify: true });

parser.use(markdownItMathTemml);
parser.use(MarkdownItAnchor, { slugify: s => slugify(s) });
