import Form from '@/app/ui/posts/edit-form';
import Breadcrumbs from '@/app/ui/posts/breadcrumbs';
import { fetchAdmins, fetchPostById } from '@/app/lib/data';
import { notFound } from 'next/navigation'; 

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [post, admins] = await Promise.all([
    fetchPostById(id),
    fetchAdmins(),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'posts', href: '/admin-dashboard/posts' },
          {
            label: 'Edit Post',
            href: `/admin-dashboard/posts/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form post={post} admins={admins} />
    </main>
  );
}