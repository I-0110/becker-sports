import {
  UserGroupIcon,
  DocumentCheckIcon,
  PencilSquareIcon,
  NewspaperIcon,
} from '@heroicons/react/24/outline';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  posts: NewspaperIcon,
  published: DocumentCheckIcon,
  drafts: PencilSquareIcon,
  subscribers: UserGroupIcon,
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
      {/* NOTE: Uncomment this code in Chapter 9 */}

      {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      /> */}
    </>
  );
}

export function Card({
  title,
  type,
}: {
  title: string;
  type: 'posts' | 'subscribers' | 'drafts' | 'published';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-chief-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
    </div>
  );
}
