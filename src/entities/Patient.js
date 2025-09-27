import { criarPaciente, atualizarPaciente, listarPacientes } from "@/services/patientService";

const Patient = {
  async list(orderBy = "-created_at") {
    const { data, error } = await listarPacientes();

    if (error) {
      console.error("Erro ao listar pacientes:", error.message);
      return [];
    }

    if (orderBy === "-created_date") {
      return [...data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    return data;
  },

  async create(data) {
    const { data: created, error } = await criarPaciente(data);

    if (error) {
      console.error("Erro ao criar paciente:", error.message);
      throw error;
    }

    return created;
  },

  async update(id, updates) {
    const { data: updated, error } = await atualizarPaciente(id, updates);

    if (error) {
      console.error("Erro ao atualizar paciente:", error.message);
      throw error;
    }

    return updated;
  }
};

export default Patient;
