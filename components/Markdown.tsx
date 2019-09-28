import React from "react";
import * as hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import marked from "marked"

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
    hljs.registerLanguage('javascript', javascript)
    hljs.initHighlighting()
  }
  render() {
    const content = marked(this.props.children);
    // @ts-ignore
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }
}

