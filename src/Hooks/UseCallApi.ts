import axios, { AxiosResponse } from 'axios';

//const url = 'https://localhost:7091'
const url = 'http://129.11.186.20:5005'

const querystring = require('querystring');

const UseCallApi=async(param:any) =>{
    if(param.action=='GetScheduledJobs') {
        try {
			const listScheduledJobs = await axios.get(url+'/api/ScheduledJobs/GetScheduledJobs');		
			return listScheduledJobs.data;
		} catch (err) {
			// Handle Error Here
			console.error(err);
			return [];
		}        
    }
	
	if(param.action=='GetNewScheduledJobs') {
        try {
			const listScheduledNewJobs = await axios.get(url+'/api/ScheduledJobs/GetNewScheduledJobs');		
			return listScheduledNewJobs.data;
		} catch (err) {
			// Handle Error Here
			console.error(err);
			return [];
		}        
    }

	if(param.action=='GetAllEmployees') {
        try {
			const listEmployees = await axios.get(url+'/api/Employees/GetAllEmployees');		
			return listEmployees.data;
		} catch (err) {
			// Handle Error Here
			console.error(err);
			return [];
		}        
    }	

	if(param.action=='SetScheduledJobs') {

		const config = { headers: { 'Content-Type': 'application/json' } };

		const scheduledJobsEntity = param.scheduledJobsEntity

        try {
			const listScheduledJobs = await axios.put(url+'/api/ScheduledJobs/set',scheduledJobsEntity,config);		
			return listScheduledJobs.data;
		} catch (err) {
			// Handle Error Here
			console.error(err);
			return [];
		}        
    }
	
	if(param.action=='GetAllStyles') {

		try {
			const listStyle = await axios.get(url+'/api/Styles/All');		
			return listStyle.data;
		} catch (err) {
			// Handle Error Here
			console.error(err);
			return [];
		}        
    }	

	if(param.action=='GetAllStandard') {

		try {
			const listStandard = await axios.get(url+'/api/TufftingStandard/GetAllStandard');		
			return listStandard.data;
		} catch (err) {
			// Handle Error Here
			console.error(err);
			return [];
		}        
    }	

	if(param.action=='GetAllObjective') {

		const params = {
			dateTime: param.dateTime,
			shift:param.shift
		}

		try {
			const listObjective = await axios.get(url+'/api/Objective/GetObjectives?'+ querystring.stringify(params));		
			return listObjective.data;
		} catch (err) {
			// Handle Error Here
			console.error(err);
			return [];
		}        
    }	

	if(param.action=='SetObjective') {

		const config = { headers: { 'Content-Type': 'application/json' } };

		const objectiveEntity = param.objectiveEntity		

		try {
			const listObjective = await axios.put(url+'/api/Objective',objectiveEntity,config);		
			return listObjective.data;
		} catch (err) {
			// Handle Error Here
			console.error(err);
			return [];
		}        
    }

	if(param.action=='SetHistScheduledJob') {

		const params = {
			dateTime: param.dateTime,
			shift:param.shift
		}
		
		try {
			const HistScheduledJob=await axios.post(url+'/api/ScheduledJobs/addHist?'+ querystring.stringify(params));
			return HistScheduledJob.data
			
		} catch (err) {
			// Handle Error Here
			console.error(err);
			return [];
		}        
    }	

	if(param.action=='GetChosenJob') {

		const params = {
			dateTime: param.dateTime,
			shift:param.shift
		}
		
		try {
			const listhist =await axios.get(url+'/api/ScheduledJobs/GetChosenJobs?'+ querystring.stringify(params));
			return listhist.data;
			
		} catch (err) {
			// Handle Error Here
			console.error(err);
			return [];
		}        
    }	

}

export default UseCallApi;