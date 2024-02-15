
 import axios from 'axios'

const URL = 'https://api.itjobs.pt/job/list.json';

export const fetchJobList = async () => {
    try {
        const res = await axios.get(URL, {
            params: {
                api_key: '6f48b3a43516ad0ef5801da959ea56ec',
                limit: 3000
            }
        });
        return res.data
    } catch (error) {
        throw error
    }
}
