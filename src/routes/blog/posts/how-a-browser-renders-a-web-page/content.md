My thinking: if I'm going to build websites that are fast and reliable, I need to really understand the mechanics of each step a browser goes through to render a web page, so that each can be considered and optimised during development. This post is a summary of my learnings of the end-to-end process at a fairly high level.

---

## 1. Parse the HTML

When the browser begins to receive the HTML data of the page, it immediately sets its parser to work to convert the HTML into the [Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model). The first step of this process is to convert the HTML into tokens which represent start tags, end tags and their contents. From that it can construct the DOM.

![](/images/blog/how-a-browser-renders-a-web-page/step-1.png)

![](/images/blog/how-a-browser-renders-a-web-page/step-2.png)
