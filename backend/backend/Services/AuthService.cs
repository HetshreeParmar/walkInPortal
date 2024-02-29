using backend.Dtos;
using backend.Models;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;

namespace backend.Services
{
    public class AuthService : IAuthService
    {
        private readonly walkinportalContext _walkinportalContext;
        private readonly IConfiguration _configuration;

        public AuthService(walkinportalContext walkinportalContext, IConfiguration configuration)
        {
            _walkinportalContext = walkinportalContext;
            _configuration = configuration;
        }
        public async Task<int> RegisterUser(UserRegistrationRequest userRegistrationRequest)
        {
            if(await UserExist(userRegistrationRequest.Email))
            {
                return 0;
            }
            User user = new User
            {
                Email = userRegistrationRequest.Email,
                Password = userRegistrationRequest.FirstName + "" + userRegistrationRequest.PassingYear
            };
            _walkinportalContext.Add(user);
            await _walkinportalContext.SaveChangesAsync();
            Userasset userasset = new Userasset
            {
                UserId = user.UserId,
                Resume = userRegistrationRequest.Resume,
                ProfilePhoto = userRegistrationRequest.ProfilePhoto
            };
            _walkinportalContext.Add(userasset);
            await _walkinportalContext.SaveChangesAsync();
            Userdetail userdetail = new Userdetail
            {
                UserId = user.UserId,
                FirstName = userRegistrationRequest.FirstName,
                LastName = userRegistrationRequest.LastName,
                Countrycode = userRegistrationRequest.Countrycode,
                PhoneNo = userRegistrationRequest.PhoneNo,
                PortfolioUrl = userRegistrationRequest.PortfolioUrl,
                ReferalEmpName = userRegistrationRequest.ReferalEmpName,
                SendMeUpdate = userRegistrationRequest.SendMeUpdate,
            };
            _walkinportalContext.Add(userdetail);
            await _walkinportalContext.SaveChangesAsync();
            EducationalQualification educationalQualification = new EducationalQualification
            {
                UserId = user.UserId,
                Percentage = userRegistrationRequest.Percentage,
                PassingYear = (int)userRegistrationRequest.PassingYear,
                QualificationId = userRegistrationRequest.QualificationId,
                StreamId = userRegistrationRequest.StreamId,
                CollegeId = userRegistrationRequest.CollegeId,
                OtherCollege = userRegistrationRequest.OtherCollege,
                OtherCollegeLocation = userRegistrationRequest.OtherCollegeLocations
            };
            _walkinportalContext.Add(educationalQualification);
            await _walkinportalContext.SaveChangesAsync();
            ProfessionalQualification professionalQualification = new ProfessionalQualification
            {
                UserId = user.UserId,
                ExpYear = userRegistrationRequest.ExpYear,
                CurrentCTC = userRegistrationRequest.CurrentCTC,
                ExpectedCTC = userRegistrationRequest.ExpectedCTC,
                CurrentlyOnNoticePeriod = userRegistrationRequest.CurrentlyOnNoticePeriod,
                NoticeEnd = userRegistrationRequest.NoticeEnd,
                NoticePeriodLength = userRegistrationRequest.NoticePeriodLength,
                AppearedZeusTest = userRegistrationRequest.AppearedZeusTest,
                ZeusTestRole = userRegistrationRequest.ZeusTestRole,
                ApplicationTypeId = userRegistrationRequest.ApplicationTypeId,
                OtherExpertTechs = userRegistrationRequest.OtherExpertTechs,
                OtherFamiliarTechs = userRegistrationRequest.OtherFamiliarTechs
            };
            _walkinportalContext.Add(professionalQualification);
            await _walkinportalContext.SaveChangesAsync();
            foreach (var expertTechId in userRegistrationRequest.ExpertTechsId)
            {
                ProfessionalQualificationExpertTech proqualificationExperttech = new ProfessionalQualificationExpertTech
                {
                    ProfessionalQualificationId = professionalQualification.ProfessionalQualificationId,
                    TechId = expertTechId
                };
                _walkinportalContext.ProfessionalQualificationExpertTechs.Add(proqualificationExperttech);
            }
            await _walkinportalContext.SaveChangesAsync();

            foreach (var familiarTechId in userRegistrationRequest.FamiliarTechsId)
            {
                ProfessionalQualificationFamiliarTech proqualificationFamiliartech = new ProfessionalQualificationFamiliarTech
                {
                    ProfessionalQualificationId = professionalQualification.ProfessionalQualificationId,
                    TechId = familiarTechId
                };
                _walkinportalContext.GetProfessionalQualificationFamiliarTechs.Add(proqualificationFamiliartech);
            }
            await _walkinportalContext.SaveChangesAsync();
            //foreach (var rId in userRegistrationRequest.RolesId)
            //{
            //    UserdetailsRole userdetailsRole = new UserdetailsRole
            //    {
            //        RoleId = rId,
            //        UserdetailId = userdetail.UserdetailId
            //    };
            //    _walkinportalContext.Add(userdetailsRole);
            //}
            //await _walkinportalContext.SaveChangesAsync();
            return 1;
        }

        public async Task<bool> UserExist(string email)
        {
            if(await _walkinportalContext.Users.AnyAsync(u => u.Email.ToLower() == email.ToLower()))
            {
                return true;
            }
            return false;
        }

        public async Task<string?> Login(string email, string password)
        {
            var user = await _walkinportalContext.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == email.ToLower());
            Console.WriteLine(user);
            if(user == null) { return "User not found"; }
            else if(user.Password != password)
            {
                return "Password doesnt match";
            }
            else
            {
                return createToken(user);
                //return user.Email;
            }
        }

        public async Task<bool> UserExists(string email)
        {
            if(await _walkinportalContext.Users.AnyAsync(u => u.Email.ToLower() == email.ToLower()))
            {
                return true;
            }
            return false;
        }

        private string createToken(User user)
        {
            var claims = new List<Claim> {
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Name, user.Email)
            };
            var appSettingsToken = _configuration.GetSection("AppSettings:Token").Value;
            if (appSettingsToken == null)
            {
                throw new Exception("Appsettings token is null");
            }
            SymmetricSecurityKey symmetricSecurityKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(appSettingsToken));
            SigningCredentials signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha512);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddHours(1),
                SigningCredentials = signingCredentials
            };
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken = tokenHandler.CreateToken(tokenDescriptor);

            string token = tokenHandler.WriteToken(securityToken) + '/' + user.Email;
            if (token == null) { return "token not generated"; }
            Console.WriteLine(user.UserId);
            return token;
        }
    }
}
