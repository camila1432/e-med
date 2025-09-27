export const SurgeryModel = {
  list: async (sortKey = "") => {
    const response = await fetch("/api/surgeries");

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.warn("SurgeryModel.list(): retorno não é array", data);
      return Object.values(data);
    }

    if (sortKey === "-created_date") {
      return [...data].sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    }

    return data;
  }
};
