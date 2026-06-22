import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export function useApi() {
  const { getAccessTokenSilently } = useAuth0();

  const callApi = async (endpoint, method = "GET", data = null) => {
    const token = await getAccessTokenSilently();

    return axios({
      url: `http://localhost:5000${endpoint}`,
      method,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return { callApi };
}
