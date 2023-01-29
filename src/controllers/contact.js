import { controllers } from "../common";

export async function getContact(setContact) {
    try {
        const requestOptions = {
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('jwt')
          },
        };
        const res = await fetch(controllers.contact, requestOptions);
        const data = await res.json();
        if (res.ok) {
            if (typeof setContact === 'function')
                setContact(data)
            return data;
        }
    }
    catch(ex) {
        console.log(ex)
    }
  }