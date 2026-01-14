interface EditRoomPageProps {
  params: {
    id: string;
  };
}

export default function EditRoomPage({ params }: EditRoomPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Room</h1>
        <p className="text-muted-foreground">
          Update room information for ID: {params.id}
        </p>
      </div>

      <div className="rounded-lg border p-8">
        <p className="text-muted-foreground">
          Edit room form will be displayed here
        </p>
      </div>
    </div>
  );
}
