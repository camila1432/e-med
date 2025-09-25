import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Save, User, DollarSign, Calendar, Landmark, Percent } from "lucide-react";

export default function AuxiliaryPaymentForm({ payment, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(payment || {
    auxiliary_name: "",
    auxiliary_function: "",
    auxiliary_cpf_cnpj: "",
    payment_amount: "",
    due_date: "",
    bank_details: "",
    payment_type: "honorario",
    tax_withholdings: { inss: 0, irrf: 0, iss: 0 },
    notes: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTaxChange = (taxField, value) => {
    setFormData(prev => ({
      ...prev,
      tax_withholdings: {
        ...prev.tax_withholdings,
        [taxField]: parseFloat(value) || 0
      }
    }));
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <CardTitle>{payment?.id ? 'Editar Pagamento' : 'Novo Pagamento de Auxiliar'}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel}><X /></Button>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Dados do Profissional */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-slate-900">Dados do Profissional</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="auxiliary_name">Nome do Profissional</Label>
                <Input id="auxiliary_name" value={formData.auxiliary_name} onChange={(e) => handleInputChange('auxiliary_name', e.target.value)} required />
                </div>
                <div className="space-y-2">
                <Label htmlFor="auxiliary_function">Função</Label>
                <Input id="auxiliary_function" value={formData.auxiliary_function} onChange={(e) => handleInputChange('auxiliary_function', e.target.value)} placeholder="Ex: 1º Auxiliar" />
                </div>
                <div className="space-y-2">
                <Label htmlFor="auxiliary_cpf_cnpj">CPF/CNPJ</Label>
                <Input id="auxiliary_cpf_cnpj" value={formData.auxiliary_cpf_cnpj} onChange={(e) => handleInputChange('auxiliary_cpf_cnpj', e.target.value)} />
                </div>
            </div>
          </div>
          
          {/* Dados do Pagamento */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-slate-900">Dados do Pagamento</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                <Label htmlFor="payment_amount">Valor (R$)</Label>
                <Input id="payment_amount" type="number" step="0.01" value={formData.payment_amount} onChange={(e) => handleInputChange('payment_amount', parseFloat(e.target.value))} required />
                </div>
                <div className="space-y-2">
                <Label htmlFor="due_date">Vencimento</Label>
                <Input id="due_date" type="date" value={formData.due_date} onChange={(e) => handleInputChange('due_date', e.target.value)} />
                </div>
                <div className="space-y-2">
                <Label htmlFor="payment_type">Tipo</Label>
                <Select value={formData.payment_type} onValueChange={(value) => handleInputChange('payment_type', value)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                    <SelectItem value="honorario">Honorário</SelectItem>
                    <SelectItem value="reembolso">Reembolso</SelectItem>
                    <SelectItem value="adiantamento">Adiantamento</SelectItem>
                    </SelectContent>
                </Select>
                </div>
            </div>
          </div>

          {/* Dados Bancários */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
                <Landmark className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-slate-900">Dados Bancários</h3>
            </div>
            <Textarea id="bank_details" value={formData.bank_details} onChange={(e) => handleInputChange('bank_details', e.target.value)} placeholder="Banco, Agência, Conta, Chave PIX..." />
          </div>

          {/* Retenções */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
                <Percent className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-semibold text-slate-900">Retenções</h3>
            </div>
            <div className="grid grid-cols-3 gap-4 p-4 border rounded-lg bg-slate-50">
              <div className="space-y-1">
                <Label htmlFor="inss" className="text-xs">INSS (R$)</Label>
                <Input id="inss" type="number" step="0.01" value={formData.tax_withholdings?.inss || ''} onChange={(e) => handleTaxChange('inss', e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="irrf" className="text-xs">IRRF (R$)</Label>
                <Input id="irrf" type="number" step="0.01" value={formData.tax_withholdings?.irrf || ''} onChange={(e) => handleTaxChange('irrf', e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="iss" className="text-xs">ISS (R$)</Label>
                <Input id="iss" type="number" step="0.01" value={formData.tax_withholdings?.iss || ''} onChange={(e) => handleTaxChange('iss', e.target.value)} />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
            <Button type="submit"><Save className="w-4 h-4 mr-2" /> Salvar</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}