import Form from '@/app/ui/posts/create-form';
import Breadcrumbs from '@/app/ui/posts/breadcrumbs';
import { fetchAdmins } from '@/app/lib/data';

export default async function Page() {
    const admins = await fetchAdmins();

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Posts', href: '/admin-dashboard/posts' },
                    {
                        label: 'Create Post',
                        href: '/admin-dashboard/posts/create',
                        active: true,
                    },
                ]}
            />
            <Form admins={admins} />
        </main>
    );
}