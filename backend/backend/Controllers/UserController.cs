using backend.Dtos;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private IUserService _userService;
        //private readonly IConfiguration _configuration;
        private readonly walkinportalContext _walkinportalContext;
        private readonly IAuthService _authService;
        public UserController(IUserService userService, walkinportalContext walkinportalContext, IAuthService authService)
        {
            _userService = userService;
            _walkinportalContext = walkinportalContext;
            _authService = authService;
        }

        [HttpGet]
        [Route("/jobs")]
        public async Task<IActionResult> GetAllJobsAsync()
        {
            var jobDtoList = await _userService.GetAllJobsAsync();
            return Ok(jobDtoList);
        }

        [HttpGet]
        [Route("/job/{id}")]
        public async Task<IActionResult> GetJobByIdAsync(int id)
        {
            var job = await _userService.GetJobByIdAsync(id);
            if(job == null)
            {
                return NotFound();
            }
            return Ok(job);
        }

        [HttpGet]
        [Route("/getregistrationdata")]
        public async Task<IActionResult> getRegistrationDataAsync()
        {
            var collegesTask = await _walkinportalContext.Colleges.ToListAsync();
            var streamsTask = await _walkinportalContext.Streams.ToListAsync();
            var locationsTask = await _walkinportalContext.Locations.ToListAsync();
            var techsTask = await _walkinportalContext.Technologies.ToListAsync();
            var qualificationsTask = await _walkinportalContext.Qualifications.ToListAsync();
            var rolesTask = await _walkinportalContext.Roles.ToListAsync();
            var applicationTypesTask = await _walkinportalContext.ApplicationTypes.ToListAsync();


            var registrationData = new RegistrationData
            {
                college = collegesTask,
                location = locationsTask,
                stream = streamsTask,
                qualification = qualificationsTask,
                tech = techsTask,
                role = rolesTask,
                applicationTypes = applicationTypesTask
            };
            return Ok(registrationData);
        }

        [HttpPost]
        [Route("/user")]
        public async Task<IActionResult> RegisterUser(UserRegistrationRequest userRegistrationRequest)
        {
            await _userService.RegisterUser(userRegistrationRequest);
            //int id = await _authService.RegisterUser(userRegistrationRequest);
            //if (id == 0) { return BadRequest("User already exists"); }
            return Ok();
        }

        [HttpPost]
        [Route("/login")]
        public async Task<ActionResult> Login([FromBody] loginRequest LoginRequest)
        {
            var res = await _authService.Login(LoginRequest.email, LoginRequest.password);
            if (res != null)
            {
                return Ok(new { token = res, status = 200 });
            }
            return BadRequest($"Incorrect Password or email");
        }
        [HttpGet]
        [Route("/userExists/{email}")]
        public async Task<Boolean> UseExist([FromRoute] string email)
        {
            var res = await _authService.UserExists(email);
            Console.WriteLine(res);
            if(res) { return true; }
            return false;
        }

        [HttpGet]
        [Route("/getUserId/{email}")]
        public async Task<IActionResult> getUserId([FromRoute] string email)
        {
            Int32 userId = await _userService.GetUserId(email);
            return Ok(new{ id =userId});
        }

        [HttpPost]
        [Route("/apply")]
        public async Task<IActionResult> InsertApplicationasync([FromBody] ApplicationRequest applicationRequest)
        {
            Int32 applicationId = await _userService.InsertApplicationAsync(applicationRequest);
            return Ok(applicationId);
        }

        [HttpGet]
        [Route("/getApplication/{applicationId}")]
        public async Task<IActionResult> GetApplicationByIdAsync([FromRoute] int applicationId)
        {
            var application = await _userService.GetApplicationByIdAsync(applicationId);
            return Ok(application);
        }
    }
}
