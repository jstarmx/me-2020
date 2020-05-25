import posts from './_posts';

const contents = JSON.stringify(
    posts.map(({ title, slug, intro }) => {
        return {
            title,
            slug,
            intro,
        };
    }),
);

export function get(req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json',
    });

    res.end(contents);
}
