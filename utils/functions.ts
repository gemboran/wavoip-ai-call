export const checkResponseResult = (response: any) => {
    if (typeof response !== 'object') {
      return false;
    }
  
    return response?.type === 'success';
  };