using backend.Models;

namespace backend.Dtos
{
    public class RegistrationData
    {
        public RegistrationData()
        {
            college = new List<College>();
            location = new List<Location>();
            stream = new List<Models.Stream>();
            qualification = new List<Qualification>();
            tech = new List<Technology>();
            role = new List<Role>();
            applicationTypes = new List<ApplicationType>();
        }
        public List<College> college { get; set; }
        public List<Location> location { get; set; }
        public List<Models.Stream> stream { get; set; }
        public List<Qualification> qualification { get; set; }
        public List<Technology> tech { get; set; }
        public List<Role> role { get; set; }
        public List<ApplicationType> applicationTypes { get; set; }
    }
}
