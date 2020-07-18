import fs from 'fs';
import path from 'path';
import marked from 'marked';
import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import javascript from 'highlight.js/lib/languages/javascript';

hljs.registerLanguage('xml', xml);
hljs.registerLanguage('javascript', javascript);

marked.setOptions({
    highlight: (code, language) => {
        const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
        return hljs.highlight(validLanguage, code).value;
    },
});

const { NODE_ENV } = process.env;

const cwd = process.cwd();
const POSTS_DIR = path.join(cwd, 'src/routes/blog/posts');

const posts = fs.readdirSync(POSTS_DIR);

export default posts
    .map((post) => {
        const content = fs.readFileSync(`${POSTS_DIR}/${post}/content.md`);
        const meta = fs.readFileSync(`${POSTS_DIR}/${post}/meta.json`);

        const html = marked(content.toString());

        const intro = html.split('<hr>')[0];

        return {
            ...JSON.parse(meta),
            slug: post,
            html,
            intro,
        };
    })
    .filter((post) => NODE_ENV === 'development' || !post.wip);
