import React from 'react'
import Head from 'next/head'

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
  </div>
)

export default Home
