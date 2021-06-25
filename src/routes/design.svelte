<script>
    import { lightbox } from '../stores';

    const setLightbox = (event) => {
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

    h2 {
        font-size: 2em;
        font-weight: 100;
        line-height: 1.2;
        margin: 0.5em 1%;
    }

    @media (min-width: 40em) {
        h2 {
            letter-spacing: 0.1em;
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
        <h2>Omex</h2>
        <ul>
            <li
                style="background-image:url('/images/galleries/design/omex1.jpg?nf_resize=fit&w=500');"
            >
                <a
                    on:click={setLightbox}
                    href="/images/galleries/design/omex1.jpg"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <span>desktop</span>
                </a>
            </li>
            <li
                style="background-image:url('/images/galleries/design/omex2.jpg?nf_resize=fit&w=500');"
            >
                <a
                    on:click={setLightbox}
                    href="/images/galleries/design/omex2.jpg"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <span>mobile</span>
                </a>
            </li>
        </ul>
    </section>
    <section>
        <h2>Agency concept</h2>
        <ul>
            <li
                style="background-image:url('/images/galleries/design/zencreate1.jpg?nf_resize=fit&w=500');"
            >
                <a
                    on:click={setLightbox}
                    href="/images/galleries/design/zencreate1.jpg"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <span>homepage</span>
                </a>
            </li>
            <li
                style="background-image:url('/images/galleries/design/zencreate3.jpg?nf_resize=fit&w=500');"
            >
                <a
                    on:click={setLightbox}
                    href="/images/galleries/design/zencreate3.jpg"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <span>services</span>
                </a>
            </li>
            <li
                style="background-image:url('/images/galleries/design/zencreate4.jpg?nf_resize=fit&w=500');"
            >
                <a
                    on:click={setLightbox}
                    href="/images/galleries/design/zencreate4.jpg"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <span>contact</span>
                </a>
            </li>
        </ul>
    </section>
    <section>
        <h2>Jump Nation</h2>
        <ul>
            <li
                style="background-image:url('/images/galleries/design/jump1.jpg?nf_resize=fit&w=500');"
            >
                <a
                    on:click={setLightbox}
                    href="/images/galleries/design/jump1.jpg"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <span>homepage</span>
                </a>
            </li>
            <li
                style="background-image:url('/images/galleries/design/jump2.jpg?nf_resize=fit&w=500');"
            >
                <a
                    on:click={setLightbox}
                    href="/images/galleries/design/jump2.jpg"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <span>booking page</span>
                </a>
            </li>
        </ul>
    </section>
    <section>
        <h2>Barton Kendal</h2>
        <ul>
            <li
                style="background-image:url('/images/galleries/design/barton1.jpg?nf_resize=fit&w=500');"
            >
                <a
                    on:click={setLightbox}
                    href="/images/galleries/design/barton1.jpg"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <span>homepage</span>
                </a>
            </li>
            <li
                style="background-image:url('/images/galleries/design/barton2.jpg?nf_resize=fit&w=500');"
            >
                <a
                    on:click={setLightbox}
                    href="/images/galleries/design/barton2.jpg"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <span>house detail</span>
                </a>
            </li>
            <li
                style="background-image:url('/images/galleries/design/barton3.jpg?nf_resize=fit&w=500');"
            >
                <a
                    on:click={setLightbox}
                    href="/images/galleries/design/barton3.jpg"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <span>mobile</span>
                </a>
            </li>
        </ul>
    </section>
    <section>
        <h2>Ella &amp; Me</h2>
        <ul>
            <li
                style="background-image:url('/images/galleries/design/ella1.jpg?nf_resize=fit&w=500');"
            >
                <a
                    on:click={setLightbox}
                    href="/images/galleries/design/ella1.jpg"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <span>desktop</span>
                </a>
            </li>
            <li
                style="background-image:url('/images/galleries/design/ella2.jpg?nf_resize=fit&w=500');"
            >
                <a
                    on:click={setLightbox}
                    href="/images/galleries/design/ella2.jpg"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <span>mobile</span>
                </a>
            </li>
        </ul>
    </section>
    <section>
        <h2>Burston Garden Centre</h2>
        <ul>
            <li
                style="background-image:url('/images/galleries/design/burston.jpg?nf_resize=fit&w=500');"
            >
                <a
                    on:click={setLightbox}
                    href="/images/galleries/design/burston.jpg"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <span>homepage</span>
                </a>
            </li>
        </ul>
    </section>
    <section>
        <h2>Rochdale Sixth Form College</h2>
        <ul>
            <li
                style="background-image:url('/images/galleries/design/rsfc1.png?nf_resize=fit&w=500');"
            >
                <a
                    on:click={setLightbox}
                    href="/images/galleries/design/rsfc1.png"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <span>homepage</span>
                </a>
            </li>
            <li
                style="background-image:url('/images/galleries/design/rsfc2.png?nf_resize=fit&w=500');"
            >
                <a
                    on:click={setLightbox}
                    href="/images/galleries/design/rsfc2.png"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <span>content page</span>
                </a>
            </li>
        </ul>
    </section>
</div>
