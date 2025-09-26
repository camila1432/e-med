import financialData from "./financialData";

const FinancialRecord = {
  list: async (sortKey = "", limit = 50) => {
    const sorted = [...financialData].sort((a, b) => {
      if (sortKey === "-surgery_date") {
        return new Date(b.surgery_date) - new Date(a.surgery_date);
      }
      return 0;
    });
    return sorted.slice(0, limit);
  },
};

export default FinancialRecord;
