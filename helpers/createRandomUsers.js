import axios from "axios"

const createRandomUsers = async (numberOfUsers, indexAdjust) => {
  return await Promise.allSettled(
    [...Array(Number(numberOfUsers)).keys()]
      .map(async (user, index) => {
        const resRandomData = await axios.get('https://randomuser.me/api/')
        const randomData = resRandomData.data?.results[0]

        return {
          id: index + indexAdjust,
          name: `${randomData.name.first} ${randomData.name.last}`,
          email: randomData.email,
          phone: randomData.phone,
          birthday: randomData.dob.date
        }
      })
  ).then((res) => {
    return res
      .filter(newUser => newUser.status === 'fulfilled')
      .map(newUser => newUser.value)
  })
}

export default createRandomUsers