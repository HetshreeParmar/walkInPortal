using backend.Dtos;
using backend.Models;
namespace backend.Services
{
    public interface IUserService
    {
        public Task<List<Job>> GetAllJobsAsync();
        public Task<Job> GetJobByIdAsync(int id);
        public Task RegisterUser(UserRegistrationRequest userRegistrationRequest);
        public Task<Int32> InsertApplicationAsync(ApplicationRequest application);
        public Task<Application> GetApplicationByIdAsync(int applicationId);
        public Task<Int32> GetUserId(string email);
    }
}
