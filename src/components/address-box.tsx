interface AddressBoxProps {
  label: string;
  address: string;
}

export default function AddressBox({ label, address }: AddressBoxProps) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-background/50">{label}</span>
      <span className="truncate text-sm font-medium">{address}</span>
    </div>
  );
}
