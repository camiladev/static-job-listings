import config from '../config';

const URL_JOB = `${config.URL_BACKEND_TOP}/job`;

function getAll(){
    return fetch(`${URL_JOB}`).then(async (serverAnswer) => {
        if (serverAnswer.ok){
            const answer = await serverAnswer.json();
            return answer;
        }

        throw new Error("Can't connect to server !");
    });
}

export default {
    getAll,
};