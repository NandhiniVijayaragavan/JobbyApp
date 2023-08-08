const connection = require ("../Helpers_DB/db");

module.exports = {
    getAllJobList: (req, res) => {
        connection.query("SELECT * from jobs", function ( err, results) {
            if(err){
                console.log(err);
                return res.status(400).send({message:"Error while getting data", error:err});
            }
            console.log(res.decoded,"inside jobPostcontroller")
            return res.send({message:"Successfully received job list", data:results,});
        });
    },

    addJobPost: (req, res) => {
        // console.log("Inside add Job", req.body);
        const data = req.body;
         connection.query (`insert into Jobs (company_logo, company_name, job_role,location,
            skills, salary, responsibilities, experience, about_job, about_company,userId) values 
            ('${data.company_logo}','${data.company_name}','${data.job_role}','${data.location}',
            '${data.skills}',${data.salary},'${data.responsibilities}',${data.experience},'${data.about_job}',
            '${data.about_company}',${data.userId})`,
        (err, results) => {
            if(err) {
                // console.log(err, "inside insert post");
                return res .status(400) .send ({message:"Error while inserting data",error:err});
            }
            return res .send({message:"Successfully added new job item",data:results,
        });
        });
    },
    updateJobPost: (req, res) =>{
        // console.log("Inside update job", req.body);
        const data= req.body;
        const id = req.params.jobId;
        connection.query(`update jobs set company_logo ='${data.company_logo}',
        company_name='${data.company_name}',job_role= '${data.job_role}',location='${data.location}',
        skills='${data.skills}',salary=${data.salary},responsibilities='${data.responsibilities}',
        experience=${data.experience},about_job='${data.about_job}',about_company='${data.about_company}' 
        where jobId =${id} `,
        (err, results) => {
            if(err) {
                // console.log(err, "inside update jobs");
                return res.status(400).send({message:"Error while updating data",error:err});
            }
            return res.send({message:"Successfully updated job post", data:results,});
        }
        );
    },
    deleteJob:(req, res) => {
        // console.log("Inside delete");
        const id=req.params.id;
        connection.query(`delete from jobs where jobId =${id}`,
        (err, results) => {
            if(err) {
                // console.log(err, "inside delete job");
                return res.status(400).send({message:"Error while deleting data",error:err});
            }
            return res.send({message:"Successfully deleted job post", data:results,});
        }
        );
    },
    getUserjobList: (req, res) => {
        const id= req.params.userId;
        connection.query(`SELECT * from jobs where userId = ${id} `, function ( err, results) {
            if(err){
                console.log(err);
                return res.status(400).send({message:"Error while getting data", error:err});
            }
            // console.log(res.decoded,"inside jobcontroller")
            return res.send({message:"Successfully received job list", data:results,});
        });
    },
};