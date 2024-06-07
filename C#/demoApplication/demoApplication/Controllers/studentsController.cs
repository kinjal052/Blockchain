using demoApplication.Data;
using demoApplication.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Reflection.Metadata.Ecma335;

namespace demoApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class studentsController : ControllerBase
    {
        private ApplicationDbcontext _db;
        private readonly ILogger<studentsController> _logger;

        public studentsController(ApplicationDbcontext context, ILogger<studentsController> logger)
        {
            _db = context;
            _logger = logger;
            
        }
        [HttpGet("GetAllStudent")]
        public List<studentEntity> GetAllStudnet()
        {
            _logger.LogInformation("Fetching All student details");
            return _db.studentRegister.ToList();
        }

        [HttpGet("GetstudentDetailsByID")]
        public ActionResult<studentEntity> GetStudentDetailsByid(int id)
        {
            if(id == 0)
            {
                _logger.LogError("Student ID was not passed");
                return BadRequest();
            }
            var studentdetails=_db.studentRegister.FirstOrDefault(x=>x.Id==id);
            if (studentdetails == null)
            {
                return NotFound();
            }
            return studentdetails;

        }

        [HttpPost("AddStudent")]
        public ActionResult<studentEntity> Addstudent([FromBody]studentEntity studentDetails)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _db.studentRegister.Add(studentDetails);
            _db.SaveChanges();

            return Ok(studentDetails);
        }

        [HttpPost("UpdateStudentDetails")]
        public ActionResult<studentEntity> Updatestudentdetails(int id,[FromBody] studentEntity studentDetails)
        {
            if (studentDetails==null)
            {
                return BadRequest(studentDetails);
            }
            var studdetails=_db.studentRegister.FirstOrDefault(x=>x.Id==id);
            if (studdetails == null)
            {
                return NotFound();
            }

            studdetails.Name= studentDetails.Name;
            studdetails.Age= studentDetails.Age;
            studdetails.Standard= studentDetails.Standard;
            studdetails.email = studentDetails.email;
            
            _db.SaveChanges();

            return Ok(studdetails);
        }

        [HttpPut("DeleteStudent")]
        public ActionResult<studentEntity> DeleteStudent(int id)
        {
            var studentDetails = _db.studentRegister.FirstOrDefault(x => x.Id == id);
            if (studentDetails == null)
            {
                return NotFound();
            }
            _db.Remove(studentDetails);
            _db.SaveChanges();
            return NoContent();

        }
        /*[HttpPut("DeleteStudent")]
        public ActionResult<studentEntity> DeleteStudent(int Id)
        {
            var studentDetails = _db.studentRegister.FirstOrDefault(x => x.Id == Id);
            if (studentDetails == null)
            {
                return NotFound();
            }           
            _db.Remove(studentDetails);

            _db.SaveChanges();
            return NoContent();
        }*/


    }
}
