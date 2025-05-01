
interface TableResponse {
  tableNumber: number;
  message: string;
}

export const fetchTableNumber = async (): Promise<TableResponse> => {
  try {

    const response = await fetch(
      'https://us-central1-net-planetxr-buffettlunch.cloudfunctions.net/practiceProject'
    );
    
    if (!response.ok) {

      console.warn(`API returned error status: ${response.status}. Using dummy data.`);
      return getDummyTableData();
    }
    
    try {
      const data = await response.json();
      console.log("🚀 ~ fetchTableNumber ~ API data:", data);
      

      if (typeof data.tableNumber === 'number' && typeof data.message === 'string') {
        return data;
      } else {
        console.warn("API returned invalid data format. Using dummy data.");
        return getDummyTableData();
      }
    } catch (parseError) {
      console.warn("Error parsing API response:", parseError);
      return getDummyTableData();
    }
    
  } catch (error) {
    console.warn('Error fetching table number from API:', error);
    return getDummyTableData();
  }
};

// Function to generate dummy table data
function getDummyTableData(): TableResponse {

  const randomTable = Math.floor(Math.random() * 10) + 1;
  
  return {
    tableNumber: randomTable,
    message: `Welcome to table ${randomTable}!`
  };
}