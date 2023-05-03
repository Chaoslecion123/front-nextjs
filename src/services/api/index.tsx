const API = process.env.NEXT_PUBLIC_API_URL;

const endPoints = {
  auth: {
    login: `${API}/users/login/`,
  },
  dashboard: {
    clients: {
      add: `${API}/clients/`,
      list: `${API}/clients/`,
      update: (id: any) => `${API}/clients/${id}/`,
    },
    coordenates: {
      add: `${API}/coordenadas/`,
      list: `${API}/coordenadas/`,
      get: (id: any) => `${API}/coordenadas/${id}/`,
    },
  },
};

export default endPoints;
