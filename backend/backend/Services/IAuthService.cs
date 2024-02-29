using backend.Dtos;
using backend.Models;

namespace backend.Services
{
    public interface IAuthService
    {
        Task<int> RegisterUser(UserRegistrationRequest userRegistrationRequest);
        Task<string?> Login(string email, string password);
        Task<bool> UserExists(string email);
    }
}
