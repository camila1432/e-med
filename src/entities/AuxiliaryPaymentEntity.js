import {
  listarPagamentos,
  criarPagamento,
  atualizarPagamento,
  deletarPagamento,
} from "@/services/auxiliaryPaymentService";

const AuxiliaryPaymentEntity = {
  async list(sortKey = "due_date", limit = 50) {
    const { data, error } = await listarPagamentos(sortKey);
    if (error) {
      console.error("Erro ao listar pagamentos auxiliares:", error.message);
      return [];
    }
    return Array.isArray(data) ? data.slice(0, limit) : [];
  },

  async create(data) {
    const { data: result, error } = await criarPagamento(data);
    if (error) {
      console.error("Erro ao criar pagamento auxiliar:", error.message);
      throw error;
    }
    return result;
  },

  async update(id, updates) {
    const { data, error } = await atualizarPagamento(id, updates);
    if (error) {
      console.error("Erro ao atualizar pagamento auxiliar:", error.message);
      throw error;
    }
    return data;
  },

  async delete(id) {
    const { error } = await deletarPagamento(id);
    if (error) {
      console.error("Erro ao deletar pagamento auxiliar:", error.message);
      throw error;
    }
  },
};

export default AuxiliaryPaymentEntity;
