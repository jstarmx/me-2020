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
        font-size: 1.4em;
        font-weight: 500;
    }

    .blog :global(img) {
        border: 8px solid rgba(255, 255, 255, 0.15);
        max-width: 100%;
    }

    .blog :global(hr) {
        display: none;
    }
</style>

<svelte:head>
    <title>{post.title}</title>
</svelte:head>

<div class="blog">
    <h1>{post.title}</h1>

    {@html post.html}
</div>
