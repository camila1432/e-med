import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendDirection, 
  bgGradient,
  iconColor
}) {
  return (
    <Card className="relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0">
      <div className={`absolute inset-0 ${bgGradient} opacity-5`} />
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-600">{title}</p>
            <div className="text-3xl font-bold text-slate-900">{value}</div>
            {trend && (
              <div className="flex items-center gap-1 text-sm">
                {trendDirection === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
                <span className={`font-medium ${
                  trendDirection === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {trend}
                </span>
                <span className="text-slate-500">vs. mês anterior</span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-xl ${iconColor}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}