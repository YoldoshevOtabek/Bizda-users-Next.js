type PostType = {
    id: string,
    name: string,
    description: string
    images:{url:string}[]
    }
    
    export default async function SSG() {
    
    const { data }: { data: PostType[] } = await fetch("https://oline-shop-backend.onrender.com/api/products", {
    cache: 'no-cache'
    }).then(res => res.json())
    console.log(data)
    
    
    return (
    <div className="min-h-screen bg-gray-50 p-6">
    <div className="mx-auto max-w-6xl">
    {/* Header */}
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
    <div>
    <h1 className="text-2xl font-bold text-gray-900">
     SSR
    </h1>
    <p className="mt-1 text-sm text-gray-500">
    Barcha postlarni boshqarish
    </p>
    </div>
    
    <button className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">
    + Yangi post
    </button>
    </div>
    
    
    
    {/* Posts List */}
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
    <div className="border-b border-gray-200 px-5 py-4">
    <h2 className="font-semibold text-gray-900">
    Barcha postlar
    <span className="ml-2 rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
    {data?.length}
    </span>
    </h2>
    </div>
    
    <div className="divide-y divide-gray-100">
    {data?.map((post:PostType) => (
    <article
    key={post?.id}
    className="flex flex-col gap-4 p-5 transition hover:bg-gray-50 sm:flex-row sm:items-center"
    >
    {/* Post Icon */}
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl font-bold text-blue-600">
    <img width={50} src={post?.images[0]?.url} alt="" />
    </div>
    
    {/* Post Content */}
    <div className="min-w-0 flex-1">
    
    
    <h3 className="truncate text-base font-semibold text-gray-900">
    {post?.name}
    </h3>
    
    <p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-500">
    {post?.description}
    </p>
    
    
    </div>
    </article>
    ))}
    </div>
    
    
    </div>
    </div>
    </div>
    )
    }