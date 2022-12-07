// import * as FileSystem from 'expo-file-system'
import FormData from 'form-data'

const axios = require("axios")
// const fs = require("fs")
const JWT = `Bearer ${process.env.PINATA_JWT}`

console.log({ PINATA_API_KEY: process.env.PINATA_API_KEY })
console.log({ PINATA_API_SECRET: process.env.PINATA_API_SECRET })
console.log({ PINATA_JWT: process.env.PINATA_JWT })

function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(",")[1])
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ab], { type: "image/jpeg" })
}

export const pinFileToIPFS = async (file) => {
  const formData = new FormData()
  // const src = "path/to/file.png"

  // const file = fs.createReadStream(src)
  console.log({ file })

  // const metadata = JSON.stringify({
  //   name: "File name",
  // })
  // formData.append("pinataMetadata", metadata)

  // const options = JSON.stringify({
  //   cidVersion: 0,
  // })
  // formData.append("pinataOptions", options)

  const blob = dataURItoBlob(file)
  formData.append("file", blob)

  try {
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data`,
        Authorization: JWT,
      },
    })
    // console.log(res.data)
  } catch (error) {
    console.log(error)
  }

  // try {
  //   const response = await FileSystem.uploadAsync(
  //     `https://api.pinata.cloud/pinning/pinFileToIPFS`,
  //     fileUri,
  //     {
  //       httpMethod: "POST",
  //       uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
  //       headers: {
  //         "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
  //         Authorization: JWT,
  //       },
  //     },
  //   )
  //   console.log(JSON.stringify(response, null, 4))
  // } catch (error) {
  //   console.log(error)
  // }
}
