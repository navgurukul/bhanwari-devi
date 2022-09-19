import React, { useEffect, useState } from "react";
import { METHODS } from "../../../services/api";
import { useSelector } from "react-redux";
import { PATHS, interpolatePath, versionCode } from "../../../constant";
import axios from "axios";
import { useParams } from "react-router-dom";

function ContentEdit() {
  const user = useSelector(({ User }) => User);
  const params = useParams();
  const [course, setCourse] = useState([]);
  const [id, setId]= useState();
  const courseId = params.courseId;
  const exerciseId = params.exerciseId;

  console.log("params", params);

  let name = "name";
  const putApiAssessmentCall = () => {
    const stringifiedCourse = JSON.stringify(course,null,0)
    console.log(id,stringifiedCourse,"cc")
    axios({
      method: METHODS.PUT,
      url: `${process.env.REACT_APP_MERAKI_URL}/assessment/${id}`,
      headers: {
        "version-code": versionCode,
        accept: "application/json",
        Authorization: user.data?.token || "",
      },
      data: {
      "content": stringifiedCourse
      }
    })
      .then((res) => {
        console.log(res,"res")
      })
  }
  useEffect(() => {
    // setExerciseId(parseInt(params.exerciseId));
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/courses/${courseId}/exercises`,
      headers: {
        "version-code": versionCode,
        accept: "application/json",
        Authorization: user.data?.token || "",
      },
    })
      .then((res) => {
        console.log("res", res);
        setId(res.data.course.exercises[exerciseId].id)
        setCourse(res.data.course.exercises[exerciseId].content);
        // setAvailableLang(res.data.course.lang_available);
      })
      .catch((err) => {
        console.log("error");
      });
  }, [courseId, exerciseId]); 

  console.log("course", course);

  return (
    <>
    {
      course && course.map((e,index)=>{
        if (e.component==="questionExpression"){
          return <>
          <h5>Question</h5>
          <input
            value={course[index].value}
            style={{ width: "500px", height: "30px" }}
            onChange={e=>{
              var temp = [...course]
              temp[index].value = e.target.value
              setCourse(temp)
            }}
          />
          <br />
          <br /></>
        }else if (e.component==="questionCode"){
          return <>
          <h5>Code</h5>
          <input
            value={course[index].value}
            style={{ width: "500px", height: "30px" }}
            onChange={e=>{
              var temp = [...course]
              temp[index].value = e.target.value
              setCourse(temp)
            }}
          />
          <br />
          <br /></>
        }else if (e.component==="options"){
          return <>
          <h5>options</h5>
          {e.value.map((options,optionIndex)=>{
            return <>
            <input
              value={options.value}
              style={{ width: "500px", height: "30px" }}

            onChange={e=>{
              var temp = [...course]
              temp[index].value[optionIndex].value = e.target.value
              setCourse(temp)
            }}
            />
            <br />
            <br /></>
          })}</>
        }else if (e.component==="solution"){
          return <>

          <h5>solution</h5>
          <input
            value={course[index].value}
            style={{ width: "500px", height: "30px" }}
            onChange={e=>{
              var temp = [...course]
              temp[index].value = e.target.value
              setCourse(temp)
            }}
          />
          <br />
          <br /></>

        }else if (e.component==="output"){
          return Object.keys(course[index].value).map((sol,index1)=>{
            return <>
            <h5>{sol} Explaination</h5>
            
            {course[index].value[sol].map((solution,index2)=>{

          return (  
            <>
              <br />
              <br />
              <input
                value={solution.value}
                style={{ width: "500px", height: "30px" }}
                onChange={e=>{
                  var temp = [...course]
                  temp[index].value[sol][index2].value = e.target.value
                  setCourse(temp) 
                }}
              />
            </>
          );
            })}
            </>
          })

        }
      })
    }
      <br />
      <br />
      <button onClick={e=>putApiAssessmentCall()}>Submit</button>
    </>
  );
}

export default ContentEdit;
