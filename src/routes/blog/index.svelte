<script context="module">
    export function preload() {
        return this.fetch('blog.json')
            .then(r => r.json())
            .then(posts => ({ posts }));
    }
</script>

<script>
    export let posts;
</script>

<style>
    div {
        margin: 0 auto;
        max-width: 45em;
    }

    h2 {
        font-size: 2em;
        font-weight: 100;
        line-height: 1.2;
        margin: 0.5em 0;
    }

    h2 a {
        color: white;
        background-color: rgba(255, 255, 255, 0.15);
        padding: 0.25em 0.5em;
    }

    h2 a:hover {
        color: var(--burning_sky_dark);
        background-color: white;
    }
</style>

<svelte:head>
    <title>Blog</title>
</svelte:head>

<div>
    {#each posts as post}
        <h2>
            <a rel="prefetch" href="blog/{post.slug}">{post.title}</a>
        </h2>
        <p>{@html post.intro}</p>
    {/each}
</div>
