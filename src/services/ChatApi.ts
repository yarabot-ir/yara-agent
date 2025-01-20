import Cookies from 'js-cookie';
const API = import.meta.env.VITE_BASE_URL;

export const GetChat = async (id: string | number) => {
  try {
    const token = Cookies.get('token');

    const response = await fetch(`${API}chat/${id}/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (e) {
    // console.log(e);
    return e;
  }
};

export const newChatApi = async (text: string) => {
  try {
    const token = Cookies.get('token');
    const response = await fetch(`${API}/new_chat?text=${text}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (e) {
    // return { status: 200, res: 'نمیدونم والا', chatId: 3, fake: true };
    // console.log(e);
    return e;
  }
};

export const History = async () => {
  try {
    const token = Cookies.get('token');
    const response = await fetch(`${API}/chats`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (e) {
    // return { status: 200, res: 'نمیدونم والا', chatId: 3, fake: true };
    // console.log(e);
    return e;
  }
};

export const Chat = async (text: string, id: number) => {
  try {
    const token = Cookies.get('token');
    const response = await fetch(`${API}/chat/${id}/?text=${text}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (e) {
    // return { status: 200, res: 'نمیدونم والا', chatId: 3, fake: true };
    console.log(e);
    return e;
  }
};

// export const Asr = async (voice: any) => {
//   try {
//     const token = Cookies.get('token');
//     const response = await fetch(`${API}/asr`, {
//       method: 'POST',
//       body: {
//         file: voice,
//       },
//       headers: {
//         accept: 'multipart/form-data',
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     const data = await response.json();
//     return data;
//   } catch (e) {
//     console.log(e);
//     return e;
//   }
// };
