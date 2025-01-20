import http from './httpService';

export async function GetHistoryData() {
  return await http.get('chats').then(({ data }) => data);
}
export async function postNewChat(fileType: string, body: any) {
  return await http.post(`new_chat?type=${fileType}`, body).then(( data ) => data);
}
