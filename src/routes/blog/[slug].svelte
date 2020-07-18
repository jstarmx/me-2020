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
        background-color: rgba(0,0,0,0.15);
        border-radius: 0.2em;
        font-family: 'Roboto Mono', monospace;
        padding: 0 0.25em;
    }

    .blog :global(pre code) {
        background: none;
    }

    .blog :global(aside) {
        border-left: 1px solid rgba(255, 255, 255, 0.15);
        margin: 2em 0 2em 3em;
        padding-left: 1em;
    }

    .blog :global(blockquote) {
        border-left: 0.5em solid rgba(0,0,0,0.25);
        margin: 2em 0;
        padding: 0.25em 1em 0.25em 2em;
        font-style: italic;
        background-color: rgba(0,0,0,0.1);
    }
</style>

<svelte:head>
    <title>{post.title}</title>
</svelte:head>

<div class="blog">
    <h1>{post.title}</h1>

    {@html post.html}
</div>
