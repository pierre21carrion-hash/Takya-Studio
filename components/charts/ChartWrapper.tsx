interface ChartWrapperProps {
  title: string;
  source: string;
  children: React.ReactNode;
}

export default function ChartWrapper({ title, source, children }: ChartWrapperProps) {
  return (
    <div className="bg-white border border-[#E8E6E1] rounded-xl p-5 my-6">
      <p className="text-xs font-medium text-[#9B9893] mb-4">{title}</p>
      {children}
      <p className="text-[10px] text-[#9B9893] mt-3 font-mono">{source}</p>
    </div>
  );
}
