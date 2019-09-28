import React from 'react'
import { Markdown } from '../../components/Markdown'
import { App } from '../../components/app'

import { NextPageContext } from 'next'
import { PostProps, loadPostFromQuery } from '../../components/posts'



type PostControllerProps = PostProps

export default class PostController extends React.Component<PostControllerProps> {
  static async getInitialProps(context: NextPageContext): Promise<PostControllerProps> {
    return loadPostFromQuery(context)
  }

  render() {
    const { content } = this.props
    return <App><Markdown>{content}</Markdown></App>

  }

}

