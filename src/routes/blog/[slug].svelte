<script context="module">
    export async function preload({ params }) {
        // the `slug` parameter is available because
        // this file is called [slug].svelte
        const res = await this.fetch(`blog/${params.slug}.json`);
        const data = await res.json();

        if (res.status === 200) {
            return { post: data };
        }
        return this.error(res.status, data.message);
    }
</script>

<script>
    export let post;
</script>

<style>
    h1 {
        font-size: 3em;
        font-weight: 100;
        line-height: 1.1em;
        margin-top: 0;
    }

    .blog {
        margin: 0 auto;
        max-width: 45em;
    }

    .blog :global(a) {
        color: white;
        background-color: rgba(255, 255, 255, 0.15);
        padding: 0 0.25em;
    }

    .blog :global(a:hover) {
        color: var(--burning_sky_dark);
        background-color: white;
    }

    .blog :global(h2) {
        border-bottom: 1px solid rgba(255, 255, 255, 0.25);
        font-size: 2em;
        font-weight: 300;
        line-height: 1.3em;
    }

    .blog :global(img) {
        border: 0.5em solid rgba(255, 255, 255, 0.15);
        max-width: 100%;
    }

    .blog :global(hr) {
        display: none;
    }

    .blog :global(aside) {
        border-left: 1px solid rgba(255, 255, 255, 0.15);
        margin: 2em 0;
        padding-left: 1em;
    }

    @media (min-width: 40em) {
        .blog :global(aside) {
            margin-left: 3em;
        }
    }

    .blog :global(blockquote) {
        border-left: 0.5em solid rgba(0, 0, 0, 0.25);
        margin: 2em 0;
        padding: 0.25em 1em 0.25em 2em;
        font-style: italic;
        background-color: rgba(0, 0, 0, 0.1);
    }

    .blog :global(pre) {
        background-color: #212227;
        border-radius: 0.2em;
        background-clip: padding-box;
        color: #abb2bf;
        margin: 2em 0;
        padding: 1.5em 2em;
        overflow-x: auto;
    }

    .blog :global(code) {
        background-color: rgba(0, 0, 0, 0.15);
        border-radius: 0.2em;
        font-family: 'Roboto Mono', monospace;
        padding: 0 0.25em;
    }

    .blog :global(pre code) {
        background: none;
    }

    .blog :global(.hljs) {
        display: block;
        overflow-x: auto;
        padding: 0.5em;
        color: #adaeb0;
        background: #282c34;
    }

    .blog :global(.hljs-comment),
    .blog :global(.hljs-quote) {
        color: #8aa1cc;
        font-style: italic;
    }

    .blog :global(.hljs-doctag),
    .blog :global(.hljs-formula),
    .blog :global(.hljs-keyword) {
        color: #c678dd;
    }

    .blog :global(.hljs-deletion),
    .blog :global(.hljs-name),
    .blog :global(.hljs-section),
    .blog :global(.hljs-selector-tag),
    .blog :global(.hljs-subst) {
        color: #f46c68;
    }

    .blog :global(.hljs-literal) {
        color: #56b6c2;
    }

    .blog :global(.hljs-addition),
    .blog :global(.hljs-attribute),
    .blog :global(.hljs-meta-string),
    .blog :global(.hljs-regexp),
    .blog :global(.hljs-string) {
        color: #58d0c8;
    }

    .blog :global(.hljs-built_in),
    .blog :global(.hljs-class .hljs-title) {
        color: #c19951;
    }

    .blog :global(.hljs-attr),
    .blog :global(.hljs-number),
    .blog :global(.hljs-selector-attr),
    .blog :global(.hljs-selector-class),
    .blog :global(.hljs-selector-pseudo),
    .blog :global(.hljs-template-variable),
    .blog :global(.hljs-type),
    .blog :global(.hljs-variable) {
        color: #d19a66;
    }

    .blog :global(.hljs-bullet),
    .blog :global(.hljs-link),
    .blog :global(.hljs-meta),
    .blog :global(.hljs-selector-id),
    .blog :global(.hljs-symbol),
    .blog :global(.hljs-title) {
        color: #61aeee;
    }

    .blog :global(.hljs-emphasis) {
        font-style: italic;
    }

    .blog :global(.hljs-strong) {
        font-weight: 700;
    }

    .blog :global(.hljs-link) {
        text-decoration: underline;
    }
</style>

<svelte:head>
    <title>{post.title} | blog | js</title>
</svelte:head>

<div class="blog">
    <h1>{post.title}</h1>

    {@html post.html}
</div>
