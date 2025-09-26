import { supabase } from "@/lib/supabaseClient";

const TABLE = "patients";

export async function listarPacientes(orderBy = "full_name", ascending = true) {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order(orderBy, { ascending });
  return { data, error };
}

export async function criarPaciente(data) {
  const { data: created, error } = await supabase
    .from(TABLE)
    .insert([data])
    .select()
    .single();

  return { data: created, error };
}

export async function atualizarPaciente(id, updates) {
  const { data, error } = await supabase
    .from(TABLE)
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  return { data, error };
}

export async function deletarPaciente(id) {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("id", id);

  return { error };
}
