import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="bg-img-home">
      <h1 className="head">Find The Job That Fits Your Life</h1>
      <p className="para">
        Millions of people are searching for jobs, salary, information, company
        reviews.
      </p>
      <div>
        <Link to="/jobs">
          <button type="button" className="button-el">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)
export default Home
