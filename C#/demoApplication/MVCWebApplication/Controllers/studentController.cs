using Microsoft.AspNetCore.Mvc;
using MVCWebApplication.Models;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http;
using System.Text.Json.Serialization;


namespace MVCWebApplication.Controllers
{
    public class studentController : Controller
    {
        Uri baseAddress = new Uri("https://localhost:44332/api/Students/");

        private readonly HttpClient _client;

        public studentController()
        {
              _client = new HttpClient();                     
             _client.BaseAddress = baseAddress;
        }
        [HttpGet]
        public IActionResult Index()                
        {
            List<studentDetails> studentlist=new List<studentDetails>();
            HttpResponseMessage response =_client.GetAsync(_client.BaseAddress+ "GetAllStudent").Result;

            if(response.IsSuccessStatusCode)
            {
                string data=response.Content.ReadAsStringAsync().Result;
                studentlist = JsonConvert.DeserializeObject<List<studentDetails>>(data);
            }
            return View(studentlist);             
        }

        /*public IActionResult studentDetailsByID(int id)
        {
            if (id == 0)
            {
                BadRequest(id);
            }
            HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + $"GetstudentDetailsByID?id={id}").Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                var studentlist = JsonConvert.DeserializeObject<List<studentDetails>>(data);
                return View(studentlist);
            }
            return NotFound();
            
        }*/
        public async Task<IActionResult> DetailsByID(int id)
        {
            if (id == 0)
            {
                return BadRequest("invalid student id");
            }

            HttpResponseMessage response = await _client.GetAsync($"GetstudentDetailsByID?id={id}");
            if (response.IsSuccessStatusCode)
            {
                string data = await response.Content.ReadAsStringAsync();
                var student = JsonConvert.DeserializeObject<studentDetails>(data);
                return View(student);
            }
            else
            {
                // Handle different response statuses accordingly
                if (response.StatusCode == HttpStatusCode.NotFound)
                {
                    return NotFound("Student not found.");
                }

                return StatusCode((int)response.StatusCode, response.ReasonPhrase);
            }            
        }
        [HttpPut]
        public async Task<IActionResult> DeleteStudent(int id)

        {

            HttpResponseMessage response = _client.PutAsync(_client.BaseAddress + $"DeleteStudent?id={id}", null).Result;

            if (response.IsSuccessStatusCode)

            {

                return RedirectToAction(nameof(Index));

            }

            return NotFound();

        }
        /*[HttpDelete("DeleteStudent")]

        public IActionResult DeleteStudent(int id)
        {
            // Assuming you have some service to handle deletion
            bool isDeleted = _client.DeleteStudent(id);
            if (isDeleted)
            {
                return Ok(new { message = "Student deleted successfully" });
            }
            return NotFound(new { message = "Student not found" });
        }*/


        public async Task<IActionResult> AddStudent(studentDetails student)
        {
            if (!ModelState.IsValid)
            {
                return View(student);
            }

            HttpResponseMessage response = await _client.PostAsJsonAsync("AddStudent", student);
            if (response.IsSuccessStatusCode)
            {
                return RedirectToAction(nameof(Index));
            }
            return View(student);
        }
        [HttpGet]
        public async Task<IActionResult> UpdateStudentDetails(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }

            HttpResponseMessage response = await _client.GetAsync($"GetstudentDetailsByID?id={id}");
            if (response.IsSuccessStatusCode)
            {
                string data = await response.Content.ReadAsStringAsync();
                var student = JsonConvert.DeserializeObject<studentDetails>(data);
                return View(student);
            }

            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> UpdateStudentDetails(int id, studentDetails student)
        {
            if (id != student.Id || !ModelState.IsValid)
            {
                return View(student);
            }

            HttpResponseMessage response = await _client.PostAsJsonAsync($"UpdateStudentDetails?id={id}", student);
            if (response.IsSuccessStatusCode)
            {

                return RedirectToAction(nameof(Index));
            }

            return View(student);
        }

    }
}
