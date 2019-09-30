import React from "react";
import marked from "marked";

import * as hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import "../components/css/highlight";
// import scala from "highlight.js/lib/languages/scala";
// import java from "highlight.js/lib/languages/java";
// import markdown from "highlight.js/lib/languages/markdown";
// import json from "highlight.js/lib/languages/json";
// import yaml from "highlight.js/lib/languages/yaml";
// import bash from "highlight.js/lib/languages/bash";
// import typescript from "highlight.js/lib/languages/typescript";
// import smalltalk from "highlight.js/lib/languages/smalltalk";
// import css from "highlight.js/lib/languages/css";
// import dockerfile from "highlight.js/lib/languages/dockerfile";
hljs.registerLanguage("javascript", javascript);
// hljs.registerLanguage("scala", scala);
// hljs.registerLanguage("java", java);
// hljs.registerLanguage("markdown", markdown);
// hljs.registerLanguage("json", json);
// hljs.registerLanguage("yaml", yaml);
// hljs.registerLanguage("bash", bash);
// hljs.registerLanguage("typescript", typescript);
// hljs.registerLanguage("smalltalk", smalltalk);
// hljs.registerLanguage("css", css);
// hljs.registerLanguage("dockerfile", dockerfile);

export class RemoteMarkdown extends React.Component<{ path: string }, {content: string | null}> {
  state = {
    content: null
  }
  componentDidMount() {
    fetch(this.props.path)
    .then(x => x.text())
    .then(content => {
      this.setState({ content })
    })
  }

  render() {

    if (!this.state.content) {
      return <div>loading</div>
    } else {
      return <Markdown>{this.state.content}</Markdown>
    }

  }
}

export class Markdown extends React.Component<{ children: string }> {
  componentDidMount() {
    this.setContent();
  }

  content: string;
  constructor(props: { children: string}) {
    super(props);
    this.content = marked(this.props.children);
  }

  componentDidUpdate(prevProp: { children: string }) {
    if (this.props.children !== prevProp.children) {
      this.setContent()
    }
  }

  setContent(): void {
    if (this.el) {
      this.el.innerHTML = marked(this.props.children);
      for (const code of Array.from(this.el.querySelectorAll('pre code'))) {
        hljs.highlightBlock(code);
      };
    }
  }

  el: HTMLElement;
  setRef = (el: HTMLElement): void => {
    this.el = el;
    this.setContent()
  }

  render() {
    return <div ref={this.setRef} dangerouslySetInnerHTML={{ __html: this.content }} />;
  }
}

