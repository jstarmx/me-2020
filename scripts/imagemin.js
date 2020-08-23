/* eslint-disable no-console */

const path = require('path');
const imagemin = require('imagemin');
const webp = require('imagemin-webp');

const dir = path.resolve(
    __dirname,
    '../__sapper__/export/images/blog/how-a-browser-renders-a-web-page',
);

(async () => {
    try {
        const files = await imagemin([`${dir}/*.png`], {
            destination: dir,
            plugins: [webp()],
        });

        console.log(files);
    } catch (err) {
        console.error('Error converting images to webp format', err);
    }
})();
