import React, { useState, useEffect } from "react";
import { Patient } from "@/entities/Patient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, User, Phone, Heart } from "lucide-react";

import PatientForm from "../components/patients/PatientForm";
import PatientCard from "../components/patients/PatientCard";

export default function Pacientes() {
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    const patientsData = await Patient.list('-created_date');
    setPatients(patientsData);
  };

  const handleSubmit = async (patientData) => {
    if (editingPatient) {
      await Patient.update(editingPatient.id, patientData);
    } else {
      await Patient.create(patientData);
    }
    setShowForm(false);
    setEditingPatient(null);
    loadPatients();
  };

  const handleEdit = (patient) => {
    setEditingPatient(patient);
    setShowForm(true);
  };

  const filteredPatients = patients.filter(patient =>
    patient.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.cpf?.includes(searchTerm) ||
    patient.phone?.includes(searchTerm)
  );

  return (
    <div className="p-6 md:p-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Cadastro de Pacientes</h1>
            <p className="text-slate-600">Gerencie informações dos seus pacientes</p>
          </div>
          <Button 
            onClick={() => {
              setEditingPatient(null);
              setShowForm(true);
            }}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Paciente
          </Button>
        </div>

        {/* Search */}
        <Card className="shadow-lg border-0">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Buscar por nome, CPF ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-slate-200"
              />
            </div>
          </CardContent>
        </Card>

        {/* Patient Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <PatientForm
                patient={editingPatient}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setEditingPatient(null);
                }}
              />
            </div>
          </div>
        )}

        {/* Patients Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onEdit={handleEdit}
            />
          ))}
          
          {filteredPatients.length === 0 && (
            <div className="col-span-full">
              <Card className="shadow-lg border-0">
                <CardContent className="p-12 text-center">
                  <User className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Nenhum paciente encontrado</h3>
                  <p className="text-slate-600 mb-6">
                    {searchTerm 
                      ? "Tente ajustar o termo de busca" 
                      : "Cadastre seu primeiro paciente para começar"
                    }
                  </p>
                  {!searchTerm && (
                    <Button 
                      onClick={() => setShowForm(true)}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Cadastrar Primeiro Paciente
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

