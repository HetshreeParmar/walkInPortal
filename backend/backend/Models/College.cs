namespace backend.Models
{
    public class College
    {
        public College() { 
            EducationalQualifications = new HashSet<EducationalQualification>();
        }
        public int CollegeId { get; set; }
        public string CollegeName { get; set; }
        public int LocationId { get; set; }
        public DateTime? DtCreated { get; set; }
        public DateTime? DtModified { get; set; }

        public virtual Location Location { get; set; }
        public virtual ICollection<EducationalQualification> EducationalQualifications { get; set; }    
    }
}
