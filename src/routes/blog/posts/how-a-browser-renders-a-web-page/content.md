My thinking: if I'm going to build websites that are fast and reliable, I need to really understand the mechanics of each step a browser goes through to render a web page, so that each can be considered and optimised during development. This post is a summary of my learnings of the end-to-end process at a fairly high level.

---

A lot of this is based on the fantastic (and FREE!) [Website Performance Optimization](https://www.udacity.com/course/website-performance-optimization--ud884) course by [Ilya Grigorik](https://twitter.com/igrigorik) and [Cameron Pittman](https://twitter.com/cwpittman) on [Udacity](https://www.udacity.com/). I'd highly recommend checking it out.

Also very helpful was the article [How Browsers Work: Behind the scenes of modern web browsers](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/) by [Paul Irish](https://twitter.com/paul_irish) and [Tali Garsiel](http://taligarsiel.com/). It's from 2011 but many of the fundamentals of how browsers work remain relevant at the time of writing this blog post.

Ok, here we go. The process can be broken down into these main stages:

1. [Start to parse the HTML](blog/how-a-browser-renders-a-web-page#1-start-to-parse-the-html)
2. [Fetch external resources](blog/how-a-browser-renders-a-web-page#2-fetch-external-resources)
3. [Parse the CSS and build the CSSOM](blog/how-a-browser-renders-a-web-page#3-parse-the-css-and-build-the-cssom)
4. [Execute the JavaScript](blog/how-a-browser-renders-a-web-page#4-execute-the-javascript)
5. [Merge DOM and CSSOM to construct the render tree](blog/how-a-browser-renders-a-web-page#5-merge-dom-and-cssom-to-construct-the-render-tree)
6. [Calculate layout and paint](blog/how-a-browser-renders-a-web-page#6-calculate-layout-and-paint)

## 1. Start to parse the HTML

When the browser begins to receive the HTML data of a page over the network, it immediately sets its [parser](https://en.wikipedia.org/wiki/Parsing#Computer_languages) to work to convert the HTML into a [Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction).

> The Document Object Model (DOM) is the data representation of the objects that comprise the structure and content of a document on the web.

The first step of this parsing process is to break down the HTML into **tokens** that represent **start tags**, **end tags**, and their **contents**. From that it can construct the DOM.

<picture>
  <source srcset="/images/blog/how-a-browser-renders-a-web-page/step-1-500.webp 500w,
                  /images/blog/how-a-browser-renders-a-web-page/step-1-1000.webp 1000w,
                  /images/blog/how-a-browser-renders-a-web-page/step-1.webp 2480w,
                  /images/blog/how-a-browser-renders-a-web-page/step-1.webp 2480w"
          type="image/webp">
  <source srcset="/images/blog/how-a-browser-renders-a-web-page/step-1-500.png 500w,
                  /images/blog/how-a-browser-renders-a-web-page/step-1-1000.png 1000w"
          type="image/png">
  <img src="/images/blog/how-a-browser-renders-a-web-page/step-1-1000.png" 
       alt="Steps involved in the parsing of HTML by a web browser">
</picture>

## 2. Fetch external resources

When the parser comes across an external resource like a CSS or JavaScript file, it goes off to fetch those files. The parser will continue as a CSS file is being loaded, although it will **block rendering** until it has been loaded and parsed (more on that in a bit).

JavaScript files are a little different - by default they **block parsing** of the HTML whilst the JavaScript file is loaded and then parsed. There are two attributes that can be added to script tags to mitigate this: `defer` and `async`. Both allow the parser to continue whilst the JavaScript file is loaded in the background, but they operate differently in the way that they execute. More on that in a bit too, but in summary:

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

<picture>
  <source srcset="/images/blog/how-a-browser-renders-a-web-page/step-2-500.webp 500w,
                  /images/blog/how-a-browser-renders-a-web-page/step-2-1000.webp 1000w,
                  /images/blog/how-a-browser-renders-a-web-page/step-2.webp 2480w"
          type="image/webp">
  <source srcset="/images/blog/how-a-browser-renders-a-web-page/step-2-500.png 500w,
                  /images/blog/how-a-browser-renders-a-web-page/step-2-1000.png 1000w"
          type="image/png">
  <img src="/images/blog/how-a-browser-renders-a-web-page/step-2-1000.png" 
       alt="Fetching CSS and JavaScript resources in a web browser">
</picture>

## 3. Parse the CSS and build the CSSOM

You may well have heard of the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) before, but have you heard of the [CSSOM (CSS Object Model)](https://developer.mozilla.org/en-US/docs/Glossary/CSSOM)? Before I started researching this topic a little while back, I hadn't!

> The CSS Object Model (CSSOM) is a map of all CSS selectors and relevant properties for each selector in the form of a tree, with a root node, sibling, descendant, child, and other relationship. The CSSOM is very similar to the Document Object Model (DOM). Both of them are part of the critical rendering path which is a series of steps that must happen to properly render a website.
>
> The CSSOM, together with the DOM, to build the render tree, which is in turn used by the browser to layout and paint the web page.

Similar to HTML files and the DOM, when CSS files are loaded they must be parsed and converted to a tree - this time the CSSOM. It describes all of the CSS selectors on the page, their hierarchy and their properties.

Where the CSSOM differs to the DOM is that it cannot be built incrementally, as CSS rules can overwrite each other at various different points due to [specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity). **This is why CSS blocks rendering**, as until all CSS is parsed and the CSSOM built, the browser can't know where and how to position each element on the screen.

<picture>
  <source srcset="/images/blog/how-a-browser-renders-a-web-page/step-3-500.webp 500w,
                  /images/blog/how-a-browser-renders-a-web-page/step-3-1000.webp 1000w,
                  /images/blog/how-a-browser-renders-a-web-page/step-3.webp 2480w"
          type="image/webp">
  <source srcset="/images/blog/how-a-browser-renders-a-web-page/step-3-500.png 500w,
                  /images/blog/how-a-browser-renders-a-web-page/step-3-1000.png 1000w"
          type="image/png">
  <img src="/images/blog/how-a-browser-renders-a-web-page/step-3-1000.png" 
       alt="Parsing CSS and building the CSSOM in a web browser">
</picture>

## 4. Execute the JavaScript

How and when the JavaScript resources are loaded will determine exactly when this happens, but at some point they will be parsed, compiled and executed. Different browsers have different JavaScript engines to perform this task. [Parsing JavaScript can be an expensive process in terms of a computer's resources](https://medium.com/reloading/javascript-start-up-performance-69200f43b201), more-so than other types of resource, hence why optimising it is so important in achieving good performance. [Check out this fantastic post]() for a deeper dive into how the JavaScript engine works.

<aside>

### Load events

Once synchronously loaded JavaScript and the DOM are fully parsed and ready, the [document.DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event) event will be emitted. For any scripts that require access to the DOM, for example to manipulate it in some way or listen for user interaction events, it is good practice to first wait for this event before executing the scripts.

```javascript
document.addEventListener('DOMContentLoaded', (event) => {
    // You can now safely access the DOM
});
```

After everything else like async JavaScript, images etc. have finished loading then the [window.load](https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event) event is fired.

```javascript
window.addEventListener('load', (event) => {
    // The page has now fully loaded
});
```

</aside>

<picture>
  <source srcset="/images/blog/how-a-browser-renders-a-web-page/step-4-500.webp 500w,
                  /images/blog/how-a-browser-renders-a-web-page/step-4-1000.webp 1000w,
                  /images/blog/how-a-browser-renders-a-web-page/step-4.webp 2480w"
          type="image/webp">
  <source srcset="/images/blog/how-a-browser-renders-a-web-page/step-4-500.png 500w,
                  /images/blog/how-a-browser-renders-a-web-page/step-4-1000.png 1000w"
          type="image/png">
  <img src="/images/blog/how-a-browser-renders-a-web-page/step-4-1000.png" 
       alt="Timeline of executing JavaScript in a web browser">
</picture>

## 5. Merge DOM and CSSOM to construct the render tree

The [render tree](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction) is a combination of the DOM and CSSOM, and represents everything that will be rendered onto the page. That does not necessarily mean all nodes in the render tree will be **visually present**, for example nodes with styles of `opacity: 0` or `visibility: hidden` will be included, and may still be read by a screen reader etc., whereas those set to `display: none` will not be included. Additionally, tags such as `<head>` that do not contain any visual information will always be omitted.

As with JavaScript engines, different browsers have different [rendering engines](https://en.wikipedia.org/wiki/Comparison_of_browser_engines).

<picture>
  <source srcset="/images/blog/how-a-browser-renders-a-web-page/step-5-500.webp 500w,
                  /images/blog/how-a-browser-renders-a-web-page/step-5-1000.webp 1000w,
                  /images/blog/how-a-browser-renders-a-web-page/step-5.webp 2480w"
          type="image/webp">
  <source srcset="/images/blog/how-a-browser-renders-a-web-page/step-5-500.png 500w,
                  /images/blog/how-a-browser-renders-a-web-page/step-5-1000.png 1000w"
          type="image/png">
  <img src="/images/blog/how-a-browser-renders-a-web-page/step-5-1000.png" 
       alt="Merging the DOM and CSSOM to create a render tree in a web browser">
</picture>

## 6. Calculate layout and paint

Now that we have a complete render tree the browser knows _what_ to render, but not _where_ to render it. Therefore the layout of the page (i.e. every node's position and size) must be calculated. The rendering engine traverses the render tree, starting at the top and working down, calculating the coordinates at which each node should be displayed.

Once that is complete, the final step is to take that layout information and **paint** the pixels to the screen.

And voila! After all that, we have a **fully rendered web page!**

<picture>
  <source srcset="/images/blog/how-a-browser-renders-a-web-page/step-6-500.webp 500w,
                  /images/blog/how-a-browser-renders-a-web-page/step-6-1000.webp 1000w,
                  /images/blog/how-a-browser-renders-a-web-page/step-6.webp 2480w"
          type="image/webp">
  <source srcset="/images/blog/how-a-browser-renders-a-web-page/step-6-500.png 500w,
                  /images/blog/how-a-browser-renders-a-web-page/step-6-1000.png 1000w"
          type="image/png">
  <img src="/images/blog/how-a-browser-renders-a-web-page/step-6-1000.png" 
       alt="Calculating the layout and paint of a web page in a browser">
</picture>

Please share, react to, or comment on this post on [dev.to](https://dev.to/jstarmx/how-the-browser-renders-a-web-page-1ahc).
