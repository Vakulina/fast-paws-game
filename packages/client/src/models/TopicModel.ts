import { Comment } from './CommentModel'

export type Topic = {
  id: number
  forumId: number
  title: string
  content: string
  user: string
  comments: Comment[]
}