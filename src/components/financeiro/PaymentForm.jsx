import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Save } from "lucide-react";

export default function PaymentForm({ record, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(record || {});

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <CardTitle>Gerenciar Pagamento</CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel}><X /></Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <p><strong>Paciente:</strong> {record.patient_name}</p>
          <p><strong>Procedimento:</strong> {record.procedure_name}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="received_amount">Valor Recebido (R$)</Label>
              <Input
                id="received_amount"
                type="number"
                step="0.01"
                value={formData.received_amount || ''}
                onChange={(e) => handleInputChange('received_amount', parseFloat(e.target.value))}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="payment_date">Data do Pagamento</Label>
              <Input
                id="payment_date"
                type="date"
                value={formData.payment_date || ''}
                onChange={(e) => handleInputChange('payment_date', e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="payment_status">Status do Pagamento</Label>
            <Select value={formData.payment_status} onValueChange={(value) => handleInputChange('payment_status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="pago_parcial">Pago Parcial</SelectItem>
                <SelectItem value="pago_total">Pago Total</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="notes">Observações</Label>
            <Input
              id="notes"
              value={formData.notes || ''}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Notas sobre o pagamento"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
            <Button type="submit"><Save className="w-4 h-4 mr-2" /> Salvar</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}