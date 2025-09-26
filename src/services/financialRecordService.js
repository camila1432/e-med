import { supabase } from "@/lib/supabaseClient";

const TABLE = "financial_records";

export async function listarRegistros(orderBy = "created_at", descending = true) {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order(orderBy, { ascending: !descending });

  return { data, error };
}

export async function criarRegistro(data) {
  const { data: result, error } = await supabase
    .from(TABLE)
    .insert([data])
    .select()
    .single();

  return { data: result, error };
}

export async function atualizarRegistro(id, updates) {
  const { data, error } = await supabase
    .from(TABLE)
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  return { data, error };
}

export async function deletarRegistro(id) {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("id", id);

  return { error };
}
