interface ErrorAlertProps {
  children: React.ReactNode;
}

export default function ErrorAlert({ children }: ErrorAlertProps) {
  return (
    <section className="bg-primary/10 rounded border p-6 shadow-sm">
      <div className="text-center">{children}</div>
    </section>
  );
}
