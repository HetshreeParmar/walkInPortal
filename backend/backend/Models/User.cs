namespace backend.Models
{
    public class User
    {
        public User() { 
            Applications = new HashSet<Application>();
            EducationalQualifications = new HashSet<EducationalQualification>();
            ProfessionalQualifications = new HashSet<ProfessionalQualification>();
            Userassets = new HashSet<Userasset>();
            Userdetails = new HashSet<Userdetail>();
        }
        public int UserId { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime? DtCreated { get; set; }
        public DateTime? DtModified { get; set; }

        public virtual ICollection<Application> Applications { get; set;}
        public virtual ICollection<EducationalQualification> EducationalQualifications { get; set;}
        public virtual ICollection<ProfessionalQualification> ProfessionalQualifications { get;set;}
        public virtual ICollection<Userasset> Userassets { get; set;}
        public virtual ICollection<Userdetail> Userdetails { get; set;}
    }
}
