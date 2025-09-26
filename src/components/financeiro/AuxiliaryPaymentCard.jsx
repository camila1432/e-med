import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AuxiliaryPayment from "@/entities/AuxiliaryPayment";
import { Check, X, Edit, DollarSign, Calendar, User, ShieldCheck, Banknote } from "lucide-react";

const statusColors = {
  pendente: "bg-yellow-100 text-yellow-800 border-yellow-200",
  aprovado: "bg-blue-100 text-blue-800 border-blue-200",
  pago: "bg-green-100 text-green-800 border-green-200",
  rejeitado: "bg-red-100 text-red-800 border-red-200",
};

export default function AuxiliaryPaymentCard({ payment, onEdit, onUpdate }) {
  const handleStatusChange = async (newStatus) => {
    await AuxiliaryPayment.update(payment.id, { payment_status: newStatus });
    onUpdate();
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow border-0">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg">{payment.auxiliary_name}</h3>
            <p className="text-slate-600">{payment.auxiliary_function}</p>
            <Badge variant="outline" className={`mt-2 ${statusColors[payment.payment_status]}`}>
              {payment.payment_status}
            </Badge>
          </div>
          <div className="flex gap-2">
            {payment.payment_status === 'pendente' && (
              <>
                <Button size="sm" variant="outline" className="text-green-600 border-green-300 hover:bg-green-50" onClick={() => handleStatusChange('aprovado')}><ShieldCheck className="w-4 h-4 mr-2" /> Aprovar</Button>
                <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50" onClick={() => handleStatusChange('rejeitado')}><X className="w-4 h-4 mr-2" /> Rejeitar</Button>
              </>
            )}
            {payment.payment_status === 'aprovado' && (
              <Button size="sm" variant="outline" className="text-blue-600 border-blue-300 hover:bg-blue-50" onClick={() => handleStatusChange('pago')}><Banknote className="w-4 h-4 mr-2" /> Marcar como Pago</Button>
            )}
            <Button size="sm" variant="ghost" onClick={() => onEdit(payment)}><Edit className="w-4 h-4" /></Button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2"><DollarSign className="w-4 h-4 text-slate-400" /><span>Valor: R$ {payment.payment_amount?.toLocaleString('pt-BR')}</span></div>
          <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-slate-400" /><span>Vencimento: {payment.due_date ? new Date(payment.due_date).toLocaleDateString('pt-BR') : '-'}</span></div>
          <div className="flex items-center gap-2"><User className="w-4 h-4 text-slate-400" /><span>CPF/CNPJ: {payment.auxiliary_cpf_cnpj}</span></div>
        </div>
      </CardContent>
    </Card>
  );
}