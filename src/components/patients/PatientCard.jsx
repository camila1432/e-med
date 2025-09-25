import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Phone, 
  CreditCard, 
  Heart, 
  Edit,
  Calendar,
  MapPin
} from "lucide-react";

export default function PatientCard({ patient, onEdit }) {
  const calculateAge = (birthDate) => {
    if (!birthDate) return null;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(patient.birth_date);

  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">{patient.full_name}</h3>
              <p className="text-sm text-slate-500">CPF: {patient.cpf}</p>
            </div>
          </div>
          <Button 
            variant="outline"
            size="sm"
            onClick={() => onEdit(patient)}
            className="border-slate-200 hover:bg-slate-50"
          >
            <Edit className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-3">
          {age && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span>{age} anos</span>
            </div>
          )}
          
          {patient.phone && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Phone className="w-4 h-4 text-green-500" />
              <span>{patient.phone}</span>
            </div>
          )}
          
          {patient.address && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <MapPin className="w-4 h-4 text-purple-500" />
              <span className="truncate">{patient.address}</span>
            </div>
          )}
        </div>

        {patient.insurance_plan && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <CreditCard className="w-3 h-3 mr-1" />
              {patient.insurance_plan}
            </Badge>
            {patient.insurance_number && (
              <p className="text-xs text-slate-500 mt-1">
                Carteira: {patient.insurance_number}
              </p>
            )}
          </div>
        )}

        {patient.medical_history && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium text-slate-700">Histórico</span>
            </div>
            <p className="text-xs text-slate-600 line-clamp-2">
              {patient.medical_history}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}