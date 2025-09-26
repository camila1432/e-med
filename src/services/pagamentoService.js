import { supabase } from "@/lib/supabaseClient";

export async function salvarPagamentoAuxiliar(data, surgery_id, financial_record_id) {
  const { error } = await supabase.from("auxiliary_payments").insert([{
    ...data,
    surgery_id,
    financial_record_id
  }]);

  return { error };
}
