import React, { Children } from 'react'
import Head from 'next/head'
import marked from 'marked'
const testpost = require('../posts/testpost.md')

console.log({testpost})
const Markdown = ({children}: { children: string }) => {
  const content = marked(children);
  return <div dangerouslySetInnerHTML={{__html: content}} />;
}

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <style></style>
    </Head>
    <pre><code>
      /** I am a teapot. Here is my handle. Here is my spout. */
    </code></pre>
    <ul className="nav">
      <li className="nav-item">one</li>
      <li className="nav-item">two</li>
    </ul>
    <Markdown children={testpost.default} />
  </div>
)

export default Home
