import fs from 'fs'

export const readDatabase = (fileName) => {
  return JSON.parse(fs.readFileSync(`./database/${fileName}.json`))
}

export const writeDatabase = (fileName, data) => {
  return fs.writeFileSync(`./database/${fileName}.json`, JSON.stringify(data, null, 4))
}