<script>
    export let segment;
</script>

<style>
    ul {
        align-items: center;
        display: flex;
        font-size: 1.2em;
        justify-content: space-between;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    li a {
        color: white;
        border-radius: 0.1em;
        display: block;
        margin: 0 0.25em;
        padding: 0.25em 0.5em;
        text-decoration: none;
    }

    li a:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    .active {
        background-color: white !important;
        font-weight: 300;
    }

    .nav--blog .active {
        color: var(--neon_passion_light);
    }

    .nav--dev .active {
        color: var(--burning_sky_dark);
    }

    .nav--design .active {
        color: var(--rainforest_dark);
    }

    .nav--shoot .active {
        color: var(--lagoon_dark);
    }

    .nav--paint .active {
        color: var(--twilight_dark);
    }
</style>

<ul class="nav {segment ? `nav--${segment}` : ''}">
    <li><a rel="prefetch" class:active={segment === 'blog'} href="/blog">blog</a></li>
    <li><a rel="prefetch" class:active={segment === 'dev'} href="/dev">dev</a></li>
    <li><a rel="prefetch" class:active={segment === 'design'} href="/design">design</a></li>
    <li><a rel="prefetch" class:active={segment === 'shoot'} href="/shoot">shoot</a></li>
    <li><a rel="prefetch" class:active={segment === 'paint'} href="/paint">paint</a></li>
</ul>
