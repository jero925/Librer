export interface LoginForm {
    user: string;
    password: string;
}

export interface LoginResults {
    exists:  boolean;
    message?: string;
    token:    string;
}

export interface User {
    archived:         boolean;
    cover:            null;
    created_by:       TedBy;
    created_time:     Date;
    icon:             null;
    id:               string;
    in_trash:         boolean;
    last_edited_by:   TedBy;
    last_edited_time: Date;
    object:           string;
    parent:           Parent;
    properties:       Properties;
    public_url:       null;
    url:              string;
}

export interface TedBy {
    id:     string;
    object: string;
}

export interface Parent {
    database_id: string;
    type:        string;
}

export interface Properties {
    Contraseña: Contraseña;
    Usuario:    Usuario;
}

export interface Contraseña {
    id:        string;
    rich_text: RichText[];
    type:      string;
}

export interface RichText {
    annotations: Annotations;
    href:        null;
    plain_text:  string;
    text:        Text;
    type:        string;
}

export interface Annotations {
    bold:          boolean;
    code:          boolean;
    color:         string;
    italic:        boolean;
    strikethrough: boolean;
    underline:     boolean;
}

export interface Text {
    content: string;
    link:    null;
}

export interface Usuario {
    id:    string;
    title: RichText[];
    type:  string;
}
