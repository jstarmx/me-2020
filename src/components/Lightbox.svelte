<script>
    import { lightbox } from '../stores.js';

    let imageSource;

    const unsubscribe = lightbox.subscribe(value => {
        imageSource = value;
    });

    const reset = () => lightbox.set('');
</script>

<style>
    div {
        background-color: rgba(0, 0, 0, 0.9);
        border: 0;
        bottom: 0;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
        width: 100%;
        z-index: 100;
    }
    .image {
        border: 0.5em solid white;
        bottom: 0;
        box-shadow: 0 0.2em 0.2em 0.1em rgba(0, 0, 0, 0.15);
        display: block;
        left: 0;
        margin: auto;
        max-height: 90%;
        max-width: 90%;
        position: absolute;
        right: 0;
        top: 0;
    }

    .close {
        cursor: pointer;
        opacity: 0.75;
        position: absolute;
        right: 0.5em;
        top: 0.5em;
    }
    .close:hover {
        opacity: 1;
    }
</style>

{#if imageSource}
    <div>
        <img src="/images/x.svg" class="close" alt="close" on:click={reset} />
        <img src={imageSource} class="image" alt="" role="presentation" />
    </div>
{/if}
