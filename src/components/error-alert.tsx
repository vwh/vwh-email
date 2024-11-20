import { CircleXIcon } from "lucide-react";

interface ErrorAlertProps {
  children?: React.ReactNode;
  title: string;
  description?: string;
  icon?: JSX.Element;
}

const DefultIcon = (
  <CircleXIcon className="text-primary h-4 w-4 sm:h-7 sm:w-7" />
);

export default function ErrorAlert({
  children,
  title,
  description,
  icon = DefultIcon,
}: ErrorAlertProps) {
  return (
    <section className="bg-primary/10 rounded border p-6 shadow-sm">
      <div className="flex items-center justify-center gap-2">
        <h1 className="text-primary text-1xl font-bold sm:text-2xl">{title}</h1>
        {icon}
      </div>
      <p className="text-foreground/80 mt-1 text-sm text-center">
        {description}
      </p>
      {children}
    </section>
  );
}
