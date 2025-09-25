import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, Users, Hospital } from "lucide-react";

const paymentStatusColors = {
  pendente: "bg-orange-100 text-orange-800 border-orange-200",
  pago_parcial: "bg-blue-100 text-blue-800 border-blue-200",
  pago_total: "bg-green-100 text-green-800 border-green-200",
  cancelado: "bg-red-100 text-red-800 border-red-200",
};

export default function FinancialRecordCard({ record, onManageAuxiliary }) {
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow border-0">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{record.patient_name}</h3>
            <p className="text-slate-600">{record.procedure_name}</p>
            <Badge variant="outline" className={`mt-2 ${paymentStatusColors[record.payment_status]}`}>
              {record.payment_status?.replace('_', ' ')}
            </Badge>
          </div>
          <Button variant="outline" size="sm" onClick={() => onManageAuxiliary(record)}>
            <Users className="w-4 h-4 mr-2" /> Gerenciar Auxiliares
          </Button>
        </div>
        <div className="border-t my-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2"><Hospital className="w-4 h-4 text-slate-400" /><span>{record.hospital}</span></div>
          <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-slate-400" /><span>{formatDate(record.surgery_date)}</span></div>
          <div className="flex items-center gap-2"><DollarSign className="w-4 h-4 text-slate-400" /><span>Faturado: R$ {record.invoice_amount?.toLocaleString('pt-BR')}</span></div>
          <div className="flex items-center gap-2 text-green-600"><DollarSign className="w-4 h-4" /><span>Recebido: R$ {record.received_amount?.toLocaleString('pt-BR') || '0,00'}</span></div>
        </div>
      </CardContent>
    </Card>
  );
}