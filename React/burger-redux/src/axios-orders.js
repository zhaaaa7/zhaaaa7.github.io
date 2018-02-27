import axios from 'axios';

//creat customized aixos instance
const instance=axios.create({
    baseURL:'https://react-burger7.firebaseio.com/',
});

export default instance;