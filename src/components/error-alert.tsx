import { CircleXIcon } from "lucide-react";

interface ErrorAlertProps {
  children?: React.ReactNode;
  title: string;
  description?: string;
  icon?: JSX.Element;
}

const DefultIcon = (
  <CircleXIcon className="h-4 w-4 text-primary sm:h-7 sm:w-7" />
);

export default function ErrorAlert({
  children,
  title,
  description,
  icon = DefultIcon
}: ErrorAlertProps) {
  return (
    <section className="rounded border bg-primary/10 p-6 shadow-sm">
      <div className="flex items-center justify-center gap-2">
        <h1 className="text-1xl font-bold text-primary sm:text-2xl">{title}</h1>
        {icon}
      </div>
      <p className="mt-1 text-center text-sm text-foreground/80">
        {description}
      </p>
      {children}
    </section>
  );
}
