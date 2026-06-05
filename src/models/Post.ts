import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IPost extends Document {
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  category: string
  author: string
  status: 'published' | 'draft'
  createdAt: Date
  updatedAt: Date
}

const PostSchema = new Schema<IPost>(
  {
    title:       { type: String, required: true, trim: true },
    slug:        { type: String, required: true, unique: true, trim: true, lowercase: true },
    excerpt:     { type: String, default: '' },
    content:     { type: String, required: true },
    coverImage:  { type: String, default: '' },
    category:    { type: String, default: 'General' },
    author:      { type: String, default: 'ZEROM Power' },
    status:      { type: String, enum: ['published', 'draft'], default: 'draft' },
  },
  { timestamps: true }
)

// Auto-generate slug from title if not provided
PostSchema.pre('validate', function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }
  next()
})

const Post: Model<IPost> = mongoose.models.Post ?? mongoose.model<IPost>('Post', PostSchema)
export default Post
