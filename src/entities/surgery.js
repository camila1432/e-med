const Surgery = {
  list: async (sortKey = "") => {
    const response = await fetch("/api/surgeries");

    if (!Array.isArray(data)) {
      console.warn("Surgery.list(): retorno não é array", data);
      return Object.values(data); 
    }

    if (sortKey === "-created_date") {
      return [...data].sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    }

    return data;
  }
};

export default Surgery;
