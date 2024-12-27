import axios from "axios";



const generateRoomCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

const handleCreateRoom = async (e,formData,token) => {
  e.preventDefault();
  try {
    const myUsername=localStorage.getItem("myUsername");
    
    const GenerateRoomCode = generateRoomCode();
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/private/room/create`,
      {
        roomName: formData.roomName,
        myusername: myUsername,
        roomCode: GenerateRoomCode,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response) {
      console.log("roomcreated successfully");
      console.log(formData.myUsername);
    }

    const request = await axios.post(
      `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/private/user/add`,
      {
        roomName: formData.roomName,
        myusername: formData.myUsername,
        roomCode: GenerateRoomCode,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (request) {
      console.log("newly created room was added to Admins (user) database");
    }
  } catch (error) {
    console.log(error);
  }
};

const handleSubscribeRoom=async(e,formData,token)=>{
  e.preventDefault();
  try {
    const myUsername=localStorage.getItem("myUsername");
    console.log(myUsername);
    const response=await axios.post(
      `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/private/user/add`,
      { roomName:formData.roomName,
        myusername:myUsername,
        roomCode:formData.roomCode,
       },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    if(response){
      console.log("room subscribed")
    }
  } catch (error) {
    console.log(error);
  }
  }



const handleChange=(e,formData,setFormData)=>{
  const {name,value}=e.target;
  setFormData({
    ...formData,
    [name]:value,
  });
  console.log(value);
  };

  // GET Subscribed Room data
  const privateRoomRender1=async(token,setRoomData)=>{
  try {
    const response=await axios.get( `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/private/room/data`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if(response){
      setRoomData(response.data.roomData);
    }
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
  }

  const validUsername=async (formData,token)=>{
    const trimmedUsername=formData.myUsername.trim();
    if(trimmedUsername==="") return;
    try {
        const response = await axios.get(
            `${
              import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
            }/data/${trimmedUsername}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        if(response.status===200){
            localStorage.setItem("myUsername", trimmedUsername);
        }

    } catch (error) {
    console.log(error)
    }
}


export{handleCreateRoom,handleChange,handleSubscribeRoom,privateRoomRender1,validUsername}
