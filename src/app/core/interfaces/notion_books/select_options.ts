export interface NotionBookOptionsResults {
    Author: SelectOption[]
    Estado: SelectOption[]
    Puntaje: SelectOption[]
    Type: SelectOption[]    
}

export interface SelectOption {
    id: string;
    name: string;
}