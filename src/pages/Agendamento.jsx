import React, { useState, useEffect } from 'react';
import Surgery from '@/entities/Surgery'; 
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Calendar from "@/components/ui/calendar";
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, User, Activity } from 'lucide-react';
import ptBR from 'date-fns/locale/pt-BR';

const statusColors = {
  solicitada: "bg-yellow-100 text-yellow-800 border-yellow-200",
  autorizada: "bg-blue-100 text-blue-800 border-blue-200",
  agendada: "bg-purple-100 text-purple-800 border-purple-200",
  realizada: "bg-green-100 text-green-800 border-green-200",
  faturada: "bg-emerald-100 text-emerald-800 border-emerald-200",
  cancelada: "bg-red-100 text-red-800 border-red-200"
};

export default function Agendamento() {
  const [date, setDate] = useState(new Date());
  const [surgeries, setSurgeries] = useState([]);
  const [allSurgeries, setAllSurgeries] = useState([]);

  useEffect(() => {
    loadSurgeries();
  }, []);

  useEffect(() => {
    if (date) {
      const filtered = allSurgeries.filter(s => {
        if (!s.scheduled_date) return false;
        const surgeryDate = new Date(s.scheduled_date);
        return surgeryDate.toDateString() === date.toDateString();
      });
      setSurgeries(filtered);
    }
  }, [date, allSurgeries]);

  const loadSurgeries = async () => {
    const data = await Surgery.list(); 
    setAllSurgeries(data);
    setDate(new Date());
  };

  return (
    <div className="p-6 md:p-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Agendamento Cirúrgico</h1>
          <p className="text-slate-600">Visualize e organize suas cirurgias por data.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 sticky top-8">
              <CardContent className="p-2">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="p-4"
                  locale={ptBR}
                  disabled={(d) => d < new Date('1990-01-01')}
                  initialFocus
                />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>
                  Cirurgias para {date ? date.toLocaleDateString('pt-BR') : '...'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {surgeries.length > 0 ? (
                  surgeries.map(surgery => (
                    <div key={surgery.id} className="p-4 rounded-xl border border-slate-200 bg-white">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-slate-900">{surgery.patient_name}</h4>
                          <p className="text-sm text-slate-600">{surgery.procedure_name}</p>
                        </div>
                        <Badge className={statusColors[surgery.status]}>{surgery.status}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-slate-700">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span>{surgery.scheduled_time || 'A definir'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-700">
                          <MapPin className="w-4 h-4 text-purple-500" />
                          <span>{surgery.hospital}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-700 col-span-2">
                          <User className="w-4 h-4 text-orange-500" />
                          <span>Dr(a). {surgery.main_surgeon}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-slate-500">
                    <Activity className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                    <p className="font-medium">Nenhuma cirurgia agendada para esta data.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
