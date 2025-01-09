

import './SnapComponent.css'

const ProfileProgressBar = ({styles1,styles2,top,bottom,progress}) => {
  return (
    <div className={`profile-progress-bar-container ${styles1}`}>
      <div
        className={`progress-bar-fill ${styles2}`}
        style={{ width: `${Math.min(progress, 100)}%` }}
      ></div>
      <p className='ratio'>{`${top}/${bottom}`}</p>
      <p className="percentage">{`${progress}%`}</p>
    </div>
  );
};



const ProfileStats=({easyNumerator,mediumNumerator,hardNumerator,totalEasy,totalMedium,totalHard})=>{
  
  const easyPercentage = parseFloat(((easyNumerator / totalEasy) * 100).toFixed(2));
  const mediumPercentage = parseFloat(((mediumNumerator / totalMedium) * 100).toFixed(2));
  const hardPercentage = parseFloat(((hardNumerator / totalHard) * 100).toFixed(2));
  return(
    <div className='profile--stats'>
    <p className='fontfont3 easy-p'>Easy : {easyNumerator}</p>
    <p className='fontfont3 medium-p'>Medium : {mediumNumerator}</p>
    <p className='fontfont3 hard-p'>Hard : {hardNumerator}</p>
    <p className='fontfont3 total-p'>{`Total solved : ${easyNumerator+mediumNumerator+hardNumerator}`}</p>
    <img src="./verified.svg" alt="verified" className='verified' />
    <ProfileProgressBar styles1={'profile-easybar1'} styles2={'profile-easybar2'} top={easyNumerator} bottom={totalEasy} progress={easyPercentage}/>
    <ProfileProgressBar styles1={'profile-mediumbar1'} styles2={'profile-mediumbar2'} top={mediumNumerator} bottom={totalMedium} progress={mediumPercentage}/>
    <ProfileProgressBar styles1={'profile-hardbar1'} styles2={'profile-hardbar2'} top={hardNumerator} bottom={totalHard} progress={hardPercentage}/>
    </div>
  ) 
}
const SnapComponent = ({username,easyNumerator,mediumNumerator,hardNumerator,snapDivRef,totalEasy,totalMedium,totalHard,attendedContests,rating}) => {
  return (
    <div >
        <div className='profile--wrapper hidden' ref={snapDivRef}>
          <div className="profile--username"><p className='fontfont'>{username}</p></div>
          <div className="profile--brand"><p className='fontfont'>LeeterBoard</p></div>
          <ProfileStats easyNumerator={easyNumerator} mediumNumerator={mediumNumerator} hardNumerator={hardNumerator} totalEasy={totalEasy} totalMedium={totalMedium} totalHard={totalHard}/>
          <div className="profile--streak"><p className='fontfont2'>{`Contests Attended: ${attendedContests}`}</p> <p className='fontfont2'>{`Rating: ${rating}`}</p></div>
        </div>
    </div>
  )
}

export default SnapComponent