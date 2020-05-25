import posts from './_posts';

const contents = JSON.stringify(
    posts.map(({ title, slug, intro, wip }) => {
        return {
            title,
            slug,
            intro,
            wip,
        };
    }),
);

export function get(req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json',
    });

    res.end(contents);
}
