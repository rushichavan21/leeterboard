import { useRecoilState } from "recoil";
import "./Halo.css";
import { orderbyAtom ,loadingAtom } from "@/Atoms/Atoms";
import axios from "axios";
import { useToast } from "@/Hooks/use-toast";
const Halo = () => {
  const [order,setorder]=useRecoilState(orderbyAtom);
  const [loading ,setIsLoading]=useRecoilState(loadingAtom);
  const { toast } = useToast();
  const handlehard=async () => {
   try {
    setIsLoading(1);
    const response=await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/hardupdate`);
    setIsLoading(0);
    if(response){
      toast({
        title: `Hard update successfull`
      });
      console.log("Hard update successfull")
      setTimeout(() => {
        window.location.reload();
      }, 2000);
     
    }
   } catch (error) {
    setIsLoading(0);
    toast({
      title: `Hard update unsuccessfull`
    });
    console.log("Hard update unsuccessfull")
   }

    }
  

  return (
    <div className="halo-wrapper">
      <div className="logo-holder">
        <img src="./logo2.png" alt="" className="halo-logo" />
      </div>
      <div className="halo-options">
      <div className="order-by">
  <label htmlFor="order-select" className="halo-label">Order By</label>
  <select
  name="cars"
  id="order-select"
  value={order}
  onChange={(e) => setorder(e.target.value)}
>
  <option value="total-questions" className="orderby-options">Total Questions</option>
  <option value="rating" className="orderby-options">Rating</option>
  <option value="easy" className="orderby-options">Easy questions</option>
  <option value="medium" className="orderby-options">Medium questions</option>
  <option value="hard" className="orderby-options">Hard questions</option>
</select>

</div>

<div className="search">
  <label htmlFor="search-input" className="halo-label label2">Search</label>
  <input type="text" id="search-input" placeholder="Search..." />
</div>
      </div>
      <div className="halo-msg"><p>This Info Updates Automaticaly Every 15 Minutes</p>
      <button className="halo-btn" onClick={handlehard}>Hard Update</button>
      </div>
      <div className="halo-msg2"><p>Want your name on leeterboard?</p>
      <a href="" className="msg2-anchor" onClick={()=>{window.open("https://docs.google.com/forms/d/e/1FAIpQLSeeNzLZ--OEKLqAaRjZqPW3VIG74LQy1341UQIjJKpHj0R4oQ/viewform?usp=sharing","_blank", "noopener noreferrer")}}>Click here</a>
      </div>
    </div>
  );
};

export default Halo;
