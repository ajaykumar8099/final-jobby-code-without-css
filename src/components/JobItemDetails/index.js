import {Component} from 'react'
import {MdLocationOn} from 'react-icons/md'
import {BsStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'
import SkillsCard from '../SkillsCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobData: {},
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getFormattedSimilarData = each => ({
    companyLogoUrl: each.company_logo_url,
    id: each.id,
    jobDescription: each.job_description,
    employmentType: each.employment_type,
    location: each.location,
    rating: each.rating,
    title: each.title,
  })

  getFormattedData = each => ({
    companyLogoUrl: each.company_logo_url,
    companyWebsiteUrl: each.company_website_url,
    employmentType: each.employment_type,
    id: each.id,
    jobDescription: each.job_description,
    lifeAtCompany: {
      description: each.life_at_company.description,
      imageUrl: each.life_at_company.image_url,
    },
    location: each.location,
    packagePerAnnum: each.package_per_annum,
    rating: each.rating,
    skills: each.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
    title: each.title,
  })

  getJobData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updateData = this.getFormattedData(data.job_details)
      const updatedSimilarData = data.similar_jobs.map(each =>
        this.getFormattedSimilarData(each),
      )
      console.log(updateData)
      console.log(updatedSimilarData)
      this.setState({
        jobData: updateData,
        similarJobsData: updatedSimilarData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobFailureView = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    return (
      <div className="job-details-failure">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <div className="btn-container">
          <button type="button" onClick={this.getJobData}>
            Retry
          </button>
        </div>
      </div>
    )
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsView = () => {
    const {jobData, similarJobsData} = this.state
    const {
      companyLogoUrl,
      employmentType,
      companyWebsiteUrl,
      jobDescription,
      packagePerAnnum,
      location,
      skills,
      lifeAtCompany,
      title,
      rating,
    } = jobData
    const {description, imageUrl} = lifeAtCompany
    return (
      <>
        <div className="job-dt-view-cont">
          <div className="job-item">
            <div className="logo-title-location-cont">
              <img src={companyLogoUrl} alt="job details company logo" />
              <div className="title-rating-cont">
                <h1 className="title-head">{title}</h1>
                <div className="rating-cont">
                  <BsStarFill className="rating-icon" />
                  <p className="rating-head">{rating}</p>
                </div>
              </div>
            </div>
            <div className="location-pak-container">
              <div className="location-employee-container">
                <MdLocationOn className="location-icon" />
                <p className="location-heading">{location}</p>
              </div>
              <div className="employee-type-cont">
                <BsFillBriefcaseFill className="brief-case" />
                <p>{employmentType}</p>
              </div>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
        </div>
        <hr />
        <div>
          <a href={companyWebsiteUrl}>Visit</a>
          <BiLinkExternal className="location-link" />
        </div>
        <p>{jobDescription}</p>
        <h1>Skills</h1>
        <ul>
          {skills.map(each => (
            <SkillsCard skillDetails={each} key={each.name} />
          ))}
        </ul>
        <h1>Life at Company</h1>
        <div>
          <p>{description}</p>
          <img src={imageUrl} alt="life at company" />
        </div>
        <h1>similar Jobs</h1>
        <ul className="similar-cont">
          {similarJobsData.map(each => (
            <SimilarJobItem jobDetails={each} key={each.id} />
          ))}
        </ul>
      </>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderJobFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div>{this.renderJobDetails()}</div>
      </>
    )
  }
}
export default JobItemDetails
