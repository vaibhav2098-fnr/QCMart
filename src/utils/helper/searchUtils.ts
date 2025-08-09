/**
 * Search utility functions for filtering products and categories
 */

export interface SearchableItem {
  id: string | number;
  name?: string;
  title?: string;
  [key: string]: any;
}

/**
 * Filters an array of items based on a search query
 * @param items - Array of items to search through
 * @param query - Search query string
 * @param searchFields - Array of field names to search in
 * @returns Filtered array of items
 */
export const filterItems = (
  items: SearchableItem[],
  query: string,
  searchFields: string[] = ['name', 'title']
): SearchableItem[] => {
  if (!query || query.trim().length === 0) {
    return items;
  }

  const normalizedQuery = query.toLowerCase().trim();
  
  // Early return for very short queries to improve performance
  if (normalizedQuery.length < 2) {
    return items.filter((item) => {
      return searchFields.some((field) => {
        const fieldValue = item[field];
        if (typeof fieldValue === 'string') {
          return fieldValue.toLowerCase().startsWith(normalizedQuery);
        }
        return false;
      });
    });
  }

  return items.filter((item) => {
    return searchFields.some((field) => {
      const fieldValue = item[field];
      if (typeof fieldValue === 'string') {
        return fieldValue.toLowerCase().includes(normalizedQuery);
      }
      return false;
    });
  });
};

/**
 * Filters products based on search query
 * @param products - Array of products
 * @param query - Search query
 * @returns Filtered products array
 */
export const filterProducts = (products: any[], query: string): any[] => {
  return filterItems(products, query, ['name', 'title']);
};

/**
 * Filters categories based on search query
 * @param categories - Array of categories
 * @param query - Search query
 * @returns Filtered categories array
 */
export const filterCategories = (categories: any[], query: string): any[] => {
  return filterItems(categories, query, ['name', 'title']);
};

/**
 * Performs a combined search on both products and categories
 * @param products - Array of products
 * @param categories - Array of categories
 * @param query - Search query
 * @returns Object with filtered products and categories
 */
export const performSearch = (
  products: any[],
  categories: any[],
  query: string
): { filteredProducts: any[]; filteredCategories: any[] } => {
  const filteredProducts = filterProducts(products, query);
  const filteredCategories = filterCategories(categories, query);

  return {
    filteredProducts,
    filteredCategories,
  };
};

/**
 * Debounces a search function to avoid excessive API calls
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}; 