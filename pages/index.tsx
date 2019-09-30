import React from "react"
import Head from "next/head"
import { App } from "../components/app"
import { PostListProps, PostPaginator, loadPostsFromQuery } from "../components/posts"
import { NextPageContext } from "next"



export default class Home extends React.Component<PostListProps> {

  static async getInitialProps(context: NextPageContext): Promise<PostListProps> {
    return loadPostsFromQuery({...context, query: {
      ...context.query,
      labels: ["fixtures"]
    }})
  }

  render() {
    return <App>
      <Head>
        <title>wow</title>
      </Head>
      <PostPaginator {...this.props} />
    </App>
  }
}
