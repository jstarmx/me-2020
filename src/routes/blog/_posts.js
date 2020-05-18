const fs = require('fs');
const path = require('path');

const cwd = process.cwd();
const POSTS_DIR = path.join(cwd, 'src/routes/blog/posts');

const posts = fs.readdirSync(POSTS_DIR);

export default posts.map((post) => {
    const content = fs.readFileSync(`${POSTS_DIR}/${post}/content.html`);
    const meta = fs.readFileSync(`${POSTS_DIR}/${post}/meta.json`);

    return {
        html: content.toString(),
        ...JSON.parse(meta),
    };
});
