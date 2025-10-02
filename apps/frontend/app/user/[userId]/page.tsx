'use client'

import React, { useState, Suspense } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Link as LinkIcon,
  MoreHorizontal,
} from 'lucide-react'

interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  company: {
    name: string
  }
  address: {
    city: string
    zipcode: string
  }
}

// 用户数据缓存机制
const userCache = new Map()

function fetchUser(userId: string): User {
  const cacheKey = `user-${userId}`

  if (userCache.has(cacheKey)) {
    const cached = userCache.get(cacheKey)
    if (cached.status === 'fulfilled') {
      return cached.data
    } else if (cached.status === 'pending') {
      throw cached.promise
    } else if (cached.status === 'rejected') {
      throw cached.error
    }
  }

  const promise = fetch(`http://localhost:3001/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('用户不存在')
      }
      return response.json()
    })
    .then((data: User) => {
      userCache.set(cacheKey, { status: 'fulfilled', data })
      return data
    })
    .catch(error => {
      userCache.set(cacheKey, { status: 'rejected', error })
      throw error
    })

  userCache.set(cacheKey, { status: 'pending', promise })
  throw promise
}

function UserProfileSkeleton() {
  return (
    <div className="min-h-screen bg-black">
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center space-x-4">
          <Skeleton className="w-8 h-8 rounded-full bg-gray-800" />
          <div>
            <Skeleton className="h-5 w-24 bg-gray-800 mb-1" />
            <Skeleton className="h-3 w-16 bg-gray-800" />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <Skeleton className="h-48 w-full bg-gray-800" />

        <div className="px-4 pb-4">
          <div className="flex justify-between items-start -mt-16 mb-4">
            <Skeleton className="w-32 h-32 rounded-full bg-gray-800 border-4 border-black" />
            <Skeleton className="h-9 w-20 bg-gray-800 rounded-full mt-16" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-6 w-32 bg-gray-800" />
            <Skeleton className="h-4 w-24 bg-gray-800" />
            <Skeleton className="h-4 w-full bg-gray-800" />
            <Skeleton className="h-4 w-3/4 bg-gray-800" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ErrorFallback({
  error,
  resetError,
}: {
  error: Error
  resetError: () => void
}) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
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
        <h3 className="text-xl font-bold text-white mb-2">用户信息加载失败</h3>
        <p className="text-gray-500 mb-6">请重试</p>
        <Button
          onClick={resetError}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-bold"
        >
          重试
        </Button>
      </div>
    </div>
  )
}

function UserProfileContent({ userId }: { userId: string }) {
  const user = fetchUser(userId)
  const [isFollowing, setIsFollowing] = useState(false)
  const router = useRouter()

  const handleBack = () => router.back()
  const handleFollow = () => setIsFollowing(v => !v)

  const n = Number.parseInt(userId, 10) || 0
  const stats = {
    following: n * 47 + (n % 50),
    followers: n * 123 + ((n * 7) % 200),
    tweets: n * 89 + ((n * 13) % 100),
  }

  const joinDate = new Date(2020 + (n % 4), n % 12, (n % 28) + 1)

  return (
    <div className="min-h-screen bg-black text-white select-none">
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="p-2 rounded-full  text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">{user.name}</h1>
            <p className="text-sm text-gray-500">{stats.tweets} 推文</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <div
          className="h-48 w-full"
          style={{
            background: `linear-gradient(135deg, 
              hsl(${(n * 30) % 360}, 70%, 50%) 0%, 
              hsl(${(n * 30 + 60) % 360}, 70%, 50%) 50%, 
              hsl(${(n * 30 + 120) % 360}, 70%, 50%) 100%)`,
          }}
        />

        <div className="px-4 pb-4">
          <div className="flex justify-between items-start -mt-12 mb-4">
            <Avatar className="w-32 h-32 border-4 border-black">
              <AvatarFallback
                className="bg-gray-700 text-white text-2xl font-bold"
                style={{
                  backgroundColor: `hsl(${(n * 45) % 360}, 50%, 40%)`,
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex items-center space-x-2 mt-16">
              <Button
                variant="ghost"
                size="sm"
                className="p-2 rounded-full hover:bg-gray-800 border border-gray-600"
              >
                <MoreHorizontal className="w-5 h-5" />
              </Button>

              <Button
                onClick={handleFollow}
                className={`px-6 py-2 rounded-full font-bold transition-colors ${
                  isFollowing
                    ? 'bg-transparent border border-gray-600 text-white hover:bg-red-500/10 hover:border-red-500 hover:text-red-500'
                    : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                {isFollowing ? '正在关注' : '关注'}
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h2 className="text-xl font-bold text-white">{user.name}</h2>
              <p className="text-gray-500">@{user.username}</p>
            </div>

            <div className="text-white">
              <p>
                {user.company} 的 {user.name}
              </p>
              <p className="text-gray-300 mt-1">📧 {user.email}</p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{user.location}</span>
              </div>

              <div className="flex items-center space-x-1">
                <LinkIcon className="w-4 h-4" />
                <a
                  href={`https://${user.website}`}
                  className="text-blue-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {user.website}
                </a>
              </div>

              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>
                  {joinDate.getFullYear()}年{joinDate.getMonth() + 1}月加入
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-1">
                <span className="font-bold text-white">
                  {stats.following.toLocaleString()}
                </span>
                <span className="text-gray-500">正在关注</span>
              </div>

              <div className="flex items-center space-x-1">
                <span className="font-bold text-white">
                  {stats.followers.toLocaleString()}
                </span>
                <span className="text-gray-500">关注者</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-800">
          <div className="flex">
            <button className="flex-1 py-4 text-center font-medium text-white border-b-2 border-blue-500">
              推文
            </button>
            <button className="flex-1 py-4 text-center font-medium text-gray-500 hover:bg-gray-900/30">
              回复
            </button>
            <button className="flex-1 py-4 text-center font-medium text-gray-500 hover:bg-gray-900/30">
              媒体
            </button>
            <button className="flex-1 py-4 text-center font-medium text-gray-500 hover:bg-gray-900/30">
              喜欢
            </button>
          </div>
        </div>

        <div className="p-8 text-center">
          <div className="text-gray-500 mb-2">
            <svg
              className="w-16 h-16 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">还没有推文</h3>
          <p className="text-gray-500">
            当 @{user.username} 发推时，推文将显示在这里。
          </p>
        </div>
      </div>
    </div>
  )
}

function UserProfileWithErrorBoundary({ userId }: { userId: string }) {
  const [error, setError] = useState<Error | null>(null)

  const resetError = () => {
    setError(null)
    userCache.delete(`user-${userId}`)
  }

  if (error) {
    return <ErrorFallback error={error} resetError={resetError} />
  }

  return (
    <Suspense fallback={<UserProfileSkeleton />}>
      <UserProfileContent userId={userId} />
    </Suspense>
  )
}

export default function UserProfile() {
  const params = useParams<{ userId: string }>()
  const userId = String(params.userId)

  return <UserProfileWithErrorBoundary userId={userId} />
}
