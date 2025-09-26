import React, { useState, useEffect } from 'react';
import Financial_Record from '@/entities/Financial_Record';
import AuxiliaryPayment from "@/entities/AuxiliaryPayment";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Search, Users, HandCoins } from 'lucide-react';
import FinancialRecordCard from '../components/financeiro/FinancialRecordCard';
import AuxiliaryPaymentCard from '../components/financeiro/AuxiliaryPaymentCard';
import AuxiliaryPaymentForm from '../components/financeiro/AuxiliaryPaymentForm';

export default function Financeiro() {
  const [records, setRecords] = useState([]);
  const [auxPayments, setAuxPayments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [activeTab, setActiveTab] = useState("faturamento");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [finData, auxData] = await Promise.all([
      Financial_Record.list('-created_date'),
      AuxiliaryPayment.list('-created_date'),
    ]);
    setRecords(finData);
    setAuxPayments(auxData);
  };

  const getStats = () => {
    const totalFaturado = records.reduce((sum, r) => sum + (r.invoice_amount || 0), 0);
    const totalRecebido = records.reduce((sum, r) => sum + (r.received_amount || 0), 0);
    const pendente = totalFaturado - totalRecebido;
    const auxPendente = auxPayments.filter(p => ['pendente', 'aprovado'].includes(p.payment_status)).reduce((sum, p) => sum + (p.payment_amount || 0), 0);
    return { totalFaturado, totalRecebido, pendente, auxPendente };
  };
  
  const stats = getStats();

  const handleEditPayment = (payment) => {
    setEditingPayment(payment);
    setShowForm(true);
  };
  
  const handleCreatePayment = (financialRecord) => {
    setEditingPayment({ 
        financial_record_id: financialRecord.id, 
        surgery_id: financialRecord.surgery_id 
    });
    setShowForm(true);
  };

  const handleSubmit = async (paymentData) => {
    if (editingPayment && editingPayment.id) {
      await AuxiliaryPayment.update(editingPayment.id, paymentData);
    } else {
      await AuxiliaryPayment.create(paymentData);
    }
    setShowForm(false);
    setEditingPayment(null);
    loadData();
  };

  const filteredRecords = records.filter(record =>
    record.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.procedure_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredAuxPayments = auxPayments.filter(p =>
    p.auxiliary_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Controle Financeiro</h1>
          <p className="text-slate-600">Acompanhe faturamentos, recebimentos e pagamentos de auxiliares.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card><CardHeader><CardTitle>Total Faturado</CardTitle></CardHeader><CardContent className="text-2xl font-bold">R$ {stats.totalFaturado.toLocaleString('pt-BR')}</CardContent></Card>
          <Card><CardHeader><CardTitle>Total Recebido</CardTitle></CardHeader><CardContent className="text-2xl font-bold text-green-600">R$ {stats.totalRecebido.toLocaleString('pt-BR')}</CardContent></Card>
          <Card><CardHeader><CardTitle>Pendente (Convênio)</CardTitle></CardHeader><CardContent className="text-2xl font-bold text-orange-600">R$ {stats.pendente.toLocaleString('pt-BR')}</CardContent></Card>
          <Card><CardHeader><CardTitle>Pendente (Auxiliares)</CardTitle></CardHeader><CardContent className="text-2xl font-bold text-red-600">R$ {stats.auxPendente.toLocaleString('pt-BR')}</CardContent></Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="faturamento"><HandCoins className="w-4 h-4 mr-2" />Faturamento Principal</TabsTrigger>
            <TabsTrigger value="auxiliares"><Users className="w-4 h-4 mr-2" />Pagamento de Auxiliares</TabsTrigger>
          </TabsList>
          
          <Card className="mt-4 shadow-lg border-0">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por paciente, procedimento ou auxiliar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-slate-200"
                />
              </div>
            </CardContent>
          </Card>

          <TabsContent value="faturamento" className="mt-6">
            <div className="grid gap-6">
              {filteredRecords.map(record => (
                <FinancialRecordCard key={record.id} record={record} onManageAuxiliary={handleCreatePayment} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="auxiliares" className="mt-6">
            <div className="grid gap-6">
              {filteredAuxPayments.map(payment => (
                <AuxiliaryPaymentCard key={payment.id} payment={payment} onEdit={handleEditPayment} onUpdate={loadData} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <AuxiliaryPaymentForm
                payment={editingPayment}
                onSubmit={handleSubmit}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}