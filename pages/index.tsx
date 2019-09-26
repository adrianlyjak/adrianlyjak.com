import React from "react"
import Head from "next/head"
import marked from "marked"
import "../components/css/highlight"
import { App } from "../components/app"

import * as hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';

class Markdown extends React.Component<{ children: string }> {
  componentDidMount() {
    hljs.registerLanguage('javascript', javascript)
    hljs.initHighlighting()
  }
  render() {
    const content = marked(this.props.children);
    // @ts-ignore
    return <div onClick={() => window && window.rotateTheme() }dangerouslySetInnerHTML={{ __html: content }} />;
  }
}

class RemoteMarkdown extends React.Component<{ path: string }, {content: string | null}> {
  state = {
    content: null
  }
  componentDidMount() {
    fetch(this.props.path)
    .then(x => x.text())
    .then(content => this.setState({ content }))
  }

  render() {

    if (!this.state.content) {
      return <div>loading</div>
    } else {
      return <Markdown>{this.state.content}</Markdown>
    }

  }
}

const Home = () => (
  <App>
    <Head>
      <title>Home</title>
    </Head>
    <RemoteMarkdown path="/static/posts/testpost.md"/>
  </App>

)

export default Home
