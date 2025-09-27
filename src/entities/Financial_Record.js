import {
  listarRegistros,
  criarRegistro,
  atualizarRegistro,
  deletarRegistro
} from "@/services/financialService";

const FinancialRecord = {
  async list(sortKey = "-surgery_date", limit = 50) {
    const { data, error } = await listarRegistros(sortKey);

    if (error) {
      console.error("Erro ao listar registros financeiros:", error.message);
      return [];
    }

    return Array.isArray(data) ? data.slice(0, limit) : [];
  },

  async create(data) {
    const { data: result, error } = await criarRegistro(data);
    if (error) {
      console.error("Erro ao criar registro financeiro:", error.message);
      throw error;
    }
    return result;
  },

  async update(id, updates) {
    const { data, error } = await atualizarRegistro(id, updates);
    if (error) {
      console.error("Erro ao atualizar registro financeiro:", error.message);
      throw error;
    }
    return data;
  },

  async delete(id) {
    const { error } = await deletarRegistro(id);
    if (error) {
      console.error("Erro ao deletar registro financeiro:", error.message);
      throw error;
    }
  }
};

export default FinancialRecord;
