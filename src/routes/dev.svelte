<style>
    div {
        margin: 0 auto;
        max-width: 45em;
    }

    ul {
        align-items: center;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        list-style: none;
        margin: 2em 0 0;
        padding: 0;
        text-align: center;
    }

    li {
        flex-basis: 33.33%;
        margin: 1em 0;
    }

    img {
        display: block;
        margin: 0 auto 0.5em;
        opacity: 0.75;
        width: 2.5em;
    }
</style>

<svelte:head>
    <title>dev | js</title>
</svelte:head>
<div>
    <p>
        I'm a front end developer with 10+ years of industry experience, both agency and in-house,
        based in Manchester. My bag is writing readable, reusable and tested HTML, CSS and
        Javascript that serves up highly usable and accessible user interfaces.
    </p>
    <p>
        Having spent a good number of years working as a designer who codes, I have a strong eye for
        visuals and UX that works for users. Now that I'm a full-time coder I can apply that
        background with a strong technical grounding, and I'm constantly striving to learn, improve
        my skill set and keep up-to-date with the latest developments in the industry.
    </p>
    <p>
        I'm a firm believer that ability, enthusiasm and ethos are more important than knowledge of
        particular technologies. Nonetheless, it can admittedly still be important, so here are some
        of my favourites to use at work and at home:
    </p>

    <ul>
        <li><img src="/images/tech-icons/react.svg" alt="" /> React</li>
        <li><img src="/images/tech-icons/jest.svg" alt="" /> Jest</li>
        <li><img src="/images/tech-icons/webpack.svg" alt="" /> Webpack</li>
        <li><img src="/images/tech-icons/nodejs.svg" alt="" /> Node.js</li>
        <li><img src="/images/tech-icons/yarn.svg" alt="" /> Yarn</li>
        <li><img src="/images/tech-icons/git.svg" alt="" /> Git</li>
        <li><img src="/images/tech-icons/html5.svg" alt="" /> HTML5</li>
        <li><img src="/images/tech-icons/sass.svg" alt="" /> Sass</li>
        <li><img src="/images/tech-icons/ruby.svg" alt="" /> Ruby</li>
    </ul>
</div>
