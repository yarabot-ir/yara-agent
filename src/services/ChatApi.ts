import http from './httpService';

const API = import.meta.env.VITE_BASE_URL;
const AgentId = import.meta.env.VITE_BASE_AGENT_ID;
const AgentToken = import.meta.env.VITE_BASE_AGENT_TOKEN;

export const AgentName = async () => {
  try {
    const response = await fetch(`${API}agent/bot/${AgentId}/preferences`, {
      method: 'GET',
      headers: {
        Authorization: `${AgentToken}`,
        'Accept-Language': 'fa',
      },
    });

    const data = await response.json();
    return data;
  } catch (e) {
    return e;
  }
};

export const ReactMessage = async (
  session_id: any,
  message_id: any,
  react: any
) => {
  try {
    const response = await http.post(
      `agent/bot/${AgentId}/${session_id}/${message_id}?react=${react}`,
      ''
    );
    const data = await response;
    return data;
  } catch (e) {
    return e;
  }
};
