export interface NotionBooks {
    message?: string;
    books?: NotionBookItem[];
}

export interface NotionBookItem {
    message?:        string;
    Author:          SelectProperty[];
    "Año Leido":     string[];
    Estado:          SelectProperty;
    Genre:           string[];
    ISBN_13:         string;
    Leidas:          null;
    Name:            string;
    "Start and End": Date;
    "Total pags":    null;
    Type:            SelectProperty[];
    icon:            Icon;
    page_id:         string;
}

export interface Icon {
    external: External;
    type:     string;
}

export interface External {
    url: string;
}

export interface SelectProperty {
    id: string;
    value: string;
}
