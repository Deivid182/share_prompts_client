import FileSaver from "file-saver"
import { surpriseMePrompts } from "../constants";
import Swal from "sweetalert2";

export function getRandomPrompt(prompt) {
  //uses the prompt only if the user provides it, if is not that way, return a random value
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length)
  const randomPrompt = surpriseMePrompts[randomIndex]

  if(randomPrompt === prompt) return getRandomPrompt(prompt)

  //otherwise
  return randomPrompt
}

export async function downloadImage(_id, photo) {
  FileSaver.saveAs(photo, `download-${_id}.jpg`)

  setTimeout(() => {
    Swal.fire({
      position: 'bottom-end',
      icon: 'success',
      title: "Your image's been downloaded successfully",
      showConfirmButton: false,
      timer: 1500
    })
  }, 1500)
}