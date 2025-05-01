
interface TableResponse {
    tableNumber: string;
    message: string;
  }
  
  export const fetchTableNumber = async (): Promise<TableResponse> => {
    try {
      const response = await fetch(
        'https://us-central1-net-planetxr-buffettlunch.cloudfunctions.net/practiceProject'
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching table number:', error);
      throw error;
    }
  };