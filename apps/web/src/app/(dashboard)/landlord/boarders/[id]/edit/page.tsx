interface EditBoarderPageProps {
  params: {
    id: string;
  };
}

export default function EditBoarderPage({ params }: EditBoarderPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Boarder</h1>
        <p className="text-muted-foreground">
          Update boarder information for ID: {params.id}
        </p>
      </div>

      <div className="rounded-lg border p-8">
        <p className="text-muted-foreground">
          Edit boarder form will be displayed here
        </p>
      </div>
    </div>
  );
}
