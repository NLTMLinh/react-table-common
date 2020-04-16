const API_URL = 'https://5b0f708f3c5c110014145cc9.mockapi.io/api/nexacro-demo'

class EmployeeApi {
  get = () => {
    return fetch(API_URL)
      .then((res) => res.json())
      .then((result) => result)
      .catch((err) => {
        return new Error(err)
      })
  }

  post = async (data) => {
    return await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
      .then(data => data)
      .catch(err => new Error(err))
  }

  put = async (data) => {
    return await fetch(`${API_URL}/${data.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
      .then(data => data)
      .catch(err => new Error(err))
  }

  remove = async (id) => {
    return await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
      .then(data => data)
      .catch(err => new Error(err))
  }

  save = (payload, type) => {
    let promise = []
    if(type === "CREATE") {
       promise = payload.map((item) => this.post(item))
    } else if (type === "DELETE") {
       promise = payload.map((item) => this.remove(item))
    }
    return Promise.all(promise)
    .then(result => {
      return result
    })
    .catch(err => new Error(err))
  }
}
const EmployeeService = new EmployeeApi()
export default EmployeeService