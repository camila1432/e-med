import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Save, User, Activity, MapPin, Calendar, DollarSign } from "lucide-react";

const HOSPITALS = [
  "Hospital das Clínicas",
  "Hospital Sírio-Libanês", 
  "Hospital Israelita Albert Einstein",
  "Hospital Santa Catarina",
  "Hospital São Luiz",
  "Hospital Nove de Julho",
  "Outro"
];

const SURGEONS = [
  "Dr. João Silva",
  "Dr. Maria Santos", 
  "Dr. Pedro Oliveira",
  "Dr. Ana Costa",
  "Dr. Carlos Lima"
];

export default function SurgeryForm({ surgery, patients, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(surgery || {
    patient_name: "",
    procedure_name: "",
    procedure_code: "",
    hospital: "",
    scheduled_date: "",
    scheduled_time: "",
    status: "solicitada",
    priority: "eletiva",
    main_surgeon: "",
    assistant_surgeons: [],
    anesthesiologist: "",
    estimated_duration: "",
    medical_fee: "",
    assistant_fee: "",
    authorization_number: "",
    clinical_history: "",
    postop_instructions: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="border-b border-slate-200 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-slate-900">
            {surgery ? 'Editar Cirurgia' : 'Nova Cirurgia'}
          </CardTitle>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onCancel}
            className="hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Informações do Paciente */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-slate-900">Informações do Paciente</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patient_name">Nome do Paciente</Label>
                {patients.length > 0 ? (
                  <Select 
                    value={formData.patient_name} 
                    onValueChange={(value) => handleInputChange('patient_name', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o paciente" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((patient) => (
                        <SelectItem key={patient.id} value={patient.full_name}>
                          {patient.full_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id="patient_name"
                    value={formData.patient_name}
                    onChange={(e) => handleInputChange('patient_name', e.target.value)}
                    placeholder="Nome completo do paciente"
                    required
                  />
                )}
              </div>
            </div>
          </div>

          {/* Informações do Procedimento */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-slate-900">Procedimento Cirúrgico</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="procedure_name">Nome do Procedimento</Label>
                <Input
                  id="procedure_name"
                  value={formData.procedure_name}
                  onChange={(e) => handleInputChange('procedure_name', e.target.value)}
                  placeholder="Ex: Apendicectomia laparoscópica"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="procedure_code">Código TUSS/AMB</Label>
                <Input
                  id="procedure_code"
                  value={formData.procedure_code}
                  onChange={(e) => handleInputChange('procedure_code', e.target.value)}
                  placeholder="Ex: 31101011"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Prioridade</Label>
                <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eletiva">Eletiva</SelectItem>
                    <SelectItem value="urgente">Urgente</SelectItem>
                    <SelectItem value="emergencial">Emergencial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="estimated_duration">Duração Estimada (horas)</Label>
                <Input
                  id="estimated_duration"
                  type="number"
                  step="0.5"
                  value={formData.estimated_duration}
                  onChange={(e) => handleInputChange('estimated_duration', parseFloat(e.target.value))}
                  placeholder="Ex: 2.5"
                />
              </div>
            </div>
          </div>

          {/* Local e Agendamento */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-slate-900">Local e Agendamento</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hospital">Hospital</Label>
                <Select value={formData.hospital} onValueChange={(value) => handleInputChange('hospital', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o hospital" />
                  </SelectTrigger>
                  <SelectContent>
                    {HOSPITALS.map((hospital) => (
                      <SelectItem key={hospital} value={hospital}>{hospital}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status da cirurgia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solicitada">Solicitada</SelectItem>
                    <SelectItem value="autorizada">Autorizada</SelectItem>
                    <SelectItem value="agendada">Agendada</SelectItem>
                    <SelectItem value="realizada">Realizada</SelectItem>
                    <SelectItem value="faturada">Faturada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="scheduled_date">Data Agendada</Label>
                <Input
                  id="scheduled_date"
                  type="date"
                  value={formData.scheduled_date}
                  onChange={(e) => handleInputChange('scheduled_date', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="scheduled_time">Horário</Label>
                <Input
                  id="scheduled_time"
                  type="time"
                  value={formData.scheduled_time}
                  onChange={(e) => handleInputChange('scheduled_time', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Equipe Médica */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-slate-900">Equipe Médica</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="main_surgeon">Cirurgião Principal</Label>
                <Select value={formData.main_surgeon} onValueChange={(value) => handleInputChange('main_surgeon', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o cirurgião" />
                  </SelectTrigger>
                  <SelectContent>
                    {SURGEONS.map((surgeon) => (
                      <SelectItem key={surgeon} value={surgeon}>{surgeon}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="anesthesiologist">Anestesista</Label>
                <Select value={formData.anesthesiologist} onValueChange={(value) => handleInputChange('anesthesiologist', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o anestesista" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dr. Ana Anestesia">Dr. Ana Anestesia</SelectItem>
                    <SelectItem value="Dr. Carlos Sedação">Dr. Carlos Sedação</SelectItem>
                    <SelectItem value="Dr. Pedro Anestésico">Dr. Pedro Anestésico</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Informações Financeiras */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-semibold text-slate-900">Informações Financeiras</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="medical_fee">Honorário Médico (R$)</Label>
                <Input
                  id="medical_fee"
                  type="number"
                  step="0.01"
                  value={formData.medical_fee}
                  onChange={(e) => handleInputChange('medical_fee', parseFloat(e.target.value))}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="assistant_fee">Taxa Auxiliares (R$)</Label>
                <Input
                  id="assistant_fee"
                  type="number"
                  step="0.01"
                  value={formData.assistant_fee}
                  onChange={(e) => handleInputChange('assistant_fee', parseFloat(e.target.value))}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="authorization_number">Nº Autorização</Label>
                <Input
                  id="authorization_number"
                  value={formData.authorization_number}
                  onChange={(e) => handleInputChange('authorization_number', e.target.value)}
                  placeholder="Número da autorização"
                />
              </div>
            </div>
          </div>

          {/* Observações Clínicas */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Observações Clínicas</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clinical_history">História Clínica</Label>
                <Textarea
                  id="clinical_history"
                  value={formData.clinical_history}
                  onChange={(e) => handleInputChange('clinical_history', e.target.value)}
                  placeholder="Descreva o quadro clínico e justificativa do procedimento..."
                  className="h-24"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postop_instructions">Orientações Pós-Operatórias</Label>
                <Textarea
                  id="postop_instructions"
                  value={formData.postop_instructions}
                  onChange={(e) => handleInputChange('postop_instructions', e.target.value)}
                  placeholder="Orientações e cuidados pós-cirúrgicos..."
                  className="h-24"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-slate-200">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              className="px-8"
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8"
            >
              <Save className="w-4 h-4 mr-2" />
              {surgery ? 'Atualizar' : 'Cadastrar'} Cirurgia
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}