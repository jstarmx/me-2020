<script>
    import { lightbox } from '../stores.js';

    const setLightbox = event => {
        event.preventDefault();
        lightbox.set(event.target.href);
    };
</script>

<style>
    div {
        margin-top: 2em;
        padding: 0 2em;
    }

    @media (min-width: 40em) {
        div {
            margin-top: 0;
        }
    }

    ul {
        display: flex;
        flex-wrap: wrap;
        margin: 0 0 3em;
        padding: 0;
    }

    li {
        background-size: cover;
        list-style: none;
        margin: 1%;
        padding: 0;
        width: 98%;
    }

    @media (min-width: 40em) {
        li {
            width: 48%;
        }
    }

    @media (min-width: 50em) {
        li {
            width: 31.33%;
        }
    }

    a {
        border: 0.3em solid white;
        display: block;
        padding-bottom: 60%;
    }

    span {
        opacity: 0;
        position: absolute;
    }
</style>

<svelte:head>
    <title>design | js</title>
</svelte:head>
<div>
    <section>
        <ul>
            <li style="background-image:url('/images/galleries/paint/mother.jpg');">
                <a
                    on:click={setLightbox}
                    href="/images/galleries/paint/mother.jpg"
                    rel="noopener noreferrer"
                    target="_blank">
                    <span>Mother</span>
                </a>
            </li>
            <li style="background-image:url('/images/galleries/paint/robot.jpg');">
                <a
                    on:click={setLightbox}
                    href="/images/galleries/paint/robot.jpg"
                    rel="noopener noreferrer"
                    target="_blank">
                    <span>Robot in a Cemetery of Wrecks</span>
                </a>
            </li>
            <li style="background-image:url('/images/galleries/paint/ld1.jpg');">
                <a
                    on:click={setLightbox}
                    href="/images/galleries/paint/ld1.jpg"
                    rel="noopener noreferrer"
                    target="_blank">
                    <span>Life &amp; Decay 1</span>
                </a>
            </li>
            <li style="background-image:url('/images/galleries/paint/ld2.jpg');">
                <a
                    on:click={setLightbox}
                    href="/images/galleries/paint/ld2.jpg"
                    rel="noopener noreferrer"
                    target="_blank">
                    <span>Life &amp; Decay 2</span>
                </a>
            </li>
            <li style="background-image:url('/images/galleries/paint/ld3.jpg');">
                <a
                    on:click={setLightbox}
                    href="/images/galleries/paint/ld3.jpg"
                    rel="noopener noreferrer"
                    target="_blank">
                    <span>Life &amp; Decay 3</span>
                </a>
            </li>
            <li style="background-image:url('/images/galleries/paint/ld4.jpg');">
                <a
                    on:click={setLightbox}
                    href="/images/galleries/paint/ld4.jpg"
                    rel="noopener noreferrer"
                    target="_blank">
                    <span>Life &amp; Decay 4</span>
                </a>
            </li>
        </ul>
    </section>
</div>
