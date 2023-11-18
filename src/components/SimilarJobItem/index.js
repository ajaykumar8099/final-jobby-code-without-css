import {Link} from 'react-router-dom'
import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

const SimilarJobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    title,
    rating,
  } = jobDetails
  return (
    <li>
      <div>
        <div>
          <img src={companyLogoUrl} alt="similar job company logo" />
          <div>
            <h1>{title}</h1>
            <div className="rating-container">
              <BsStarFill className="rating-icon" />
              <p>{rating}</p>
            </div>
          </div>

          <h1>Description</h1>
          <p>{jobDescription}</p>
          <div>
            <div>
              <MdLocationOn className="location-logo" />
              <p>{location}</p>
            </div>
            <div>
              <BsFillBriefcaseFill className="brief-logo" />
              <p>{employmentType}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobItem
