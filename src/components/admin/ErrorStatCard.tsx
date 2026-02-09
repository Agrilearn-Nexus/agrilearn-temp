export default function StatCard({
                                     label,
                                     value,
                                     icon,
                                     trend,
                                     trendColor,
                                     bg,
                                     isText = false
                                 }: {
    label: string,
    value: string | number,
    icon: React.ReactNode,
    trend: string,
    trendColor: string,
    bg: string,
    isText?: boolean
}) {
    return (
        <div className={`p-5 rounded-xl border ${bg} transition-all hover:shadow-md`}>
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-white/60 rounded-lg backdrop-blur-sm">
                    {icon}
                </div>
            </div>
            <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{label}</p>
                <h4 className={`font-bold text-gray-900 ${isText ? 'text-lg truncate' : 'text-3xl'}`}
                    title={String(value)}>
                    {value}
                </h4>
                <p className={`text-xs font-medium mt-2 ${trendColor}`}>
                    {trend}
                </p>
            </div>
        </div>
    );
}