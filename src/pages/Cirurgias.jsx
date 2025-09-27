import React, { useState, useEffect } from "react";
import Surgery from "@/entities/Surgery";
import Patient from "@/entities/Patient";
import FinancialRecord from "@/entities/FinancialRecord";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, Activity } from "lucide-react";

import SurgeryForm from "../components/surgeries/SurgeryForm";
import SurgeryCard from "../components/surgeries/SurgeryCard";

export default function Cirurgias() {
  const [surgeries, setSurgeries] = useState([]);
  const [patients, setPatients] = useState([]);
  const [financialRecords, setFinancialRecords] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSurgery, setEditingSurgery] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todas");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [surgeriesData, patientsData, financialData] = await Promise.all([
        Surgery.list("-created_date"),
        Patient.list(),
        FinancialRecord.list()
      ]);

      setSurgeries(Array.isArray(surgeriesData) ? surgeriesData : []);
      setPatients(Array.isArray(patientsData) ? patientsData : []);

      if (!Array.isArray(financialData)) {
        console.warn("financialData não é um array. Convertendo…", financialData);
        if (financialData && typeof financialData === "object") {
          setFinancialRecords(Object.values(financialData));
        } else {
          setFinancialRecords([]);
        }
      } else {
        setFinancialRecords(financialData);
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  const handleSubmit = async (surgeryData) => {
    try {
      if (editingSurgery) {
        await Surgery.update(editingSurgery.id, surgeryData);
      } else {
        await Surgery.create(surgeryData);
      }
      setShowForm(false);
      setEditingSurgery(null);
      loadData();
    } catch (error) {
      console.error("Erro ao salvar cirurgia:", error);
    }
  };

  const handleEdit = (surgery) => {
    setEditingSurgery(surgery);
    setShowForm(true);
  };

  const filteredSurgeries = surgeries.filter((surgery) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      surgery.patient_name?.toLowerCase().includes(search) ||
      surgery.procedure_name?.toLowerCase().includes(search) ||
      surgery.hospital?.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "todas" || surgery.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 md:p-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Título e botão */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Gestão de Cirurgias</h1>
            <p className="text-slate-600">Controle completo dos seus procedimentos cirúrgicos</p>
          </div>
          <Button
            onClick={() => {
              setEditingSurgery(null);
              setShowForm(true);
            }}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Cirurgia
          </Button>
        </div>

        {/* Filtros e busca */}
        <Card className="shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por paciente, procedimento ou hospital..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-slate-200"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="todas">Todas as cirurgias</option>
                <option value="solicitada">Solicitadas</option>
                <option value="autorizada">Autorizadas</option>
                <option value="agendada">Agendadas</option>
                <option value="realizada">Realizadas</option>
                <option value="faturada">Faturadas</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Modal do formulário */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <SurgeryForm
                surgery={editingSurgery}
                patients={patients}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setEditingSurgery(null);
                }}
              />
            </div>
          </div>
        )}

        {/* Lista de cirurgias */}
        <div className="grid gap-6">
          {filteredSurgeries.map((surgery) => (
            <SurgeryCard
              key={surgery.id || surgery.surgery_id}
              surgery={surgery}
              onEdit={handleEdit}
            />
          ))}

          {filteredSurgeries.length === 0 && (
            <Card className="shadow-lg border-0">
              <CardContent className="p-12 text-center">
                <Activity className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Nenhuma cirurgia encontrada
                </h3>
                <p className="text-slate-600 mb-6">
                  {searchTerm || statusFilter !== "todas"
                    ? "Tente ajustar os filtros de busca"
                    : "Cadastre sua primeira cirurgia para começar"}
                </p>
                {!searchTerm && statusFilter === "todas" && (
                  <Button
                    onClick={() => setShowForm(true)}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Cadastrar Primeira Cirurgia
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>

      </div>
    </div>
  );
}
