import React from "react"
import { NextPageContext } from "next"
import Link from "next/link"

export interface PostRef {
  filename: string,
  title: string,
  date: Date,
  lastUpdate: Date,
  labels: string[]
}

export type MaybePostProps = PostProps | PostNotFound

export interface PostNotFound { 
  pathname?: string,
  notFound: true
}
export interface PostProps {
  post: PostRef
  content: string
}

export interface PostListProps {
  labels: string[],
  offset: number,
  pageSize: number,
  posts: PostRef[]
}

export function isPostProps(obj: any): obj is PostProps {
  return !!obj.post
}

export async function loadPostsFromQuery(context: NextPageContext) {
  const { offset, pageSize, labels } = context.query
  
  const parsedOffset: number = offset && !Array.isArray(offset) ? Number.parseInt(offset) : 0;
  const parsedPageSize: number = pageSize && !Array.isArray(pageSize) ? Number.parseInt(pageSize) : 10;
  const parsedLabels = Array.isArray(labels) ? labels : [labels]
  const labelSet = new Set(parsedLabels)
  
  const posts = (await import ("../db/posts")).default
    .filter(x => x.labels.find(l => labelSet.has(l)))
    .slice(parsedOffset, parsedOffset + parsedPageSize)
  
  return { 
    offset: parsedOffset, 
    pageSize: parsedPageSize, 
    labels: parsedLabels, 
    posts 
  }
}

export async function loadPostFromQuery(context: NextPageContext): Promise<MaybePostProps> {
  const { postId } = context.query
  let id = Array.isArray(postId) ? postId[0] : postId
  if (!postId) {
    return { notFound: true, pathname: id }
  } else {
    const mod = (await import("../static/posts/" + postId)).default as string
    const post = (await import ("../db/posts")).default.find(x => x.filename === postId)
    return { content: mod, post: post }
  }

}

class PostList extends React.Component<{ list: PostRef[] }> {
  render() {
    return this.props.list.map(x => <div><Link href={"/posts/" + x.filename}>{x.title}</Link></div>)
  }
}

export class PostPaginator extends React.PureComponent<PostListProps> {

  render() {
    
    const pageLink = (offset: number): string => {
      const args = this.props.labels.map(x => 'labels=' + encodeURI(x))
      args.push('offset=' + (offset))
      args.push('pageSize=' + this.props.pageSize)
      return '/posts?' + args.join('&')
    }
    let prev: string | undefined;
    if (this.props.offset) {
      prev = pageLink(this.props.offset - this.props.pageSize);
    }
    let next: string | undefined;
    if (this.props.posts.length === this.props.pageSize) {
      next = pageLink(this.props.offset + this.props.pageSize);
    }
    
    
    return <div>
      <PostList list={this.props.posts} />
      <div role="navigation">
        {
          prev ? <Link href={prev}>back</Link> : null
        }
        {
          next ? <Link href={next}>next</Link> : null
        }
      </div>
    </div>
  }
}


