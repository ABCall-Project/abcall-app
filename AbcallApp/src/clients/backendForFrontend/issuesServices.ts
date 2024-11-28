import Config from "react-native-config";

class IssuesServices {
    baseUrl: string;
    constructor() {
        this.baseUrl = Config.ABCALL_BFF_BASE_URL;
    }

    async getIssuesPaginationByUserId(user_id: string, page: number, limit: number,  token: string) {
        const header = new Headers();
        header.append('Authorization', `Bearer ${token}`);
        const response = await fetch(`${this.baseUrl}/issues/find?user_id=${user_id}&page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: header,
        });
        return await response.json();
    }
}

export {  IssuesServices };
