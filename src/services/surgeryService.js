import { supabase } from "@/lib/supabaseClient";

const TABLE = "surgeries";

export async function listarCirurgias() {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("scheduled_date", { ascending: true });

  return { data, error };
}

export async function criarCirurgia(data) {
  const { data: created, error } = await supabase
    .from(TABLE)
    .insert([data])
    .select()
    .single();

  return { data: created, error };
}

export async function atualizarCirurgia(id, updates) {
  const { data, error } = await supabase
    .from(TABLE)
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  return { data, error };
}

export async function deletarCirurgia(id) {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("id", id);

  return { error };
}
