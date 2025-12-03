export default async function CategoryBadge({ category }: { category: string }) {
    const categoryColors: Record<string, string> = {
        '101': 'bg-badge-50 text-badge-100',
        'chiefs': 'bg-badge-200 text-chief-100',
        'draft': 'bg-badge-400 text-badge-500',
        'fantasy': 'bg-badge-600 text-badge-700',
        'hof': 'bg-badge-800 text-badge-900',
    };

    const categoryNames: Record<string, string> = {
        '101': '101',
        'chiefs': 'Chiefs',
        'draft': 'Draft',
        'fantasy': 'fantasy',
        'hof': 'Hall of Fame',
    };

    return (
        <span
        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
            categoryColors[category] || 'bg-gray-100 text-gray-800'
        }`}
        >
            {categoryNames[category] || category}
        </span>
    )
}