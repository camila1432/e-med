import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

const statusColors = {
  solicitada: "bg-yellow-100 text-yellow-800 border-yellow-200",
  autorizada: "bg-blue-100 text-blue-800 border-blue-200", 
  agendada: "bg-purple-100 text-purple-800 border-purple-200",
  realizada: "bg-green-100 text-green-800 border-green-200",
  faturada: "bg-emerald-100 text-emerald-800 border-emerald-200",
  cancelada: "bg-red-100 text-red-800 border-red-200"
};

const priorityColors = {
  eletiva: "bg-slate-100 text-slate-800",
  urgente: "bg-orange-100 text-orange-800", 
  emergencial: "bg-red-100 text-red-800"
};

export default function RecentSurgeries({ surgeries }) {
  const formatDate = (dateString) => {
    if (!dateString) return "A agendar";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
    } catch (error) {
      return "Data inválida";
    }
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl font-bold text-slate-900">
          <Calendar className="w-5 h-5 text-blue-600" />
          Próximas Cirurgias
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {surgeries?.slice(0, 5).map((surgery) => (
          <div 
            key={surgery.id}
            className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="space-y-1">
                <h4 className="font-semibold text-slate-900">{surgery.patient_name}</h4>
                <p className="text-sm text-slate-600">{surgery.procedure_name}</p>
              </div>
              <div className="flex gap-2">
                <Badge className={statusColors[surgery.status]}>
                  {surgery.status}
                </Badge>
                <Badge variant="outline" className={priorityColors[surgery.priority]}>
                  {surgery.priority}
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(surgery.scheduled_date)}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="w-4 h-4" />
                <span>{surgery.scheduled_time || "Horário a definir"}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="w-4 h-4" />
                <span>{surgery.hospital}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Users className="w-4 h-4" />
                <span>{surgery.main_surgeon || "Dr. Responsável"}</span>
              </div>
            </div>
          </div>
        ))}
        
        {(!surgeries || surgeries.length === 0) && (
          <div className="text-center py-8 text-slate-500">
            <Calendar className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p className="font-medium">Nenhuma cirurgia agendada</p>
            <p className="text-sm">Cadastre uma nova cirurgia para começar</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}