My thinking: if I'm going to build websites that are fast and reliable, I need to really understand the mechanics of each step a browser goes through to render a web page, so that each can be considered and optimised during development. This post is a summary of my learnings of the end-to-end process at a fairly high level.

A lot of this is based on the fantastic (and FREE!) [Website Performance Optimization](https://www.udacity.com/course/website-performance-optimization--ud884) course by [Ilya Grigorik](https://twitter.com/igrigorik) and [Cameron Pittman](https://twitter.com/cwpittman) on [Udacity](https://www.udacity.com/). I'd highly recommend checking it out.

Also very helpful was the article [How Browsers Work: Behind the scenes of modern web browsers](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/) by [Paul Irish](https://twitter.com/paul_irish) and [Tali Garsiel](http://taligarsiel.com/). It's from 2011 but many of the fundamentals of how browsers work remain relevant at the time of writing this blog post.

---

First, some lingo.

> Parsing?

> Rendering?

Ok, here we go. The process can be broken down into these main stages:

1. [Start to parse the HTML](#1-start-to-parse-the-html)
2. [Fetch external resources](#2-fetch-external-resources)
3. [Parse the CSS and build the CSSOM](#3-parse-the-css-and-build-the-cssom)
4. [Execute the Javascript](#4-execute-the-javascript)
5. [Merge DOM and CSSOM to construct the render tree](#5-merge-dom-and-cssom-to-construct-the-render-tree)
6. [Calculate layout and paint](#6-calculate-layout-and-paint)

## 1. Start to parse the HTML

When the browser begins to receive the HTML data of a page over the network, it immediately sets its parser to work to convert the HTML into a [Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction).

> The Document Object Model (DOM) is the data representation of the objects that comprise the structure and content of a document on the web.

The first step of this parsing process is to break down the HTML into **tokens** that represent **start tags**, **end tags**, and their **contents**. From that it can construct the DOM.

![](/images/blog/how-a-browser-renders-a-web-page/step-1.png)

## 2. Fetch external resources

When the parser comes across an external resource like a CSS or Javascript file, it goes off to fetch those files. The parser will continue as a CSS file is being loaded, although it will **block rendering** until it has been loaded and parsed (more on that in a bit).

Javascript files are a little different - they are blocking by default, meaning that the **parsing of the HTML will pause** whilst the Javascript file is loaded and parsed. There are two attributes that can be added to script tags to mitigate this: `defer` and `async`. Both allow the parser to continue whilst the JavaScript file is loaded in the background, but they operate in different ways.

`defer` means that the execution of the file will be delayed until the parsing of the document is complete. If multiple files have the defer attribute, they will be executed in the order that they were discovered in the HTML.

```html
<script type="text/javascript" src="script.js" defer>
```

`async` means that the file will be executed as soon as it loads, which could be during or after the parsing process, and therefore the order in which async scripts are executed cannot be guaranteed.

```html
<script type="text/javascript" src="script.js" async>
```

<aside>

### Preloading resources

As an aside, modern browsers will continue to scan the HTML whilst blocked and 'look ahead' to what external resources are coming up and then download them speculatively. The manner in which they do this varies between different browsers so cannot be relied upon to behave a certain way. In order to mark a resource as important and therefore more likely to be downloaded early in the rendering process, a link tag with [rel="preload"](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content) can be used.

```html
<link href="style.css" rel="preload" as="style" />
```

</aside>

![](/images/blog/how-a-browser-renders-a-web-page/step-2.png)

## 3. Parse the CSS and build the CSSOM

You may well have heard of the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) before, but have you heard of the [CSSOM (CSS Object Model)](https://developer.mozilla.org/en-US/docs/Glossary/CSSOM)? Before researching this topic, I hadn't!

> The CSS Object Model (CSSOM) is a map of all CSS selectors and relevant properties for each selector in the form of a tree, with a root node, sibling, descendant, child, and other relationship. The CSSOM is very similar to the Document Object Model (DOM). Both of them are part of the critical rendering path which is a series of steps that must happen to properly render a website.
>
> The CSSOM, together with the DOM, to build the render tree, which is in turn used by the browser to layout and paint the web page.

Similar to HTML files and the DOM, when CSS files are loaded they must be parsed and converted to a tree - this time the CSSOM. Where it differs to the DOM is that it cannot be built incrementally due to the way that CSS rules can overwrite each other at various different points. **This is why CSS blocks rendering**, as until all CSS is parsed and the CSSOM built, the browser can't know where and how to position each element on the screen.

## 4. Execute the Javascript

How and when the Javascript is loaded will determine exactly when this happens, but at some point it will be parsed and executed. Different browsers have different Javascript engines to perform this task. This can be an expensive process in terms of a computer's resources, hence why optimising Javascript is really important for performance. Once synchronously loaded Javascript and the DOM are complete, the document.DOMContentLoaded event will be emitted. After everything else like async Javascript, images etc. have loaded then the window.load event is fired.

## 5. Merge DOM and CSSOM to construct the render tree

Like Javascript engines, different browsers have different rendering engines. They are used to visualise the render tree, which is a combination of the DOM and CSSOM that represents everything that will be visible on the page. This does not necessarily mean things that will be visually present, for example elements with styles of opacity:0 or visibility:hidden will be included in the render tree, and may still be read by a screen reader etc., whereas those set to display:none will not be. Additionally, tags such as `<head>` that do not contain any visual information will be omitted.

## 6. Calculate layout and paint

At this point the browser knows what to render but not where to render it, so its layout, i.e. position and size, must be calculated. The renderer traverses the render tree, working out the coordinates at which each node should be located. Once that is complete, the final step is to take that information and paint the pixels to the screen.
