import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { CalendarDaysIcon, TagIcon, UserIcon, ArrowLeftIcon, ArrowRightIcon } from '@/components/HeroIcons'
import connectDB from '@/lib/mongodb'
import Post from '@/models/Post'
import { demoPosts } from '@/lib/seedPosts'

const Calendar   = CalendarDaysIcon
const Tag        = TagIcon
const User       = UserIcon
const ArrowLeft  = ArrowLeftIcon
const ArrowRight = ArrowRightIcon

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    await connectDB()
    const post = await Post.findOne({ slug: params.slug, status: 'published' }).lean() as any
    if (!post) {
      const demo = demoPosts.find(p => p.slug === params.slug)
      if (!demo) return { title: 'Post Not Found' }
      return { title: demo.title, description: demo.excerpt, openGraph: { title: demo.title, description: demo.excerpt, type: 'article' } }
    }
    return { title: post.title, description: post.excerpt, openGraph: { title: post.title, description: post.excerpt, type: 'article' } }
  } catch {
    const demo = demoPosts.find(p => p.slug === params.slug)
    if (!demo) return { title: 'Blog Post' }
    return { title: demo.title, description: demo.excerpt }
  }
}

async function getPost(slug: string) {
  try {
    await connectDB()
    const post = await Post.findOne({ slug, status: 'published' }).lean()
    if (post) return JSON.parse(JSON.stringify(post))
    return demoPosts.find(p => p.slug === slug) || null
  } catch { return demoPosts.find(p => p.slug === slug) || null }
}

async function getRelated(category: string, excludeSlug: string) {
  try {
    await connectDB()
    const posts = await Post.find({ status: 'published', category, slug: { $ne: excludeSlug } }).limit(3).lean()
    const result = JSON.parse(JSON.stringify(posts))
    if (result.length > 0) return result
    return demoPosts.filter(p => p.category === category && p.slug !== excludeSlug).slice(0, 3)
  } catch { return demoPosts.filter(p => p.category === category && p.slug !== excludeSlug).slice(0, 3) }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  const related = await getRelated(post.category, post.slug)
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://xerompower.com'}/blog/${post.slug}`
  const shareTitle = encodeURIComponent(post.title)

  return (
    <>
      <section className="relative bg-navy pt-36 pb-20 overflow-hidden">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover opacity-25"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80')] bg-cover bg-center" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-transparent" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 text-white/30 text-sm mb-6">
            <Link href="/" className="hover:text-solar transition-colors">Home</Link>
            <span>›</span>
            <Link href="/blog" className="hover:text-solar transition-colors">Blog</Link>
            <span>›</span>
            <span className="truncate max-w-xs text-white/60">{post.title}</span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-solar/20 text-solar px-3 py-1 rounded-full border border-solar/30 mb-5">
            <Tag size={10} /> {post.category || 'Solar EPC'}
          </span>
          <h1 className="font-display font-extrabold text-white mb-5 leading-tight text-3xl md:text-5xl">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-5 text-white/40 text-sm">
            <span className="flex items-center gap-1.5"><User size={13} /> {post.author || 'ZEROM Power Team'}</span>
            <span className="flex items-center gap-1.5"><Calendar size={13} />{new Date(post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="section-inner flex gap-12 flex-col lg:flex-row">

          <article className="flex-1 min-w-0">
            {post.coverImage && (
              <div className="relative w-full rounded-2xl overflow-hidden mb-10" style={{ aspectRatio: '16/7' }}>
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 800px"
                  priority
                />
              </div>
            )}
            {post.excerpt && (
            <blockquote className="bg-solar/5 border-l-4 border-solar rounded-r-2xl px-6 py-5 mb-10 text-slate-600 text-lg leading-relaxed font-medium italic">
              {post.excerpt}
            </blockquote>
            )}
            <div
              className="prose prose-slate prose-lg max-w-none prose-headings:font-display prose-headings:text-navy prose-a:text-solar prose-a:no-underline hover:prose-a:underline prose-strong:text-navy prose-img:rounded-2xl prose-blockquote:border-solar prose-blockquote:text-slate-500"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <div className="mt-12 pt-8 border-t border-slate-100">
              <p className="text-sm font-semibold text-navy mb-4">Share this article:</p>
              <div className="flex gap-3 flex-wrap">
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077b5] text-white text-sm font-medium hover:opacity-90 transition-opacity">LinkedIn</a>
                <a href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-sm font-medium hover:opacity-90 transition-opacity">Twitter / X</a>
                <a href={`https://wa.me/?text=${shareTitle}%20${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#25d366] text-white text-sm font-medium hover:opacity-90 transition-opacity">WhatsApp</a>
              </div>
            </div>
            <div className="mt-10">
              <Link href="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-solar text-sm font-medium transition-colors">
                <ArrowLeft size={15} /> Back to Blog
              </Link>
            </div>
          </article>

          <aside className="w-full lg:w-72 shrink-0 space-y-6">
            <div className="bg-slate-50 rounded-2xl p-7 text-center">
              <div className="w-14 h-14 rounded-full bg-navy flex items-center justify-center text-2xl mb-4 mx-auto">👤</div>
              <div className="font-display font-bold text-navy">{post.author || 'ZEROM Power Team'}</div>
              <div className="text-sm text-slate-400 mt-1">Solar Energy Expert</div>
            </div>

            {related.length > 0 && (
              <div className="bg-slate-50 rounded-2xl p-7">
                <h4 className="font-display font-bold text-navy mb-5 text-base">Related Articles</h4>
                <div className="space-y-4">
                  {related.map((p: any) => (
                    <Link key={p._id} href={`/blog/${p.slug}`} className="block group">
                      <div className="font-medium text-navy text-sm leading-snug group-hover:text-solar transition-colors line-clamp-2 mb-1">{p.title}</div>
                      <div className="text-xs text-slate-400">{new Date(p.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-navy rounded-2xl p-7 text-white">
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="font-display font-bold mb-2 text-base">Start Your Solar Journey</h4>
              <p className="text-white/50 text-sm leading-relaxed mb-5">Talk to our experts and get a customised solar solution for your needs.</p>
              <Link href="/contact" className="inline-flex items-center gap-1.5 bg-solar text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:opacity-90 transition-all">
                Get a Free Quote <ArrowRight size={13} />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
