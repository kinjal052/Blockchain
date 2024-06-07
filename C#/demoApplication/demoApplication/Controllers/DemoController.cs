using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace demoApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DemoController : ControllerBase
    {
        [HttpGet]
        public string SayHelloAPI()
        {
            return "hello";
        }
    }
}
