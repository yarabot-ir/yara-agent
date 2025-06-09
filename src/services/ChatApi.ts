import http from './httpService';

const API = import.meta.env.VITE_BASE_URL;
const AgentId = import.meta.env.VITE_BASE_AGENT_ID;
const AgentToken = import.meta.env.VITE_BASE_AGENT_TOKEN;

export const AgentName = async () => {
  try {
    const AgentData = localStorage.getItem('preferences');
    const expireDateStr = localStorage.getItem('expire_date');
    const savedTime = expireDateStr ? new Date(expireDateStr).getTime() : 0;
    const currentTime = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;

    if (AgentData && currentTime - savedTime <= twentyFourHours) {
      const response = await fetch(`${API}agent/bot/${AgentId}/preferences`, {
        method: 'GET',
        headers: {
          Authorization: `${AgentToken}`,
          'Accept-Language': 'fa',
        },
      });

      const data = await response.json();
      localStorage.setItem('preferences', JSON.stringify(data));
      localStorage.setItem(
        'expire_date',
        new Date(Date.now() - 25 * 60 * 60 * 1000).toString()
      );

      return data;
    } else {
      return JSON.parse(AgentData || '');
    }
  } catch (e) {
    return e;
  }
};

export const AgentHistory = async (sessions: string) => {
  try {
    const response = await fetch(`${API}agent/bot/${AgentId}/${sessions}/`, {
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
