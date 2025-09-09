import assets from "../assets/assets"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const ProfilePage = () => {

  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState("Martin Johnson");
  const [bio, setBio] = useState("Hi Everyone, I am using this chat App!")

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/');
  }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly
    max-sm:flex-col backdrop-blur-2xl'>
      <div className='w-5/6 max-w-2xl backdrop-blur-3xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse'>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-10 flex-1">
          <h3 className='text-lg'>Profile Details</h3>
          <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
            <input onChange={(e)=>setSelectedImage(e.target.files[0])} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden/>
            <img src={selectedImage ? URL.createObjectURL(selectedImage) : assets.avatar_icon}
            alt="avatar icon" className={`w-12 h-12 ${selectedImage && 'rounded-full'}`}/>
            Upload Profile Image
          </label>
          <input onChange={(e)=>setName(e.target.value)} value={name}
          type="text" required placeholder='Your Name' 
          className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500'/>
          <textarea onChange={(e)=>setBio(e.target.value)} value={bio} rows={4}
          placeholder="Write your Profile bio..." required 
          className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"></textarea>
          <button type="submit" 
          className="bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer">Save</button>
        </form>
        <img className='max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10'
        src={assets.logo_icon} alt="Brand logo"/>
      </div>
    </div>
  )
}

export default ProfilePage