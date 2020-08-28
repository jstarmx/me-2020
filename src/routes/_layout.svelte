<script>
    import Lightbox from '../components/Lightbox.svelte';
    import Nav from '../components/Nav.svelte';
    import SocialLinks from '../components/SocialLinks.svelte';

    export let segment;
</script>

<style>
    :root {
        /* Colours */
        --neon_passion_light: #d4224f;
        --neon_passion_dark: #91186b;
        --burning_sky_light: #db510a;
        --burning_sky_dark: #a40b0b;
        --rainforest_light: #b3da48;
        --rainforest_dark: #388827;
        --lagoon_light: #1aa0d1;
        --lagoon_dark: #284e98;
        --sunflower_light: #efc440;
        --sunflower_dark: #f78c1c;
    }

    .container {
        background: var(--neon_passion_dark);
        background: linear-gradient(120deg, var(--neon_passion_light), var(--neon_passion_dark));
        color: white;
        display: flex;
        flex-direction: column;
        font-family: 'Roboto', sans-serif;
        font-weight: 300;
        flex-grow: 1;
        line-height: 1.8;
        max-width: 100%;
    }

    .container--dev {
        background: var(--burning_sky_dark);
        background: linear-gradient(120deg, var(--burning_sky_light), var(--burning_sky_dark));
    }

    .container--design {
        background: var(--lagoon_dark);
        background: linear-gradient(120deg, var(--lagoon_light), var(--lagoon_dark));
    }

    .container--shoot {
        background: var(--rainforest_dark);
        background: linear-gradient(120deg, var(--rainforest_light), var(--rainforest_dark));
    }

    .container--paint {
        background: var(--sunflower_dark);
        background: linear-gradient(120deg, var(--sunflower_light), var(--sunflower_dark));
    }

    @media (min-width: 40em) {
        .container {
            font-size: 1.15em;
            letter-spacing: 0.05em;
        }
    }

    header {
        align-items: center;
        border-bottom: 1px solid rgba(255, 255, 255, 0.25);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 2em;
        padding: 1em 0;
        width: 100%;
    }

    @media (min-width: 40em) {
        header {
            flex-direction: row;
            margin-bottom: 3em;
            padding: 1em 2em;
        }
    }

    img {
        height: 5em;
        transition: transform 100ms linear;
    }

    img:hover {
        transform: scale(1.1);
    }

    main {
        padding: 0 1em 2em;
        width: 100%;
    }

    footer {
        border-top: 1px solid rgba(255, 255, 255, 0.25);
        margin-top: auto;
        padding: 1em 0;
    }
</style>

<div class="container {segment ? `container--${segment}` : ''}">
    <header>
        <a href="/">
            <img src="images/logo.svg" alt="Logo" />
        </a>
        <nav>
            <Nav {segment} />
        </nav>
    </header>
    <main>
        <slot />
    </main>
    <footer>
        <SocialLinks />
    </footer>
    <Lightbox />
</div>
