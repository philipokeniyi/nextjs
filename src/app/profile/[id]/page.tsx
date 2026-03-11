export default async function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Profile Page</h1>
      <p className="text-lg">This is the profile page. User ID: {id}</p>
    </div>
  );
}
