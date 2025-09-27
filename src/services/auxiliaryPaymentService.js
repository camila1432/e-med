import { supabase } from "@/lib/supabaseClient";

const TABLE = "auxiliary_payments";

export async function listarPagamentos(orderBy = "due_date", descending = true) {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order(orderBy, { ascending: !descending });
  return { data, error };
}

export async function criarPagamento(data) {
  const { data: result, error } = await supabase
    .from(TABLE)
    .insert([data])
    .select()
    .single();
  return { data: result, error };
}

export async function atualizarPagamento(id, updates) {
  const { data, error } = await supabase
    .from(TABLE)
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  return { data, error };
}

export async function deletarPagamento(id) {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("id", id);
  return { error };
}
