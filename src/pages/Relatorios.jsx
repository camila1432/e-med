import React, { useState, useEffect } from 'react';
import { Surgery, Financial_Record } from '@/entities/all';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download } from 'lucide-react';

export default function Relatorios() {
  const [surgeries, setSurgeries] = useState([]);
  const [financials, setFinancials] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const [surgData, finData] = await Promise.all([
        Surgery.list(),
        Financial_Record.list()
      ]);
      setSurgeries(surgData);
      setFinancials(finData);
    };
    loadData();
  }, []);

  const downloadCSV = (data, filename) => {
    if (data.length === 0) {
      alert("Não há dados para exportar.");
      return;
    }
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => JSON.stringify(row[header])).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportSurgeries = () => {
    let filteredData = surgeries;
    if (startDate && endDate) {
      filteredData = surgeries.filter(s => {
        const sDate = new Date(s.scheduled_date);
        return sDate >= new Date(startDate) && sDate <= new Date(endDate);
      });
    }
    downloadCSV(filteredData.map(s => ({
      id: s.id,
      paciente: s.patient_name,
      procedimento: s.procedure_name,
      hospital: s.hospital,
      data: s.scheduled_date,
      status: s.status,
      cirurgiao: s.main_surgeon,
      honorario: s.medical_fee
    })), 'relatorio_cirurgias');
  };

  return (
    <div className="p-6 md:p-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Relatórios</h1>
          <p className="text-slate-600">Exporte dados para análise e contabilidade.</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>Exportar Relatório de Cirurgias</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Selecione um período para filtrar os dados (opcional).</p>
            <div className="flex gap-4">
              <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
              <Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </div>
            <Button onClick={handleExportSurgeries}>
              <Download className="w-4 h-4 mr-2" />
              Exportar Cirurgias (CSV)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}