// app/ui/admin-dashboard/cards.tsx
import {
  UserGroupIcon,
  DocumentCheckIcon,
  PencilSquareIcon,
  NewspaperIcon,
  TrophyIcon,
  AcademicCapIcon,
  FireIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import { fetchCardData, fetchCategoryStats } from '@/app/lib/data';

const iconMap = {
  posts: NewspaperIcon,
  published: DocumentCheckIcon,
  drafts: PencilSquareIcon,
  subscribers: UserGroupIcon,
  chiefs: TrophyIcon,
  draft: AcademicCapIcon,
  '101': PaperAirplaneIcon,
  fantasy: FireIcon,
  hof: TrophyIcon,
};

export default async function CardWrapper() {
  const {
    numberOfPosts,
    numberOfSubscribers,
    totalDraftPosts,
    totalPublishedPosts,
  } = await fetchCardData();

  return (
    <>
      <Card title="Total Posts" value={numberOfPosts} type="posts" />
      <Card title="Published" value={totalPublishedPosts} type="published" />
      <Card title="Drafts" value={totalDraftPosts} type="drafts" />
      <Card title="Subscribers" value={numberOfSubscribers} type="subscribers" />
    </>
  );
}

export async function CategoryStatsCards() {
  const categoryStats = await fetchCategoryStats();

  const categoryNames: Record<string, string> = {
    '101': '101',
    'chiefs': 'Chiefs',
    'draft': 'Draft',
    'fantasy': 'Fantasy',
    'hof': 'Hall of Fame',
  };

  return (
    <>
      {categoryStats.map((stat) => (
        <Card
          key={stat.category}
          title={categoryNames[stat.category] || stat.category}
          value={Number(stat.count)}
          type={stat.category as keyof typeof iconMap}
        />
      ))}
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: keyof typeof iconMap;
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
        {value}
      </p>
    </div>
  );
}