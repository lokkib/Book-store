import ContentLoader from 'react-content-loader'

const Skeleton = () => (
  <ContentLoader 
    speed={2}
    width={300}
    height={628}
    viewBox="0 0 300 628"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="4" y="498" rx="3" ry="3" width="284" height="109" /> 
    <rect x="4" y="6" rx="0" ry="0" width="285" height="422" /> 
    <rect x="5" y="443" rx="0" ry="0" width="284" height="39" />
    </ContentLoader>
)

export default Skeleton
