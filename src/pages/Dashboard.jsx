import React, { useState, useEffect } from "react";
import { Surgery } from "@/entities/Surgery";
import { Financial_Record } from "@/entities/Financial_Record";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  Activity,
  Calendar,
  DollarSign,
  Clock,
  Users,
  FileText,
  Plus,
  TrendingUp
} from "lucide-react";

import StatsCard from "../components/dashboard/StatsCard";
import RecentSurgeries from "../components/dashboard/RecentSurgeries";

export default function Dashboard() {
  const [surgeries, setSurgeries] = useState([]); // Removido tipo <Surgery[]>
  const [financialRecords, setFinancialRecords] = useState([]); // Removido tipo <Financial_Record[]>
  const [isLoading, setIsLoading] = useState(true); // Removido tipo <boolean>

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [surgeriesData, financialData] = await Promise.all([
        Surgery.list('-created_date', 50),
        Financial_Record.list('-created_date', 50)
      ]);
      setSurgeries(surgeriesData);
      setFinancialRecords(financialData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
    setIsLoading(false);
  };

  const getStats = () => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    const totalSurgeries = surgeries.length;
    const todaySurgeries = surgeries.filter(s =>
      s.scheduled_date === todayStr
    ).length;

    const pendingSurgeries = surgeries.filter(s =>
      ['solicitada', 'autorizada', 'agendada'].includes(s.status)
    ).length;

    const totalRevenue = financialRecords
      .filter(r => r.payment_status === 'pago_total')
      .reduce((sum, r) => sum + (r.received_amount || 0), 0);

    const pendingPayments = financialRecords
      .filter(r => r.payment_status === 'pendente')
      .reduce((sum, r) => sum + (r.invoice_amount || 0), 0);

    return {
      totalSurgeries,
      todaySurgeries,
      pendingSurgeries,
      totalRevenue,
      pendingPayments
    };
  };

  const stats = getStats();

  return (
    <div className="p-6 md:p-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Dashboard Cirúrgico
            </h1>
            <p className="text-slate-600 text-lg">Visão geral das suas atividades médicas</p>
          </div>
          <div className="flex gap-3">
            <Link to={createPageUrl("Pacientes")}>
              <Button variant="outline" className="border-slate-300 hover:bg-slate-50">
                <Users className="w-4 h-4 mr-2" />
                Pacientes
              </Button>
            </Link>
            <Link to={createPageUrl("Cirurgias")}>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg">
                <Plus className="w-4 h-4 mr-2" />
                Nova Cirurgia
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <StatsCard
            title="Total de Cirurgias"
            value={stats.totalSurgeries}
            icon={Activity}
            bgGradient="bg-gradient-to-br from-blue-600 to-blue-700"
            iconColor="bg-gradient-to-br from-blue-600 to-blue-700"
            trend="+12%"
            trendDirection="up"
          />
          <StatsCard
            title="Cirurgias Hoje"
            value={stats.todaySurgeries}
            icon={Calendar}
            bgGradient="bg-gradient-to-br from-green-600 to-green-700"
            iconColor="bg-gradient-to-br from-green-600 to-green-700"
          />
          <StatsCard
            title="Pendentes"
            value={stats.pendingSurgeries}
            icon={Clock}
            bgGradient="bg-gradient-to-br from-orange-600 to-orange-700"
            iconColor="bg-gradient-to-br from-orange-600 to-orange-700"
          />
          <StatsCard
            title="Receita Total"
            value={`R$ ${stats.totalRevenue.toLocaleString('pt-BR')}`}
            icon={DollarSign}
            bgGradient="bg-gradient-to-br from-emerald-600 to-emerald-700"
            iconColor="bg-gradient-to-br from-emerald-600 to-emerald-700"
            trend="+8%"
            trendDirection="up"
          />
          <StatsCard
            title="A Receber"
            value={`R$ ${stats.pendingPayments.toLocaleString('pt-BR')}`}
            icon={TrendingUp}
            bgGradient="bg-gradient-to-br from-purple-600 to-purple-700"
            iconColor="bg-gradient-to-br from-purple-600 to-purple-700"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RecentSurgeries surgeries={surgeries} />
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg border-0">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Ações Rápidas</h3>
              <div className="space-y-3">
                <Link to={createPageUrl("Cirurgias")} className="block">
                  <Button variant="outline" className="w-full justify-start border-blue-200 hover:bg-blue-50 hover:border-blue-300">
                    <Plus className="w-4 h-4 mr-3" />
                    Cadastrar Cirurgia
                  </Button>
                </Link>
                <Link to={createPageUrl("Agendamento")} className="block">
                  <Button variant="outline" className="w-full justify-start border-green-200 hover:bg-green-50 hover:border-green-300">
                    <Calendar className="w-4 h-4 mr-3" />
                    Agendar Procedimento
                  </Button>
                </Link>
                <Link to={createPageUrl("Financeiro")} className="block">
                  <Button variant="outline" className="w-full justify-start border-purple-200 hover:bg-purple-50 hover:border-purple-300">
                    <DollarSign className="w-4 h-4 mr-3" />
                    Registrar Pagamento
                  </Button>
                </Link>
                <Link to={createPageUrl("Relatorios")} className="block">
                  <Button variant="outline" className="w-full justify-start border-orange-200 hover:bg-orange-50 hover:border-orange-300">
                    <FileText className="w-4 h-4 mr-3" />
                    Gerar Relatório
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
