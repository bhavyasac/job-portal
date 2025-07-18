import React from 'react'
import Navbar from '../components/Navbar'
import { assets, jobsApplied } from '../assets/assets';
import moment from 'moment';
import Footer from '../components/Footer';


const Applications = () => {

  const [isEdit, setIsEdit] = React.useState(false);
  const [resume, setResume] = React.useState(null);
  return (
    <>
      <Navbar />
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        <h2 className='text-xl font-semibold'>Your Resume</h2>
        <div className='flex gap-2 mb-6 mt-3'>
          {
            isEdit
              ? <>
                <label className='flex items-center' htmlFor="resumeUpload">
                  <p className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2'>Select Resume</p>
                  <input id='resumeUpload' onChange={e => setResume(e.target.files[0])} accept='application/pdf' type="file" hidden />
                  <img src={assets.profile_upload_icon} alt="" />
                </label>
                <button onClick={e => setIsEdit(false)} className='bg-green-100 border border-green-400 rounded-lg px-4 py-2'>Save</button>
              </>
              : <div className='flex gap-2'>
                <a className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg' href="">
                  Resume
                </a>
                <button onClick={() => setIsEdit(true)} className='text-gray-500 border border-gray-300 px-4 py-2 rounded-lg hover:bg-fuchsia-100 hover:text-fuchsia-600'>
                  Edit
                </button>
              </div>

          }
        </div>
        <h2 className='text-xl font-semibold mb-4' >Jobs Applied</h2>
        <table className='min-w-full bg-white border rounded-lg'>
          <thead>
            <tr>
              <th className='py-3 px-4 border-b text-left'>Comapny</th>
              <th className='py-3 px-4 border-b text-left'>Job title</th>
              <th className='py-3 px-4 border-b text-left mx-sm:hidden'>Location</th>
              <th className='py-3 px-4 border-b text-left mx-sm:hidden'>Date</th>
              <th className='py-3 px-4 border-b text-left'>Status</th>
            </tr>
          </thead>
          <tbody>
            {jobsApplied.map((job, index) => true ? (
              <tr>
                <td className='py-3 px-4 border-b flex items-center gap-2'>
                  <img className='w-8 h-8' src={job.logo} alt="" />
                  {job.company}
                </td>
                <td className='py-2 px-4 border-b'>{job.title}</td>
                <td className='py-2 px-4 border-b mx-sm:hidden'>{job.location}</td>
                <td className='py-2 px-4 border-b mx-sm:hidden'>{moment(job.date).format('ll')}</td>
                <td className='py-2 px-4 border-b'>
                  <span className={`${job.status === "Accepted"
                    ? "bg-green-200"
                    : job.status === "Rejected"
                      ? "bg-red-200"
                      : "bg-blue-200"} px-4 py-1.5 rounded`}>
                    {job.status}
                  </span>

                </td>
              </tr>
            ) : (null))}
          </tbody>
        </table>
      </div>
      <Footer/>
    </>
  )
}

export default Applications