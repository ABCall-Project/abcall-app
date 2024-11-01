import Config from "react-native-config";

class IssuesServices {
    baseUrl: string;
    constructor() {
        this.baseUrl = Config.ABCALL_BFF_BASE_URL;
    }

    async getIssuesPaginationByUserId(user_id: string, page: number, limit: number) {
        const response = await fetch(`${this.baseUrl}/issues/find?user_id=${user_id}&page=${page}&limit=${limit}`);
        return await response.json();
    }
}

export {  IssuesServices };
