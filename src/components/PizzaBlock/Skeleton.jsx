import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader 
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f2f2f2"
    foregroundColor="#ecebeb"
   
  >
    <circle cx="144" cy="111" r="107" /> 
    <rect x="0" y="273" rx="9" ry="9" width="280" height="76" /> 
    <rect x="182" y="235" rx="0" ry="0" width="0" height="4" /> 
    <rect x="0" y="228" rx="9" ry="9" width="280" height="27" /> 
    <rect x="0" y="373" rx="9" ry="9" width="90" height="30" /> 
    <rect x="123" y="365" rx="19" ry="19" width="152" height="45" />
  </ContentLoader>
)

export default Skeleton