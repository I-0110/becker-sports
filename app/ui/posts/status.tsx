import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function PostStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-yellow-500 text-black': status === 'draft',
          'bg-green-500 text-white': status === 'paid',
        },
      )}
    >
      {status === 'draft' ? (
        <>
          Draft
          <ClockIcon className="ml-1 w-4 text-black" />
        </>
      ) : null}
      {status === 'publish' ? (
        <>
          Publish
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
