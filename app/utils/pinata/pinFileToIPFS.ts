import FormData from 'form-data'

const axios = require("axios")
const JWT = `Bearer ${process.env.PINATA_JWT}`

function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(",")[1])
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ab], { type: "image/jpeg" })
}

export const pinFileToIPFS = async (file: string) => {
  console.log({ file })
  const formData = new FormData()
  const blob = dataURItoBlob(file)

  formData.append("file", blob)

  const metadata = JSON.stringify({
    name: "File name", // Ajouter un méchanisme pour le nom du fichier.
  })
  formData.append("pinataMetadata", metadata)

  const options = JSON.stringify({
    cidVersion: 0,
  })
  formData.append("pinataOptions", options)

  try {
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data`,
        Authorization: JWT,
      },
    })
  } catch (error) {
    console.log(error)
  }
}
