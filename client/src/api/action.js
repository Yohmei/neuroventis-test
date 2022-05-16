const SERVER_URL = process.env.REACT_APP_SERVER_URL

export const get = async (endpoint) => {
  const url = SERVER_URL + endpoint
  const response = await fetch(url)

  if (response.ok) {
    return response.json()
  }

  return null
}

export const post = async (endpoint, data) => {
  const url = SERVER_URL + endpoint

  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'same-origin',
      body: JSON.stringify(data),
    })

    return response.json()
  } catch (e) {
    throw e
  }
}
