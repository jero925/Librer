export interface NotionBookOptionsResults {
    Author: SelectOption[]
    Estado: SelectOption[]
    Puntaje: SelectOption[]
    Type: SelectOption[]    
}

export interface SelectOption {
    id: string;
    value: string;
}

export interface SelectNombre {
    id: string;
    nombre: string;
}