import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"
import { getRandomPrompt } from "../utils";
import { preview } from "../assets";
import { FormField, Loader } from "../components";

export default function CreatePost() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({...form, prompt: randomPrompt})
  };

  const generateImg = async () => {
    if(form.prompt){
      try {
        setGeneratingImg(true)
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/dalle`, {
         method: "POST",
         headers: {
          "Content-Type": "application/json"
         },
         body: JSON.stringify({ prompt: form.prompt }) 
        })

        const data = await response.json()
        setForm({...form, photo: `data:image/jpeg;base64,${data.photo}`})

      } catch (error) {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: `${error}`,
          showConfirmButton: false,
          timer: 1500
        })
      }
      setGeneratingImg(false)
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Please type something so we can generate an image',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(form.prompt && form.photo) {
      setLoading(true)

      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/post`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({...form})
        })

        await response.json()
        navigate("/")
      } catch (error) {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: `${error}`,
          showConfirmButton: false,
          timer: 1500
        })
      }
      finally {
        setLoading(false)
      }
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: "Enter a prompt in order to continue",
        showConfirmButton: false,
        timer: 1500
      })
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-3xl ">Create</h1>
        <p className="mt-2 text-[#666e75] text-lg max-w-lg ">
          Create imaginative ans visually stunning images generated through
          DALL-E AI and share them with the community
        </p>
      </div>
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName={"Your Name"}
            type={"text"}
            name={"name"}
            placeholder={"John Doe"}
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName={"Prompt"}
            type={"text"}
            name={"prompt"}
            placeholder={"Type something"}
            value={form.prompt}
            handleChange={handleChange}
            handleSurpriseMe={handleSurpriseMe}
            isSurpriseMe
          />
          <div className="relative bg-gray-100 border border-gray-300 text-gray-900 tex-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img src={form.photo} alt={form.prompt} className="w-full h-full object-contain"/>
            ) : (
              <img src={preview} alt="preview" className="w-9/12 object-contain opacity-40 h-9/12" />
            )}
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-black/50 rounded-lg ">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={() => generateImg()}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto py-3 px-5 text-center "
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>
        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-lg ">
            Once you have created the image you want, you can share it with others
          </p>
          <button
            type="submit"
            className="text-white mt-3 bg-[#6469ff] font-medium rounded text-sm w-full sm:w-auto px-5 py-3 text-center "
          >
            {loading? "Sharing..." : "Share with the community"}
          </button>
        </div>
      </form>
    </section>
  );
}
