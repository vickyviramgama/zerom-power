import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { CalendarDaysIcon, TagIcon, ArrowRightIcon } from '@/components/HeroIcons'
import connectDB from '@/lib/mongodb'
import Post from '@/models/Post'
import { demoPosts } from '@/lib/seedPosts'
import ScrollReveal from '@/components/ScrollReveal'
import ParallaxHero from '@/components/ParallaxHero'
import Tilt3D from '@/components/Tilt3D'

const Calendar   = CalendarDaysIcon
const Tag        = TagIcon
const ArrowRight = ArrowRightIcon

export const metadata: Metadata = {
  title: 'Solar Blog',
  description: 'Insights, tips, and news on solar energy, EPC projects, O&M best practices, and renewable energy trends from ZEROM Power.',
}

const categories = ['All', 'Solar EPC', 'O&M', 'Technology', 'Policy & Finance', 'Case Studies']

async function getPosts() {
  try {
    await connectDB()
    const posts = await Post.find({ status: 'published' }).sort({ createdAt: -1 }).lean()
    const result = JSON.parse(JSON.stringify(posts))
    return result.length > 0 ? result : demoPosts
  } catch { return demoPosts }
}

export default async function BlogPage({ searchParams }: { searchParams: { category?: string; page?: string } }) {
  const posts = await getPosts()
  const activeCategory = searchParams.category || 'All'
  const currentPage = Number(searchParams.page || 1)
  const perPage = 6

  const filtered = activeCategory === 'All' ? posts : posts.filter((p: any) => p.category === activeCategory)
  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage)
  const featured = posts[0] || null
  const recent = posts.slice(1, 4)

  return (
    <>
      {/* Hero */}
      <ParallaxHero
        src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80"
        className="min-h-[55vh] flex items-center"
        overlay="rgba(5,8,15,0.68)"
      >
        <div className="max-w-4xl mx-auto px-6 text-center py-36">
          <div className="flex items-center justify-center gap-2 text-white/40 text-sm mb-5">
            <Link href="/" className="hover:text-solar transition-colors">Home</Link>
            <span>›</span><span className="text-white/70">Blog</span>
          </div>
          <div className="label mx-auto mb-5 justify-center">Knowledge Hub</div>
          <h1 className="font-display font-extrabold text-white text-5xl md:text-7xl leading-none mb-5">
            Solar <span className="text-solar">Insights</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Expert perspectives on solar energy, technology, and the future of clean power in India.
          </p>
        </div>
      </ParallaxHero>

      <section className="py-24 bg-white">
        <div className="section-inner">
          <div className="flex gap-12 flex-col lg:flex-row">

            {/* Main */}
            <div className="flex-1 min-w-0">
              <ScrollReveal className="flex flex-wrap gap-2 mb-10">
                {categories.map((cat) => (
                  <Link key={cat}
                    href={cat === 'All' ? '/blog' : `/blog?category=${encodeURIComponent(cat)}`}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                      activeCategory === cat
                        ? 'bg-solar text-white border-solar'
                        : 'text-slate-500 border-slate-200 hover:border-solar hover:text-solar'
                    }`}>
                    {cat}
                  </Link>
                ))}
              </ScrollReveal>

              {paginated.length === 0 ? (
                <div className="text-center py-24 text-slate-400">
                  <div className="text-5xl mb-4">☀️</div>
                  <p className="text-lg font-medium text-slate-500 mb-2">No posts yet</p>
                  <p className="text-sm">Check back soon for solar insights and project updates.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {paginated.map((post: any, i: number) => (
                    <ScrollReveal key={post._id} delay={Math.floor(i % 2) * 80}>
                      <Tilt3D intensity={5}>
                        <Link href={`/blog/${post.slug}`} className="block group h-full">
                          <div className="card-light rounded-2xl overflow-hidden h-full relative flex flex-col">
                            {post.coverImage ? (
                              <div className="relative h-48 overflow-hidden shrink-0">
                                <Image
                                  src={post.coverImage}
                                  alt={post.title}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                                  sizes="(max-width:768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
                              </div>
                            ) : (
                              <div className="h-1 bg-solar shrink-0" />
                            )}
                            <div className="p-7 flex flex-col flex-1">
                              <div className="flex items-center gap-3 text-xs text-slate-400 mb-4">
                                <span className="flex items-center gap-1"><Tag size={11} className="text-solar" />{post.category || 'Solar EPC'}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1"><Calendar size={11} />{new Date(post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                              </div>
                              <h3 className="font-display font-bold text-navy mb-3 leading-snug group-hover:text-solar transition-colors">{post.title}</h3>
                              <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">{post.excerpt}</p>
                              <div className="flex items-center gap-1.5 text-solar text-sm font-semibold">
                                Read More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </Tilt3D>
                    </ScrollReveal>
                  ))}
                </div>
              )}

              {totalPages > 1 && (
                <div className="flex items-center gap-2 mt-12 justify-center">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link key={p}
                      href={`/blog?${activeCategory !== 'All' ? `category=${encodeURIComponent(activeCategory)}&` : ''}page=${p}`}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold transition-all ${
                        p === currentPage ? 'bg-solar text-white' : 'bg-slate-100 text-slate-500 hover:bg-solar/10 hover:text-solar'
                      }`}>
                      {p}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="w-full lg:w-80 shrink-0 space-y-6">
              {featured && (
                <ScrollReveal>
                  <div className="bg-navy rounded-2xl overflow-hidden text-white">
                    {featured.coverImage && (
                      <div className="relative h-36 overflow-hidden">
                        <Image src={featured.coverImage} alt={featured.title} fill className="object-cover opacity-70" sizes="320px" />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent" />
                      </div>
                    )}
                    <div className="p-7">
                      <div className="text-xs font-bold text-solar uppercase tracking-widest mb-4">Featured Post</div>
                      <h4 className="font-display font-bold text-base mb-3 leading-snug">{featured.title}</h4>
                      <p className="text-white/50 text-sm leading-relaxed mb-5 line-clamp-3">{featured.excerpt}</p>
                      <Link href={`/blog/${featured.slug}`} className="inline-flex items-center gap-1.5 text-solar text-sm font-semibold hover:gap-2.5 transition-all">
                        Read Post <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {recent.length > 0 && (
                <ScrollReveal delay={100}>
                  <div className="bg-slate-50 rounded-2xl p-7">
                    <h4 className="font-display font-bold text-navy mb-5 text-base">Recent Posts</h4>
                    <div className="space-y-4">
                      {recent.map((p: any) => (
                        <Link key={p._id} href={`/blog/${p.slug}`} className="flex gap-3 group">
                          <div className="w-10 h-10 rounded-lg bg-navy shrink-0 flex items-center justify-center text-lg group-hover:bg-solar transition-colors">☀️</div>
                          <div>
                            <div className="font-medium text-navy text-sm leading-snug group-hover:text-solar transition-colors line-clamp-2">{p.title}</div>
                            <div className="text-xs text-slate-400 mt-1">{new Date(p.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}

              <ScrollReveal delay={150}>
                <div className="bg-slate-50 rounded-2xl p-7">
                  <h4 className="font-display font-bold text-navy mb-5 text-base">Categories</h4>
                  <div className="space-y-1">
                    {categories.filter(c => c !== 'All').map((cat) => (
                      <Link key={cat} href={`/blog?category=${encodeURIComponent(cat)}`}
                        className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-b-0 text-sm text-slate-500 hover:text-solar transition-colors group">
                        <span>{cat}</span>
                        <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 text-solar transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div className="rounded-2xl p-7 text-white" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                  <div className="text-3xl mb-3">☀️</div>
                  <h4 className="font-display font-bold mb-2">Get a Free Solar Quote</h4>
                  <p className="text-white/80 text-sm mb-5 leading-relaxed">Ready to switch to solar? Our experts will provide a custom quote.</p>
                  <Link href="/contact" className="inline-flex items-center gap-1.5 bg-white text-solar font-semibold text-sm px-5 py-2.5 rounded-full hover:shadow-lg transition-all">
                    Contact Us <ArrowRight size={13} />
                  </Link>
                </div>
              </ScrollReveal>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
