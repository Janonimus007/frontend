export interface Item {
    id: number;
    name: string;
  }
  
 export interface AutocompleteProps {
    data: Item[];
    onSelect: (item: Item) => void;
  }