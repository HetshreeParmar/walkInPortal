using backend.Dtos;
using backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using iText.StyledXmlParser.Jsoup.Nodes;

namespace backend.Services
{
    public class UserService : IUserService
    {
        private readonly walkinportalContext _walkinportalContext;
        public UserService(walkinportalContext walkinportalContext)
        {
            _walkinportalContext = walkinportalContext;
        }
        public async Task<List<Job>> GetAllJobsAsync()
        {
            var jobs = await _walkinportalContext.Jobs
                .Include(j => j.Location)
                .Include(j => j.JobSlots)
                    .ThenInclude(s => s.Slot)
                .Include(j => j.JobDescs)
                .Include(j => j.JobRoles)
                    .ThenInclude(r => r.Role)
                .Include(j => j.JobRoles)
                    .ThenInclude(r => r.JobRoleDescs)
                .AsSplitQuery()
                .AsNoTrackingWithIdentityResolution()
                .ToListAsync();

            var jobDtoList = jobs.Select(job => new Job
            {
                JobId = job.JobId,
                JobName = job.JobName,
                FromTime = job.FromTime,
                ToTime = job.ToTime,
                Venue = job.Venue,
                ThingsToRem = job.ThingsToRem,
                LocationId = job.LocationId,
                Location = new Location
                {
                    LocationId = job.Location.LocationId,
                    LocationName = job.Location.LocationName
                },
                JobDescs = job.JobDescs.Select(jd => new JobDesc
                {
                    Id = jd.Id,
                    DescTitle = jd.DescTitle,
                    Description = jd.Description,
                    JobId = jd.JobId,
                }).ToList(),
                JobSlots = job.JobSlots.Select(slot => new JobSlot
                {
                    SlotId = slot.SlotId,
                    JobId = slot.JobId,
                    Slot = new Slot
                    {
                        SlotId = slot.SlotId,
                        FromTime = slot.Slot.FromTime,
                        ToTime = slot.Slot.ToTime
                    },
                }).ToList(),
                JobRoles = job.JobRoles.Select(jr => new JobRole 
                { 
                    Id = jr.Id,
                    Package = jr.Package,
                    JobId = jr.JobId,
                    RoleId = jr.RoleId,
                    Role = new Role
                    {
                        RoleId = jr.Role.RoleId,
                        RoleName = jr.Role.RoleName
                    },
                    JobRoleDescs = jr.JobRoleDescs.Select(jrd => new JobRoleDesc
                    {
                        Id = jrd.Id,
                        DescTitle= jrd.DescTitle,
                        Description = jrd.Description,
                        RolesId = jrd.RolesId
                    }).ToList(),
                }).ToList(),
            }).ToList();
            return jobDtoList;
        }

        public async Task<Job> GetJobByIdAsync(int JobId)
        {
            var job = await _walkinportalContext.Jobs
                .Where(j => j.JobId == JobId)
                .Include(j => j.Location)
                .Include(j => j.JobSlots)
                    .ThenInclude(s => s.Slot)
                .Include(j => j.JobDescs)
                .Include(j => j.JobRoles)
                    .ThenInclude(r => r.Role)
                .Include(j => j.JobRoles)
                    .ThenInclude(r => r.JobRoleDescs)
                .AsSplitQuery()
                .AsNoTrackingWithIdentityResolution()
                .FirstOrDefaultAsync();
            if(job == null)
            {
                return null;
            }

            var jobDto = new Job
            {
                JobId = job.JobId,
                JobName = job.JobName,
                FromTime = job.FromTime,
                ToTime = job.ToTime,
                Venue = job.Venue,
                ThingsToRem = job.ThingsToRem,
                LocationId = job.LocationId,
                DtCreated = job.DtCreated,
                DtModified = job.DtModified,
                Location = new Location
                {
                    LocationId = job.Location.LocationId,
                    LocationName = job.Location.LocationName,
                    DtCreated = job.Location.DtCreated,
                    DtModified = job.Location.DtModified
                },
                JobDescs = job.JobDescs.Select(jd => new JobDesc
                {
                    Id = jd.Id,
                    DescTitle = jd.DescTitle,
                    Description = jd.Description,
                    JobId = jd.JobId,
                    DtCreated = jd.DtCreated,
                    DtModified = jd.DtModified,
                }).ToList(),
                JobSlots = job.JobSlots.Select(js => new JobSlot
                {
                    SlotId = js.SlotId,
                    JobId = js.JobId,
                    DtCreated = js.DtCreated,
                    DtModified = js.DtModified,
                    Slot = new Slot
                    {
                        SlotId = js.Slot.SlotId,
                        FromTime = js.Slot.FromTime,
                        ToTime = js.Slot.ToTime,
                        DtCreated = js.Slot.DtCreated,
                        DtModified = js.Slot.DtModified,
                    },
                }).ToList(),
                JobRoles = job.JobRoles.Select(jr => new JobRole
                {
                    Id = jr.Id,
                    Package = jr.Package,
                    JobId = jr.JobId,
                    RoleId = jr.RoleId,
                    DtCreated = jr.DtCreated,
                    DtModified = jr.DtModified,
                    Role = new Role
                    {
                        RoleId = jr.Role.RoleId,
                        RoleName = jr.Role.RoleName,
                        DtCreated = jr.Role.DtCreated,
                        DtModified = jr.Role.DtModified
                    },
                    JobRoleDescs = jr.JobRoleDescs.Select(jrd => new JobRoleDesc
                    {
                        Id = jrd.Id,
                        DescTitle = jrd.DescTitle,
                        Description = jrd.Description,
                        RolesId = jrd.RolesId,
                        DtCreated = jrd.DtCreated,
                        DtModified = jrd.DtModified
                    }).ToList(),
                }).ToList(),
            };
            return jobDto;
        }

        public async Task RegisterUser(UserRegistrationRequest userRegistrationRequest)
        {
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
            //foreach( var rId in userRegistrationRequest.RolesId)
            //{
            //    UserdetailsRole userdetailsRole = new UserdetailsRole
            //    {
            //        RoleId = rId,
            //        UserdetailId = userdetail.UserdetailId
            //    };
            //    _walkinportalContext.Add(userdetailsRole);
            //}
            //await _walkinportalContext.SaveChangesAsync();
        }



        public async Task<Int32> InsertApplicationAsync(ApplicationRequest applicationRequest)
        {
            Application app = new Application
            {
                Resume = applicationRequest.Resume,
                UserId = applicationRequest.UserId,
                SlotId = applicationRequest.SlotId,
                HallTicket = "",
                JobId = applicationRequest.JobId,
            };
            _walkinportalContext.Applications.Add(app);
            await _walkinportalContext.SaveChangesAsync();
            foreach (var roleId in applicationRequest.Rolesid)
            {
                ApplicationRole appRole = new ApplicationRole
                {
                    ApplicationId = app.ApplicationId,
                    RoleId = roleId
                };
                _walkinportalContext.ApplicationRoles.Add(appRole);
            }
            await _walkinportalContext.SaveChangesAsync();
            return app.ApplicationId;
        }
        public async Task<Application> GetApplicationByIdAsync(int applicationId)
        {
            Console.WriteLine(applicationId);
            var application = await _walkinportalContext.Applications
            //var application = await _walkinportalContext.Application
                .Where(a => a.ApplicationId == applicationId)
                .Include(a => a.Job).Include(a => a.Slot)
                .AsSplitQuery()
                .FirstOrDefaultAsync();
            if (application == null) { return null; }
            //var applicationDto = new Application
            //{
            //    ApplicationId = application.ApplicationId,
            //    JobId = application.JobId,
            //    Job = new Job
            //    {
            //        JobId = application.Job.JobId,
            //        ThingsToRem = application.Job.ThingsToRem,
            //    },
            //    SlotId = application.SlotId,
            //    Slot = new Slot
            //    {
            //        SlotId = application.Slot.SlotId,
            //        FromTime = application.Slot.FromTime,
            //        ToTime = application.Slot.ToTime,
            //    }
            //};
            //Console.WriteLine(application);
            return application;
        }

        //public async Task<Int32> InsertApplicationAsync(ApplicationRequest application)
        //{
        //    var job = await _walkinportalContext.Jobs.Where(j => j.JobId == application.JobId).Include(j => j.Location).FirstOrDefaultAsync();
        //    var user = await _walkinportalContext.Userdetails.Where(u => u.UserId == application.UserId).FirstOrDefaultAsync();

        //    using (MemoryStream memoryStream = new MemoryStream())
        //    {
        //        using (PdfWriter writer = new(memoryStream))
        //        {
        //            using (PdfDocument pdf = new(writer))
        //            {
        //                iText.Layout.Document document = new iText.Layout.Document(pdf);

        //                document.Add(new Paragraph($"Name: {user.FirstName} {user.LastName}"));

        //                document.Add(new Paragraph("Roles:"));
        //                foreach (var roleId in application.Rolesid)
        //                {
        //                    var roleName = await _walkinportalContext.Roles.Where(r => r.RoleId == roleId).Select(r => r.RoleName).FirstOrDefaultAsync();

        //                    document.Add(new Paragraph($"- {roleName}"));
        //                }

        //                document.Add(new Paragraph($"Job Name: {job.JobName}"));
        //                document.Add(new Paragraph($"Venue: {job.Venue}"));
        //                document.Add(new Paragraph($"From Time: {job.FromTime}"));
        //                document.Add(new Paragraph($"To Time: {job.ToTime}"));
        //                document.Add(new Paragraph($"Things To Remember: {job.ThingsToRem}"));

        //                document.Close();

        //                byte[] pdfBytes = memoryStream.ToArray();

        //                string base64String = Convert.ToBase64String(pdfBytes);

        //                Application app = new Application();
        //                app.UserId = application.UserId;
        //                app.SlotId = application.SlotId;
        //                app.JobId = application.JobId;
        //                app.HallTicket = base64String;
        //                if (application.Resume.Length != 0)
        //                {
        //                    app.Resume = application.Resume;
        //                }
        //                else
        //                {
        //                    var userasset = await _walkinportalContext.Userassets.Where(u => u.UserId == application.UserId).FirstOrDefaultAsync();
        //                    app.Resume = userasset.Resume;
        //                }


        //                _walkinportalContext.Applications.Add(app);
        //                await _walkinportalContext.SaveChangesAsync();

        //                foreach (var roleId in application.Rolesid)
        //                {
        //                    ApplicationRole appRole = new ApplicationRole
        //                    {
        //                        ApplicationId = app.ApplicationId,
        //                        RoleId = roleId
        //                    };
        //                    _walkinportalContext.ApplicationRoles.Add(appRole);
        //                }
        //                await _walkinportalContext.SaveChangesAsync();
        //                return app.ApplicationId;
        //            }
        //        }
        //    }
        //}

        public async Task<Int32> GetUserId(string email)
        {
            var user = await _walkinportalContext.Users
                .Where(j => j.Email == email)
                .AsSplitQuery()
                .AsNoTrackingWithIdentityResolution()
                .FirstOrDefaultAsync();
            var id = user.UserId;
            return id;
        }
    }
}
