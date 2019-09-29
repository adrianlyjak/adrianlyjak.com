import React from "react"
import { PostListProps, loadPostsFromQuery, PostPaginator } from "../components/posts"
import { App } from "../components/app"
import { NextPageContext } from "next"

export default class PostsController extends React.Component<PostListProps> {
  static async getInitialProps(context: NextPageContext): Promise<PostListProps> {
    return loadPostsFromQuery(context);
  }

  render() {
    return <App><PostPaginator {...this.props} /></App>
  }
}