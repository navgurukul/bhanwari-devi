import React from "react";

import InputField from '../common/FormComponent/InputField'

import { CLASS_FORM_FIELDS } from './constant'
import './styles.scss'



const SelectOptions = () => {
  // link for select box documentation. 
  // https://stackoverflow.com/questions/5650457/html-select-form-with-option-to-enter-custom-value
  return (
    <>
    {/* Select box data items. HTML 5 way to render select box */}
      <datalist id="language">
        <option value='en'>English</option>
        <option value='hi'>Hindi</option>
        <option value='te'>Telugu</option>
        <option value='ta'>Tamil</option>
      </datalist>
      <datalist id="type">
        <option value='workshop'>Workshop</option>
        <option value='doubt_class'>Doubt Class</option>
      </datalist>
      <datalist id="category">
        <option value='1'>Programming</option>
      </datalist>
    </>
  )
}


function Class() {

  const onFormSubmit = (event) => {
    event && event.preventDefault()
    const formData = new FormData(event.target);
    const payLoad = {}
    for (let [fieldName, value] of formData.entries()) { 
      payLoad[fieldName] = value
     }
    console.log('payload', payLoad)
  }

  return (
    <div className='ng-create-class'>
      <h2 className='title'> Create A Class </h2>
      <form className='form' onSubmit={onFormSubmit}>
        {CLASS_FORM_FIELDS.map((field, index) => <InputField {...field} key={index}/> )}
        <button type='submit' className='submit'>CREATE CLASS </button>
      </form>
      <SelectOptions />
    </div>
  )
}


export default Class;
