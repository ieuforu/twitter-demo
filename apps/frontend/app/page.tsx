'use client'

import React, { useState, useMemo, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Heart,
  MessageCircle,
  Repeat2,
  Share,
  MoreHorizontal,
  Home,
  Search,
  Bell,
  Mail,
  Bookmark,
  User,
  Users,
  Zap,
  CheckCircle,
  Briefcase,
  List,
  Calendar,
  MapPin,
  Image,
  Smile,
  BarChart3,
  Sparkles,
  ArrowLeft,
  X,
} from 'lucide-react'

// 数据缓存机制，支持 Suspense
const cache = new Map()

function fetchPosts() {
  const cacheKey = 'posts'

  if (cache.has(cacheKey)) {
    const cached = cache.get(cacheKey)
    if (cached.status === 'fulfilled') {
      return cached.data
    } else if (cached.status === 'pending') {
      throw cached.promise
    } else if (cached.status === 'rejected') {
      throw cached.error
    }
  }

  const promise = fetch('http://localhost:3001/posts')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }
      return response.json()
    })
    .then(data => {
      cache.set(cacheKey, { status: 'fulfilled', data })
      return data
    })
    .catch(error => {
      cache.set(cacheKey, { status: 'rejected', error })
      throw error
    })

  cache.set(cacheKey, { status: 'pending', promise })
  throw promise
}

function usePosts() {
  const posts = fetchPosts()
  return { posts }
}

// 左侧导航栏组件
function LeftSidebar() {
  const router = useRouter()

  const navigationItems = [
    { icon: Home, label: 'Home', active: true, href: '/' },
    { icon: Search, label: 'Explore', href: '/explore' },
    { icon: Bell, label: 'Notifications', badge: 3, href: '/notifications' },
    { icon: Mail, label: 'Messages', href: '/messages' },
    { icon: Bookmark, label: 'Bookmarks', href: '/bookmarks' },
    { icon: List, label: 'Lists', href: '/lists' },
    { icon: User, label: 'Profile', href: '/404NotFoundUsed' },
    { icon: Users, label: 'Communities', href: '/404NotFoundUsed/communities' },
    { icon: Zap, label: 'Premium', href: '/i/premium_sign_up' },
    {
      icon: CheckCircle,
      label: 'Verified Orgs',
      href: '/i/verified-orgs-signup',
    },
    { icon: Briefcase, label: 'Jobs', href: '/jobs' },
    { icon: MoreHorizontal, label: 'More', href: '/more' },
  ]

  return (
    <div className="sticky top-0 h-screen w-14 lg:w-56 bg-black border-r border-gray-800 flex flex-col p-2">
      {/* X Logo */}
      <div className="p-2 mb-2">
        <div className="w-7 h-7 flex items-center justify-center cursor-pointer hover:bg-gray-900/50 rounded-full transition-colors duration-200">
          <svg
            className="w-7 h-7 text-gray-200"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>
      </div>

      {/* Navigation */}
      <nav>
        {navigationItems.map(item => (
          <button
            key={item.label}
            onClick={() => {
              console.log(`navigate ${item.href}`)
              // item.href && router.push(item.href)
            }}
            className={`w-full flex items-center space-x-4 p-3 mb-2 last:mb-0 rounded-full hover:bg-gray-900/90 transition-colors duration-200 ${
              item.active ? 'text-gray-50' : 'text-gray-400'
            }`}
            data-testid={item.label === 'Home' ? 'AppTabBar_Home_Link' : null}
          >
            <div className="relative">
              <item.icon className="w-8 h-8" />
              {item.badge && (
                <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {item.badge}
                </div>
              )}
            </div>
            <span
              className="text-xl font-semibold hidden lg:block"
              style={{
                color: item.active
                  ? 'rgb(239, 243, 244)'
                  : 'rgb(231, 233, 234)',
              }}
            >
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Post Button */}
      <div className="p-2 my-7">
        <a
          aria-label="Post"
          role="link"
          className="w-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-full font-bold text-base transition-colors duration-200"
          data-testid="SideNav_NewTweet_Button"
          style={{
            backgroundColor: 'rgb(239, 243, 244)',
            borderColor: 'rgba(0, 0, 0, 0)',
          }}
        >
          Post
        </a>
      </div>

      {/* Profile */}
      <div className="p-2 border-t border-gray-800">
        <button
          aria-label="Account menu"
          role="button"
          className="w-full flex items-center space-x-2 hover:bg-gray-900/50 rounded-full p-2 transition-colors duration-200"
          data-testid="SideNav_AccountSwitcher_Button"
        >
          <Avatar className="w-10 h-10">
            <div className="w-full h-full bg-gray-700 text-white flex items-center justify-center" />
          </Avatar>
          <div className="flex-1 hidden lg:block">
            <div
              className="text-base font-bold text-left"
              style={{ color: 'rgb(231, 233, 234)' }}
            >
              isla cole
            </div>
            <div className="text-sm" style={{ color: 'rgb(113, 118, 123)' }}>
              @404NotFoundUser
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}

// 右侧边栏组件
function RightSidebar() {
  const [searchValue, setSearchValue] = useState('')

  const newsItems = [
    {
      category: 'Trending now',
      title: 'ForceBook Dazzles Bangkok w/ Mickey Magic',
      posts: '4.9K posts',
    },
    {
      category: '7h ago · News',
      title: 'Ukrainian Refugee Stabbed in Charlotte',
      posts: '60.9K posts',
    },
    {
      category: '5h ago · News',
      title: 'Trump & Modi Reaffirm Bond',
      posts: '77K posts',
    },
  ]

  const whoToFollow = [
    { name: 'Chris Brown', username: '@chrisbrown' },
    { name: 'Drake', username: '@Drake' },
    { name: 'Kim Kardashian', username: '@KimKardashian' },
  ]

  return (
    <div className="sticky top-0 h-screen w-72 lg:w-80 bg-black p-3 hidden lg:block">
      {/* Search */}
      <div className="mb-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            className="w-full text-white pl-10 pr-3 py-2 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
          />
        </div>
      </div>

      {/* Subscribe to Premium */}
      <div className="rounded-xl p-2 mb-3 border border-gray-800 shadow-md">
        <h3 className="text-white text-xl font-bold mb-2">
          Subscribe to Premium
        </h3>
        <p className="text-gray-300 text-xs mb-2 leading-tight">
          Unlock new features and revenue share.
        </p>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-xl font-bold text-xs transition-colors duration-200">
          Subscribe
        </Button>
      </div>

      {/* Today's News */}
      <div className="rounded-xl p-2 mb-3 border border-gray-800 shadow-md">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white text-xl font-bold">Today's News</h3>
          <X
            className={'text-gray-500 hover:text-gray-300 hover:cursor-pointer'}
          />
        </div>
        {newsItems.map((item, index) => (
          <div
            key={index}
            className="mb-2 last:mb-0 cursor-pointer rounded-xl p-2 hover:bg-gray-900/50 transition-colors duration-200"
          >
            <div className="text-gray-500 text-xs mb-1">{item.category}</div>
            <div className="text-white text-sm font-bold mb-1 leading-tight">
              {item.title}
            </div>
            <div className="text-gray-500 text-xs">{item.posts}</div>
          </div>
        ))}
      </div>

      {/* Who to Follow */}
      <div className="rounded-xl p-2 mb-3 border border-gray-800 shadow-md">
        <h3 className="text-white text-sm font-bold mb-2">Who to follow</h3>
        {whoToFollow.map((user, index) => (
          <div
            key={index}
            className="flex items-center justify-between mb-2 last:mb-0"
          >
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-gray-700 text-white">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-white text-sm font-bold">{user.name}</div>
                <div className="text-gray-500 text-xs">{user.username}</div>
              </div>
            </div>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-xl text-xs transition-colors duration-200">
              Follow
            </Button>
          </div>
        ))}
        <div className="text-blue-500 text-xs cursor-pointer hover:underline">
          Show more
        </div>
      </div>
    </div>
  )
}

// 发推文框组件
function ComposeBox() {
  const [tweetText, setTweetText] = useState('')

  const handlePost = () => {
    if (tweetText.trim()) {
      console.log('Posting tweet:', tweetText)
      setTweetText('')
    }
  }

  return (
    <div className="border-b border-gray-800 p-4 pt-2">
      <div className="flex space-x-3">
        <Avatar className="w-12 h-12 flex-shrink-0">
          <AvatarFallback className="bg-gray-700 text-white">U</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <textarea
            placeholder="What's happening?"
            value={tweetText}
            onChange={e => setTweetText(e.target.value)}
            className="w-full bg-transparent text-white text-lg placeholder-gray-500 border-none outline-none resize-none"
            rows={3}
          />
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4">
              <Image className="w-5 h-5 text-blue-400 cursor-pointer hover:text-blue-300" />
              <BarChart3 className="w-5 h-5 text-blue-400 cursor-pointer hover:text-blue-300" />
              <Smile className="w-5 h-5 text-blue-400 cursor-pointer hover:text-blue-300" />
              <Calendar className="w-5 h-5 text-blue-400 cursor-pointer hover:text-blue-300" />
              <MapPin className="w-5 h-5 text-blue-400 cursor-pointer hover:text-blue-300" />
            </div>
            <Button
              onClick={handlePost}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl font-bold disabled:opacity-50 transition-colors duration-200"
              disabled={!tweetText.trim()}
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// 操作按钮组件
function ActionButton({
  icon: Icon,
  count,
  onClick,
  isActive,
  hoverColor = 'gray',
}) {
  const getHoverClasses = () => {
    switch (hoverColor) {
      case 'red':
        return 'hover:text-red-500 hover:bg-red-500/10'
      case 'green':
        return 'hover:text-green-500 hover:bg-green-500/10'
      case 'blue':
        return 'hover:text-blue-500 hover:bg-blue-500/10'
      default:
        return 'hover:text-gray-400 hover:bg-gray-900/50'
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={`group flex items-center space-x-1 text-gray-500 hover:bg-gray-900/50 p-0 h-auto transition-colors duration-200 ${getHoverClasses()} ${
        isActive ? `text-${hoverColor}-500` : ''
      }`}
    >
      <div className="p-2 rounded-xl transition-colors duration-200">
        <Icon className={`w-5 h-5 ${isActive ? 'fill-current' : ''}`} />
      </div>
      {count > 0 && <span className="text-sm">{count}</span>}
    </Button>
  )
}

// 帖子列表组件
function PostsList() {
  const { posts } = usePosts()
  const [displayCount, setDisplayCount] = useState(10)
  const [loadingMore, setLoadingMore] = useState(false)
  const [likedPosts, setLikedPosts] = useState(new Set())
  const [retweetedPosts, setRetweetedPosts] = useState(new Set())
  const router = useRouter()

  const displayedPosts = useMemo(
    () => posts.slice(0, displayCount),
    [posts, displayCount],
  )

  const getTimeAgo = createdAt => {
    const now = new Date()
    const postDate = new Date(createdAt)
    const diffInMinutes = Math.floor(
      (now.getTime() - postDate.getTime()) / (1000 * 60),
    )

    if (diffInMinutes < 60) return `${diffInMinutes}m`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`
    return `${Math.floor(diffInMinutes / 1440)}d`
  }

  const handleUserClick = userId => {
    router.push(`/user/${userId}`)
  }

  const loadMorePosts = () => {
    setLoadingMore(true)
    setTimeout(() => {
      setDisplayCount(prev => prev + 10)
      setLoadingMore(false)
    }, 800)
  }

  return (
    <>
      {displayedPosts.map(post => {
        const isLiked = likedPosts.has(post.id)
        const isRetweeted = retweetedPosts.has(post.id)
        const likeCount = post.likeCount + (isLiked ? 1 : 0)
        const retweetCount = 0 + (isRetweeted ? 1 : 0)
        const commentCount = 0

        return (
          <article
            key={post.id}
            className="flex space-x-3 p-4 border-b border-gray-800 hover:bg-gray-900/50 transition-colors duration-200 cursor-pointer"
          >
            <Avatar
              className="w-12 h-12 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity duration-200"
              onClick={e => {
                e.stopPropagation()
                handleUserClick(post.author.id)
              }}
            >
              <AvatarFallback className="bg-gray-700 text-white text-sm font-medium">
                {post.author.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <h3
                  className="text-lg font-bold text-white hover:underline cursor-pointer"
                  onClick={e => {
                    e.stopPropagation()
                    handleUserClick(post.author.id)
                  }}
                >
                  {post.author.name}
                </h3>
                <span
                  className="text-gray-500 text-sm hover:underline cursor-pointer"
                  onClick={e => {
                    e.stopPropagation()
                    handleUserClick(post.author.id)
                  }}
                >
                  @{post.author.username}
                </span>
                <span className="text-gray-500 text-sm">·</span>
                <span className="text-gray-500 text-sm">
                  {getTimeAgo(post.createdAt)}
                </span>
                <div className="ml-auto">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:bg-gray-900/50 p-2 h-auto rounded-xl transition-colors duration-200"
                    onClick={e => e.stopPropagation()}
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <h2 className="text-lg font-bold text-white mb-3 leading-tight">
                {post.title}
              </h2>

              <p className="text-white text-sm leading-relaxed mb-4 break-words">
                {post.content}
              </p>

              <div className="flex items-center justify-between max-w-md -ml-2">
                <ActionButton
                  icon={MessageCircle}
                  count={commentCount}
                  onClick={e => {
                    e.stopPropagation()
                    console.log('reply', post.id)
                  }}
                  isActive={false}
                  hoverColor="blue"
                />
                <ActionButton
                  icon={Repeat2}
                  count={retweetCount}
                  onClick={e => {
                    e.stopPropagation()
                    setRetweetedPosts(prev => {
                      const newSet = new Set(prev)
                      if (newSet.has(post.id)) {
                        newSet.delete(post.id)
                      } else {
                        newSet.add(post.id)
                      }
                      return newSet
                    })
                  }}
                  isActive={isRetweeted}
                  hoverColor="green"
                />
                <ActionButton
                  icon={Heart}
                  count={likeCount}
                  onClick={e => {
                    e.stopPropagation()
                    setLikedPosts(prev => {
                      const newSet = new Set(prev)
                      if (newSet.has(post.id)) {
                        newSet.delete(post.id)
                      } else {
                        newSet.add(post.id)
                      }
                      return newSet
                    })
                  }}
                  isActive={isLiked}
                  hoverColor="red"
                />
                <ActionButton
                  icon={Share}
                  count={0}
                  onClick={e => {
                    e.stopPropagation()
                    console.log('share', post.id)
                  }}
                  isActive={false}
                  hoverColor="blue"
                />
              </div>
            </div>
          </article>
        )
      })}

      {displayedPosts.length < posts.length && (
        <div className="p-4 border-b border-gray-800">
          <Button
            onClick={loadMorePosts}
            disabled={loadingMore}
            variant="ghost"
            className="w-full text-blue-500 hover:bg-gray-900/50 hover:text-blue-600 py-3 rounded-xl font-normal transition-colors duration-200"
          >
            {loadingMore ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span>Loading...</span>
              </div>
            ) : (
              `Show more posts`
            )}
          </Button>
        </div>
      )}

      {displayedPosts.length >= posts.length && posts.length > 0 && (
        <div className="p-4 text-center text-gray-500 text-sm">
          Showing all {posts.length} posts
        </div>
      )}
    </>
  )
}

// 中间主要内容区组件
function MainContent() {
  const [activeTab, setActiveTab] = useState('foryou')

  return (
    <div className="flex-1 max-w-3xl border-x border-gray-800 p-3 pt-2">
      {/* 顶部选项卡 */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="flex">
          <button
            onClick={() => setActiveTab('foryou')}
            className={`flex-1 py-2 text-center text-lg font-medium transition-colors duration-200 ${
              activeTab === 'foryou'
                ? 'text-white border-b-2 border-blue-500'
                : 'text-gray-500 hover:bg-gray-900/50'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <span>For you</span>
              <Sparkles className="w-5 h-5" />
            </div>
          </button>
          <button
            onClick={() => setActiveTab('following')}
            className={`flex-1 py-2 text-center text-lg font-medium transition-colors duration-200 ${
              activeTab === 'following'
                ? 'text-white border-b-2 border-blue-500'
                : 'text-gray-500 hover:bg-gray-900/50'
            }`}
          >
            Following
          </button>
        </div>
      </div>

      {/* 发推文框 */}
      <ComposeBox />

      {/* 帖子列表 */}
      <Suspense fallback={<LoadingSkeleton />}>
        <PostsList />
      </Suspense>
    </div>
  )
}

// 加载骨架屏组件
function LoadingSkeleton() {
  return (
    <div>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex space-x-3 p-4 border-b border-gray-800">
          <Skeleton className="w-12 h-12 rounded-full bg-gray-800" />
          <div className="flex-1 space-y-3">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-20 bg-gray-800" />
              <Skeleton className="h-4 w-16 bg-gray-800" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-gray-800" />
              <Skeleton className="h-4 w-3/4 bg-gray-800" />
            </div>
            <div className="flex justify-between max-w-md">
              <Skeleton className="h-4 w-12 bg-gray-800" />
              <Skeleton className="h-4 w-12 bg-gray-800" />
              <Skeleton className="h-4 w-12 bg-gray-800" />
              <Skeleton className="h-4 w-12 bg-gray-800" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// 错误边界组件
function ErrorFallback({ error, resetError }) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-red-400 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-white mb-2">
          Something went wrong
        </h3>
        <p className="text-gray-500 text-sm mb-4">Please try again</p>
        <Button
          onClick={resetError}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl font-bold transition-colors duration-200"
        >
          Try again
        </Button>
      </div>
    </div>
  )
}

// 带错误边界的主内容组件
function TwitterHomepageWithErrorBoundary() {
  const [error, setError] = useState(null)

  const resetError = () => {
    setError(null)
    cache.delete('posts')
  }

  if (error) {
    return <ErrorFallback error={error} resetError={resetError} />
  }

  return (
    <div className="min-h-screen bg-black text-white select-none">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex">
          {/* 左侧导航栏 */}
          <LeftSidebar />

          {/* 中间内容区 */}
          <MainContent />

          {/* 右侧边栏 */}
          <RightSidebar />
        </div>
      </div>
    </div>
  )
}

// 主页面组件
export default function TwitterHomePage() {
  return <TwitterHomepageWithErrorBoundary />
}
