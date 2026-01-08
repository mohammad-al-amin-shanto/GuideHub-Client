type Props = {
  params: { id: string };
};

export default function ProfilePage({ params }: Props) {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4">Guide Profile</h1>
      <p className="text-gray-600">Guide ID: {params.id}</p>
    </div>
  );
}
