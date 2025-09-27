import {
  listarCirurgias,
  criarCirurgia,
  atualizarCirurgia,
  deletarCirurgia
} from "@/services/surgeryService";

const Surgery = {
  async list(sortKey = "") {
    const { data, error } = await listarCirurgias();

    if (error) {
      console.error("Erro ao listar cirurgias:", error.message);
      return [];
    }

    if (sortKey === "-created_date") {
      return [...data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    return data;
  },

  async create(data) {
    const { data: created, error } = await criarCirurgia(data);

    if (error) {
      console.error("Erro ao criar cirurgia:", error.message);
      throw error;
    }

    return created;
  },

  async update(id, updates) {
    const { data: updated, error } = await atualizarCirurgia(id, updates);

    if (error) {
      console.error("Erro ao atualizar cirurgia:", error.message);
      throw error;
    }

    return updated;
  },

  async delete(id) {
    const { error } = await deletarCirurgia(id);

    if (error) {
      console.error("Erro ao deletar cirurgia:", error.message);
      throw error;
    }
  }
};

export default Surgery;
