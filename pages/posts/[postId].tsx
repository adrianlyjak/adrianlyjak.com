import React from 'react'
import { Markdown } from '../../components/Markdown'
import { App } from '../../components/app'

import { NextPageContext } from 'next'
import { loadPostFromQuery, MaybePostProps, isPostProps } from '../../components/posts'




export default class PostController extends React.Component<MaybePostProps> {
  static async getInitialProps(context: NextPageContext): Promise<MaybePostProps> {
    return loadPostFromQuery(context)
  }

  render() {
    if (isPostProps(this.props)) {
      return <App><Markdown>{this.props.content}</Markdown></App>
    } else {
      return <App>{this.props.pathname} Not Found</App>
    }

  }

}

