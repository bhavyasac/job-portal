import React , { useEffect, useRef, useState } from 'react'
import Quill from 'quill';
import { JobCategories, JobLocations } from '../assets/assets';

const AddJob = () => {
    const [title, setTitle] = React.useState('');
    const [location, setLocation] = React.useState('Banglore');
    const [category, setCategory] = React.useState('Programming');
    const [level, setLevel] = React.useState('Beginner level');
    const [salary, setSalary] = React.useState(0);
    const editorRef= React.useRef(null);
    const quillRef = React.useRef(null);

     useEffect(() => {
    // initiate Quill only once
    if (quillRef.current === null && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['link', 'image'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['clean']
          ]
        }
      });
    }
  }, []);

  return (
    <form className='container p-4 flex flex-col w-full items-start gap-3'>
        <div className='w-full '>
            <p className='mb-2'>Job Title</p>
            <input type="text" placeholder='Type here'
            onChange={e => setTitle(e.target.value)} value={title}
            required
            className='w-full max-w-lg px- py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500'
            />
        </div>
        <div className='w-full mx-w-lg '>
            <p className='my-2'>Job Description</p>
            <div  ref={editorRef}>

            </div>
        </div>
        <div className='flex flex-col gap-2 sm:flex-row w-full sm:gap-8'>
            <div>
                <p className='mb-2'>Job Category</p>
                <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e => setCategory(e.target.value)} >
                    {JobCategories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            <div>
                <p className='mb-2'>Job Locations</p>
                <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e => setLocation(e.target.value)} >
                    {JobLocations.map((location, index) => (
                        <option key={index} value={location}>{location}</option>
                    ))}
                </select>
            </div>
            <div>
                <p className='mb-2'>Job Level</p>
                <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e => setLevel(e.target.value)} >
                    <option value="Beginner level">Beginner level</option>
                    <option value="Intermediate level">Intermediate level</option>
                    <option value="Advanced level">Advanced level</option>
                </select>
            </div>
        </div>
        <div>
            <p className='mb-2'>Job Salary</p>
            <input min={0} className='w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]' type="number" placeholder='2500'
            onChange={e => setSalary(e.target.value)} value={salary}
            required
            />
        </div>
        <button className='py-3 w-28 mt-4 bg-black text-white rounded'>ADD</button>
    </form>
    
  )
}

export default AddJob