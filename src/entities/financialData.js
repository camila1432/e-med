const financialData = [
  {
    surgery_id: "s001",
    patient_name: "João da Silva",
    procedure_name: "Colecistectomia",
    hospital: "Hospital São Lucas",
    surgery_date: "2025-09-20",
    invoice_amount: 8000,
    received_amount: 8000,
    payment_date: "2025-09-22",
    payment_status: "pago_total",
    assistant_payments: [],
    notes: "Pagamento completo realizado."
  },
  {
    surgery_id: "s002",
    patient_name: "Maria Souza",
    procedure_name: "Hérnia Inguinal",
    hospital: "Hospital Santa Clara",
    surgery_date: "2025-09-23",
    invoice_amount: 6000,
    received_amount: 0,
    payment_date: null,
    payment_status: "pendente",
    assistant_payments: [],
    notes: ""
  }
];

export default financialData;
