import React from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'

const ViewApplications = () => {
  return (
    <div className='container mx-auto p-4'>
      <div>
        <table className='w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm'>
          <thead>
            <tr className='border-b border-gray-300'>
              <th className='py-2 px-4 text-left'>#</th>
              <th  className='py-2 px-4 text-left'>User Name</th>
              <th  className='py-2 px-4 text-left max-sm:hidden'>Job title</th>
              <th  className='py-2 px-4 text-left max-sm:hidden'>Location</th>
              <th  className='py-2 px-4 text-left'>Resume</th>
              <th  className='py-2 px-4 text-left'>Action</th>
            </tr>
          </thead>
          <tbody>
            {viewApplicationsPageData.map((applicant, index) => (
              <tr key={index} className='text-gray-700  border-b border-gray-200 hover:bg-gray-100'>
                <td className='py-2 px-4 text-center border-b border-gray-200'>
                  {index + 1}
                </td>
                <td className='py-2 px-4 text-center border-b border-gray-200 flex'>
                  <img className='w-10 h-10 rounded-full mr-3 max-sm:hidden' src={applicant.imgSrc} alt="" />
                  <span>{applicant.name}</span>
                </td>
                <td className='py-2 px-4 border-b max-sm:hidden'>{applicant.jobTitle}</td>
                <td className='py-2 px-4 border-b max-sm:hidden'>{applicant.location}</td>
                <td className='py-2 px-4 border-b'>
                  <a href="" target='_blank'>
                    Resume <img className='bg-blue-400 px-3 py-1 rounded inline-flex gap-2 items-center' src={assets.resume_download_icon} alt="" />
                  </a>
                </td>
                <td className='py-2 px-4 border-b relative'>
                  <div className='relative inline-block text-left group'>
                    <button className='text-gray-500 action-button'>...</button>
                    <div className='z-10 hidden absolute bg-white right-0 md:left-0 top-0 mt-2 w-32 border border-gray-300 rounded shadow group-hover:block'>
                      <button className='block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-200'>Accept</button>
                      <button className='block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-200'>Reject</button>
                    </div>
                  </div>
                </td>
              </tr> 
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewApplications