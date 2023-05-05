export interface RespuestaTopHeadlines {
    status: string;
    data: Datos[];
  }

  export interface Datos {
    title: string;
    date: string;

  }