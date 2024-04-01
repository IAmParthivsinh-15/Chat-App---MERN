import  { useState } from 'react'
import { toast } from 'react-toastify';

const useProfileImg = () => {
    const [profileImage, setProfileImage] = useState(null);
    const handleImgChange = (e)=>{
      console.log("e.t.f0 ",e.target.files[0])
      const file = e.target.files[0];

        if(file && file.type.startsWith("image/")){
        console.log("file ",file)
        const reader = new FileReader();

        reader.onloadend =()=>{
            setProfileImage(reader.result);
        }
        reader.readAsDataURL(file);
      }
      else{
        toast.error("Please Insert Image");
        setProfileImage(null);
      }
    }
  return {
    handleImgChange , profileImage
  }
}

export default useProfileImg
