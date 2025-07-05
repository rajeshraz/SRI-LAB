import React from 'react';
import profileImg from '../User/images/sudhamama.jpg';
import './stylings/Profile.css';


export default function Profile() {
  return (
    <div className="profile-container">
      <div className="profile-card">
        <img 
          src={profileImg} 
          alt="Founder" 
          className="profile-image" 
        />
        <h1 className="profile-heading">About the Founder</h1>
        <div className="profile-description">
        <p>
  Sudhakar Kanikella, the accomplished founder of Sri Clinical Laboratory, is a highly skilled and experienced lab technician with decades of expertise in clinical diagnostics. 
  His dedication to precision and excellence has redefined the standards of laboratory services. Known for his hands-on approach and deep technical knowledge, 
  Sudhakar has been instrumental in ensuring the delivery of accurate and timely results that build trust among patients and healthcare providers alike. 
  His relentless commitment to innovation and service quality has transformed Sri Clinical Laboratory into a symbol of reliability and excellence in the field.
</p>


<p>
  శ్రీ క్లినికల్ లాబొరేటరీ స్థాపకుడు సుధాకర్ కనికెళ్ళ, అనుభవజ్ఞుడైన ల్యాబ్ టెక్నీషియన్‌గా విస్తారమైన జ్ఞానం కలిగినవారు. 
  క్లినికల్ డయాగ్నస్టిక్స్ రంగంలో అనుభవసంపన్నుడైన ఆయన, ల్యాబొరేటరీ సేవలకు అత్యుత్తమ ప్రమాణాలు ఏర్పరచడంలో కీలక పాత్ర పోషించారు. 
  ఖచ్చితత్వం మరియు సమయానుకూల ఫలితాలను అందించడంలో ఆయన సాంకేతిక నైపుణ్యం మరియు నిబద్ధత విశేషమైనవి. 
  సుధాకర్ యొక్క ఆవిష్కరణాత్మక ఆలోచనశక్తి మరియు సేవా నాణ్యత పట్ల ఉన్న అంకితభావం, శ్రీ క్లినికల్ లాబొరేటరీని విశ్వసనీయతకు ప్రతీకగా నిలిపింది.
</p>


        </div>
      </div>
    </div>
  );
}
