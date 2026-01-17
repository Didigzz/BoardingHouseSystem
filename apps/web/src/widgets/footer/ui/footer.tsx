export function Footer() {
  return (
    <footer className="border-t py-4 px-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} BHMS. All rights reserved.</p>
        <p>Boarding House Management System</p>
      </div>
    </footer>
  );
}

