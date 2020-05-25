import fs from 'fs';
import path from 'path';
import marked from 'marked';

const cwd = process.cwd();
const POSTS_DIR = path.join(cwd, 'src/routes/blog/posts');

const posts = fs.readdirSync(POSTS_DIR);

export default posts.map((post) => {
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
});
