import DiscussionForum from '@/components/DiscussionForum'

export default function ForumPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Discussion Forum</h1>
      <DiscussionForum />
    </div>
  )
}