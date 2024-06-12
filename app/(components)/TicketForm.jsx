"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const TicketForm = ({ticket}) => {
const EDITMODE = ticket._id === 'new' ? false:true

const router = useRouter()

  const startTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "hardware problem",
  };
if(EDITMODE)
  {
    startTicketData['title'] =ticket.title
    startTicketData['description'] =ticket.description
    startTicketData['priority'] =ticket.priority
    startTicketData['progress'] =ticket.progress
    startTicketData['status'] =ticket.status
    startTicketData['category'] =ticket.category


  }

  const [formData, setFormData] = useState(startTicketData);

  const handleSubmit = async(e) => {
    e.preventDefault()
    if(EDITMODE)
      {
        const res= await fetch(`/api/Tickets/${ticket._id}`,{
          method:'PUT',
          body:JSON.stringify({formData}),
          "content-type":"application/json"
    
        })
        if(!res.ok)
          {
            throw new Error('failed to update ticket')
          }

      }
      else
      {
        const res= await fetch("/api/Tickets",{
          method:'POST',
          body:JSON.stringify({formData}),
          "content-type":"application/json"
    
        })
        if(!res.ok)
          {
            throw new Error('failed to create ticket')
          }
      }
    

      router.refresh()
      router.push('/')
    
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3>{EDITMODE ? 'Update your Ticket':'Create your Ticket'}</h3>
        <label>Title</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />
        <label>Description</label>
        <textarea
          type="text"
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows="5"
        />
        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Hardware problem">Hardware problem</option>
          <option value="Software problem">Software problem</option>
          <option value="project">project </option>
        </select>
        <label>Priority</label>
        <div>
          <input
            id="priority-1"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={1}
            checked={formData.priority == 1}
          />
          <label>1</label>
          <input
            id="priority-2"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={2}
            checked={formData.priority == 2}
          />
          <label>2</label>
          <input
            id="priority-3"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={3}
            checked={formData.priority == 3}
          />
          <label>3</label>
          <input
            id="priority-4"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={4}
            checked={formData.priority == 4}
          />
          <label>4</label>
          <input
            id="priority-5"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={5}
            checked={formData.priority == 5}
          />
          <label>5</label>
        </div>
        <label>Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min="0"
          max="100"
          onChange={handleChange}
        />
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="not started">Not started</option>
          <option value="started">started</option>
          <option value="done">done</option>
        </select>
        <input type="submit" className="btn" value={EDITMODE?'Edit Ticket':"create ticket"} />
      </form>
    </div>
  );
};

export default TicketForm;
