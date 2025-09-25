import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  MapPin, 
  User, 
  Clock, 
  DollarSign, 
  Edit,
  FileText,
  AlertCircle
} from "lucide-react";

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

export default function SurgeryCard({ surgery, onEdit }) {
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
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900">{surgery.patient_name}</h3>
            <p className="text-lg text-slate-600">{surgery.procedure_name}</p>
            {surgery.procedure_code && (
              <p className="text-sm text-slate-500">Código: {surgery.procedure_code}</p>
            )}
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-wide">Data</p>
              <p className="font-medium text-slate-900">
                {formatDate(surgery.scheduled_date)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-wide">Horário</p>
              <p className="font-medium text-slate-900">
                {surgery.scheduled_time || "A definir"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-wide">Hospital</p>
              <p className="font-medium text-slate-900">{surgery.hospital}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
              <User className="w-4 h-4 text-orange-600" />
            </div>
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-wide">Cirurgião</p>
              <p className="font-medium text-slate-900">
                {surgery.main_surgeon || "A definir"}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Information Row */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex gap-6 text-sm">
            {surgery.estimated_duration && (
              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="w-4 h-4" />
                <span>{surgery.estimated_duration}h estimadas</span>
              </div>
            )}
            {surgery.medical_fee && (
              <div className="flex items-center gap-2 text-slate-600">
                <DollarSign className="w-4 h-4" />
                <span>R$ {surgery.medical_fee.toLocaleString('pt-BR')}</span>
              </div>
            )}
            {surgery.authorization_number && (
              <div className="flex items-center gap-2 text-slate-600">
                <FileText className="w-4 h-4" />
                <span>Aut. {surgery.authorization_number}</span>
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            {surgery.status === 'solicitada' && (
              <div className="flex items-center gap-1 text-yellow-600 text-xs">
                <AlertCircle className="w-3 h-3" />
                <span>Aguardando autorização</span>
              </div>
            )}
            <Button 
              variant="outline"
              size="sm"
              onClick={() => onEdit(surgery)}
              className="border-slate-200 hover:bg-slate-50"
            >
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}