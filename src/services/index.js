import axios from 'axios';

class Service {
  constructor() {
    this.axios = axios
  }

  get(...arg) {
    return this.axios.get(...arg);
  }

  post(...arg) {
    return this.axios.post(...arg);
  }

  delete(...arg){
    return this.axios.delete(...arg);
  }
  
  put(...arg){
    return this.axios.put(...arg);
  }

  patch(...arg){
    return this.axios.patch(...arg);
  }

}

export default new Service();