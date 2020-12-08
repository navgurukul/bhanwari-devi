import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import InputField from '../common/FormComponent/InputField'
import { TIME_CONSTANT, CLASS_FORM_FIELDS } from './constant'
import { actions } from './redux/action'
import Loader from '../common/Loader'
import './styles.scss'

const SelectOptions = () => {
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
  const dispatch = useDispatch();
  const { loading } = useSelector(({Class}) => Class)
  const handleTimeValicationAndCreateClass = (payload) => {
    const classStartTime = moment(`${payload[TIME_CONSTANT.CLASS_START_DATE]} ${payload[TIME_CONSTANT.CLASS_START_TIME]}`)
    const classEndTime = moment(`${payload[TIME_CONSTANT.CLASS_START_DATE]} ${payload[TIME_CONSTANT.CLASS_END_TIME]}`)
    if(classStartTime.valueOf() > classEndTime.valueOf()) {
      alert('Class end time must be later than class start time.')
      // Making the class end time field focused, so user can edit it.
      return document.getElementById(TIME_CONSTANT.CLASS_END_TIME).focus()
    }
    // remove the unnecessary time fields and add date parameter
    delete payload[TIME_CONSTANT.CLASS_END_TIME]
    delete payload[TIME_CONSTANT.CLASS_START_TIME]
    payload[TIME_CONSTANT.CLASS_START_DATE] = `${moment(classStartTime).format("YYYY-MM-DDTHH:mm:ss")}Z`
    payload[TIME_CONSTANT.CLASS_END_DATE] = `${moment(classEndTime).format("YYYY-MM-DDTHH:mm:ss")}Z`
    dispatch(actions.createClass(payload))
  }
  const onFormSubmit = (event) => {
    event && event.preventDefault()
    const formData = new FormData(event.target);
    const formFields = {}
    for (let [fieldName, value] of formData.entries()) {
      // Only going to take the field in payload if the 
      // input field is not empty.
      if(value) {
        formFields[fieldName] = value
      }
    }
    handleTimeValicationAndCreateClass(formFields)
  }
  return (
    <div className='ng-create-class'>
      <h2 className='title'> Create A Class </h2>
      <form className='form' onSubmit={onFormSubmit}>
        {CLASS_FORM_FIELDS.map((field, index) => <InputField {...field} key={index}/> )}
        <button type='submit' className='submit' disabled={loading}>
          { loading ? <Loader /> : 'CREATE CLASS' } 
        </button>
      </form>
      <SelectOptions />
    </div>
  )
}
export default Class;